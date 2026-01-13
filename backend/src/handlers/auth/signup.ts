import { APIGatewayProxyHandler } from 'aws-lambda';
import { CognitoIdentityServiceProvider, DynamoDB } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';

// Initialize AWS services
const cognito = new CognitoIdentityServiceProvider();
const dynamodb = new DynamoDB.DocumentClient();

// Environment variables
const USER_POOL_ID = process.env.USER_POOL_ID!;
const DYNAMODB_TABLE = process.env.DYNAMODB_TABLE!;

// Input validation schema
const SignupSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters').regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          'Password must contain uppercase, lowercase, and numbers'
        ),
    username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/, 'Username must be alphanumeric'),
    displayName: z.string().min(1).max(50, 'Display name must not be empty'),
});

type SignupInput = z.infer<typeof SignupSchema>;

interface SignupResponse {
    success: boolean;
    userId?: string;
    message: string;
}

/**
 * Lambda handler for user signup
 * POST /auth/signup
 */
export const handler: APIGatewayProxyHandler = async (event) => {
    try {
          // Parse and validate input
      const body = JSON.parse(event.body || '{}');
          const input = SignupSchema.parse(body);

      // Check if username already exists
      const existingUser = await dynamodb
            .query({
                      TableName: DYNAMODB_TABLE,
                      IndexName: 'GSI3',
                      KeyConditionExpression: 'GSI3PK = :pk',
                      ExpressionAttributeValues: {
                                  ':pk': `USERNAME#${input.username.toLowerCase()}`,
                      },
            })
            .promise();

      if (existingUser.Items && existingUser.Items.length > 0) {
              return {
                        statusCode: 409,
                        body: JSON.stringify({
                                    success: false,
                                    error: 'Username already exists',
                        }),
              };
      }

      // Check if email already exists
      const existingEmail = await dynamodb
            .query({
                      TableName: DYNAMODB_TABLE,
                      IndexName: 'GSI2',
                      KeyConditionExpression: 'GSI2PK = :pk',
                      ExpressionAttributeValues: {
                                  ':pk': `EMAIL#${input.email.toLowerCase()}`,
                      },
            })
            .promise();

      if (existingEmail.Items && existingEmail.Items.length > 0) {
              return {
                        statusCode: 409,
                        body: JSON.stringify({
                                    success: false,
                                    error: 'Email already registered',
                        }),
              };
      }

      const userId = uuid();
          const timestamp = new Date().toISOString();

      // Create Cognito user
      await cognito
            .adminCreateUser({
                      UserPoolId: USER_POOL_ID,
                      Username: input.username,
                      UserAttributes: [
                        {
                                      Name: 'email',
                                      Value: input.email,
                        },
                        {
                                      Name: 'email_verified',
                                      Value: 'true',
                        },
                        {
                                      Name: 'custom:userId',
                                      Value: userId,
                        },
                                ],
                      MessageAction: 'SUPPRESS', // Don't send initial password
            })
            .promise();

      // Set permanent password
      await cognito
            .adminSetUserPassword({
                      UserPoolId: USER_POOL_ID,
                      Username: input.username,
                      Password: input.password,
                      Permanent: true,
            })
            .promise();

      // Create DynamoDB user profile
      const userProfile = {
              PK: `USER#${userId}`,
              SK: 'PROFILE',
              GSI1PK: `EMAIL#${input.email.toLowerCase()}`,
              GSI1SK: timestamp,
              GSI2PK: `EMAIL#${input.email.toLowerCase()}`,
              GSI2SK: userId,
              GSI3PK: `USERNAME#${input.username.toLowerCase()}`,
              GSI3SK: userId,
              userId,
              email: input.email,
              username: input.username,
              displayName: input.displayName,
              bio: '',
              profilePhoto: '',
              credits: 0,
              createdAt: timestamp,
              followerCount: 0,
              followingCount: 0,
              tripCount: 0,
              verified: false,
      };

      await dynamodb
            .put({
                      TableName: DYNAMODB_TABLE,
                      Item: userProfile,
            })
            .promise();

      // Return success response
      const response: SignupResponse = {
              success: true,
              userId,
              message: 'Account created. Please check your email.',
      };

      return {
              statusCode: 201,
              body: JSON.stringify(response),
      };
    } catch (error) {
          console.error('Signup error:', error);

      // Handle validation errors
      if (error instanceof z.ZodError) {
              return {
                        statusCode: 400,
                        body: JSON.stringify({
                                    success: false,
                                    error: 'Validation failed',
                                    details: error.errors,
                        }),
              };
      }

      // Handle Cognito errors
      if (error instanceof Error) {
              if (error.name === 'UsernameExistsException') {
                        return {
                                    statusCode: 409,
                                    body: JSON.stringify({
                                                  success: false,
                                                  error: 'Username already exists',
                                    }),
                        };
              }

            if (error.name === 'InvalidPasswordException') {
                      return {
                                  statusCode: 400,
                                  body: JSON.stringify({
                                                success: false,
                                                error: 'Password does not meet requirements',
                                  }),
                      };
            }
      }

      // Generic error response
      return {
              statusCode: 500,
              body: JSON.stringify({
                        success: false,
                        error: 'An unexpected error occurred during signup',
              }),
      };
    }
};
