import { APIGatewayProxyHandler } from 'aws-lambda';
import { CognitoIdentityServiceProvider, DynamoDB } from 'aws-sdk';
import { z } from 'zod';

const cognito = new CognitoIdentityServiceProvider();
const dynamodb = new DynamoDB.DocumentClient();

const USER_POOL_ID = process.env.USER_POOL_ID!;
const DYNAMODB_TABLE = process.env.DYNAMODB_TABLE!;

const LoginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
});

type LoginInput = z.infer<typeof LoginSchema>;

interface TokenSet {
    accessToken: string;
    idToken: string;
    refreshToken?: string;
}

interface UserProfile {
    userId: string;
    email: string;
    username: string;
    displayName: string;
    verified?: boolean;
}

interface LoginResponse {
    success: boolean;
    tokens?: TokenSet;
    user?: UserProfile;
    message: string;
}

/**
 * Lambda handler for user login
 * POST /auth/login
 */
export const handler: APIGatewayProxyHandler = async (event) => {
    try {
          const body = JSON.parse(event.body || '{}');
          const input = LoginSchema.parse(body);

      let authResult;
          try {
                  authResult = await cognito
                    .adminInitiateAuth({
                                UserPoolId: USER_POOL_ID,
                                ClientId: process.env.CLIENT_ID!,
                                AuthFlow: 'ADMIN_NO_SRP_AUTH',
                                AuthParameters: {
                                              USERNAME: input.email,
                                              PASSWORD: input.password,
                                },
                    })
                    .promise();
          } catch (cognitoError: any) {
                  console.error('Cognito auth error:', cognitoError);

            if (cognitoError.code === 'UserNotFoundException' || cognitoError.code === 'NotAuthorizedException') {
                      return {
                                  statusCode: 401,
                                  body: JSON.stringify({
                                                success: false,
                                                message: 'Invalid email or password',
                                  }),
                      };
            }

            if (cognitoError.code === 'UserNotConfirmedException') {
                      return {
                                  statusCode: 403,
                                  body: JSON.stringify({
                                                success: false,
                                                message: 'User account is not confirmed. Please check your email.',
                                  }),
                      };
            }

            throw cognitoError;
          }

      if (!authResult.AuthenticationResult) {
              return {
                        statusCode: 401,
                        body: JSON.stringify({
                                    success: false,
                                    message: 'Authentication failed',
                        }),
              };
      }

      const tokens: TokenSet = {
              accessToken: authResult.AuthenticationResult.AccessToken,
              idToken: authResult.AuthenticationResult.IdToken,
              refreshToken: authResult.AuthenticationResult.RefreshToken,
      };

      let userProfile: UserProfile | null = null;

      try {
              const result = await dynamodb
                .query({
                            TableName: DYNAMODB_TABLE,
                            IndexName: 'GSI2',
                            KeyConditionExpression: 'GSI2PK = :pk',
                            ExpressionAttributeValues: {
                                          ':pk': `EMAIL#${input.email.toLowerCase()}`,
                            },
                })
                .promise();

            if (result.Items && result.Items.length > 0) {
                      const item = result.Items[0];
                      userProfile = {
                                  userId: item.userId,
                                  email: item.email,
                                  username: item.username,
                                  displayName: item.displayName,
                                  verified: item.verified || false,
                      };
            }
      } catch (dbError) {
              console.error('DynamoDB query error:', dbError);
      }

      const response: LoginResponse = {
              success: true,
              tokens,
              user: userProfile || undefined,
              message: 'Login successful',
      };

      return {
              statusCode: 200,
              body: JSON.stringify(response),
      };
    } catch (error) {
          console.error('Login error:', error);

      if (error instanceof z.ZodError) {
              return {
                        statusCode: 400,
                        body: JSON.stringify({
                                    success: false,
                                    message: 'Validation failed',
                                    details: error.errors,
                        }),
              };
      }

      return {
              statusCode: 500,
              body: JSON.stringify({
                        success: false,
                        message: 'An unexpected error occurred during login',
              }),
      };
    }
};
