# Add Google Sign-In: Complete Action Plan
**OAuth Integration for My-Travel-Agent**

**Estimated Time**: 2-3 hours  
**Prerequisites**: Basic email/password authentication already working  
**Result**: Users can sign up/login with "Continue with Google"

---

## 📋 Overview

This guide adds Google Sign-In as a **second authentication method** alongside your existing email/password system. Users will have both options.

### What You'll Build

```
┌──────────────────────────────────────┐
│      Login/Signup Screen             │
│                                      │
│  ┌────────────────────────────────┐ │
│  │  🔵 Continue with Google       │ │ ← NEW
│  └────────────────────────────────┘ │
│                                      │
│           ────── OR ──────          │
│                                      │
│  Email:    [____________]           │ ← EXISTING
│  Password: [____________]           │
│  [Sign Up / Login]                  │
└──────────────────────────────────────┘
```

---

## ✅ Prerequisites Checklist

Before starting, verify you have:
- [ ] AWS Cognito User Pool deployed and working
- [ ] Email/password signup working
- [ ] DynamoDB user table with profile schema
- [ ] Frontend React app with existing signup form
- [ ] Backend Lambda functions for auth
- [ ] CDK infrastructure code in place

---

## 🚀 Step 1: Google Cloud Console Setup (30 minutes)

### Step 1.1: Create Google Cloud Project

1. **Go to Google Cloud Console**:
   - URL: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create New Project**:
   - Click "Select a Project" dropdown (top bar)
   - Click "New Project"
   - Project Name: `My-Travel-Agent`
   - Organization: Leave as default
   - Location: Leave as default
   - Click "CREATE"
   - Wait ~30 seconds for project creation

3. **Select Your New Project**:
   - Click "Select a Project" dropdown
   - Click on "My-Travel-Agent"

### Step 1.2: Enable Required APIs

1. **Navigate to APIs & Services**:
   - Left menu → "APIs & Services" → "Library"

2. **Enable Google+ API**:
   - Search: "Google+ API"
   - Click on "Google+ API"
   - Click "ENABLE"
   - Wait for confirmation

3. **Enable People API**:
   - Click "Go to API Library"
   - Search: "People API"
   - Click on "People API"
   - Click "ENABLE"
   - Wait for confirmation

### Step 1.3: Configure OAuth Consent Screen

1. **Navigate to OAuth Consent Screen**:
   - Left menu → "APIs & Services" → "OAuth consent screen"

2. **Choose User Type**:
   - Select "External" (for public app)
   - Click "CREATE"

3. **Fill Out App Information**:
   
   **App Information**:
   - App name: `My-Travel-Agent`
   - User support email: `lcgx03@gmail.com`
   - App logo: (optional, skip for now)
   
   **App Domain**:
   - Application home page: `https://mytravelagent.com` (or your domain)
   - Privacy policy: `https://mytravelagent.com/privacy` (create later)
   - Terms of service: `https://mytravelagent.com/terms` (create later)
   
   **Authorized Domains**:
   - Add: `mytravelagent.com`
   - Add: `amazoncognito.com`
   
   **Developer Contact Information**:
   - Email: `lcgx03@gmail.com`
   
   - Click "SAVE AND CONTINUE"

4. **Scopes** (Step 2):
   - Click "ADD OR REMOVE SCOPES"
   - Select these scopes:
     - ✅ `.../auth/userinfo.email`
     - ✅ `.../auth/userinfo.profile`
     - ✅ `openid`
   - Click "UPDATE"
   - Click "SAVE AND CONTINUE"

5. **Test Users** (Step 3):
   - Click "ADD USERS"
   - Add your email: `lcgx03@gmail.com`
   - Click "ADD"
   - Click "SAVE AND CONTINUE"

6. **Summary** (Step 4):
   - Review settings
   - Click "BACK TO DASHBOARD"

### Step 1.4: Create OAuth 2.0 Credentials

1. **Navigate to Credentials**:
   - Left menu → "APIs & Services" → "Credentials"

2. **Create Credentials**:
   - Click "CREATE CREDENTIALS" (top)
   - Select "OAuth 2.0 Client ID"

3. **Configure OAuth Client**:
   
   **Application Type**:
   - Select: "Web application"
   
   **Name**:
   - `My-Travel-Agent - Dev`
   
   **Authorized JavaScript Origins**:
   - Click "ADD URI"
   - Add: `http://localhost:5173`
   - Click "ADD URI"
   - Add: `https://dev.mytravelagent.com` (if you have dev domain)
   
   **Authorized Redirect URIs**:
   - Click "ADD URI"
   - Add: `http://localhost:5173/auth/callback`
   - Click "ADD URI"
   - Add: `https://my-travel-agent-dev.auth.us-east-1.amazoncognito.com/oauth2/idpresponse`
   
   (Note: You'll get the exact Cognito domain in Step 3)
   
   - Click "CREATE"

4. **Save Your Credentials**:
   - A modal appears with your credentials
   - **Copy Client ID**: `12345678.apps.googleusercontent.com`
   - **Copy Client Secret**: `GOCSPX-xxxxxxxxxxxxx`
   - Click "DOWNLOAD JSON" (save as backup)
   - Click "OK"

**✅ Step 1 Complete! You now have Google OAuth credentials.**

---

## 🔐 Step 2: Store Credentials in AWS (15 minutes)

### Step 2.1: Create AWS Secrets Manager Secret

**Option A: Using AWS Console**

1. **Go to AWS Secrets Manager**:
   - URL: https://console.aws.amazon.com/secretsmanager/
   - Region: `us-east-1`

2. **Store a New Secret**:
   - Click "Store a new secret"
   - Secret type: "Other type of secret"
   - Key/value pairs:
     - Key: `clientId`, Value: `[your Google Client ID]`
     - Key: `clientSecret`, Value: `[your Google Client Secret]`
   - Encryption key: Default
   - Click "Next"

3. **Configure Secret**:
   - Secret name: `my-travel-agent/dev/google-oauth`
   - Description: `Google OAuth credentials for dev environment`
   - Tags: 
     - Key: `Project`, Value: `my-travel-agent`
     - Key: `Environment`, Value: `dev`
   - Click "Next"

4. **Configure Rotation** (skip for now):
   - Select "Disable automatic rotation"
   - Click "Next"

5. **Review**:
   - Review settings
   - Click "Store"

**Option B: Using AWS CLI** (faster)

```bash
# Create secret with your credentials
aws secretsmanager create-secret \
  --name my-travel-agent/dev/google-oauth \
  --description "Google OAuth credentials for dev environment" \
  --secret-string '{
    "clientId": "YOUR_GOOGLE_CLIENT_ID",
    "clientSecret": "YOUR_GOOGLE_CLIENT_SECRET"
  }' \
  --region us-east-1 \
  --tags Key=Project,Value=my-travel-agent Key=Environment,Value=dev

# Verify secret was created
aws secretsmanager get-secret-value \
  --secret-id my-travel-agent/dev/google-oauth \
  --region us-east-1
```

### Step 2.2: Add to GitHub Secrets (for CI/CD)

```bash
# Add Google OAuth credentials to GitHub
gh secret set GOOGLE_CLIENT_ID
# Paste your Google Client ID when prompted

gh secret set GOOGLE_CLIENT_SECRET
# Paste your Google Client Secret when prompted

# Verify secrets were added
gh secret list
```

**Expected output**:
```
AWS_ACCESS_KEY_ID      Updated 2026-01-XX
AWS_SECRET_ACCESS_KEY  Updated 2026-01-XX
AWS_REGION             Updated 2026-01-XX
GOOGLE_CLIENT_ID       Updated 2026-01-XX
GOOGLE_CLIENT_SECRET   Updated 2026-01-XX
```

**✅ Step 2 Complete! Credentials are securely stored.**

---

## 🏗️ Step 3: Update AWS Infrastructure (30 minutes)

### Step 3.1: Update AuthStack with Google OAuth

**Open Cursor** and paste this prompt in **Composer Mode** (`Cmd+I` or `Ctrl+I`):

```
Update my Cognito User Pool to support Google Sign-In via OAuth:

File: infrastructure/lib/auth-stack.ts

Current setup: I have a Cognito User Pool with email/password authentication.

Add the following:

1. Import AWS Secrets Manager:
   - Import Secret from 'aws-cdk-lib/aws-secretsmanager'

2. Retrieve Google OAuth Credentials:
   - Use Secret.fromSecretNameV2() to get secret: 'my-travel-agent/{environment}/google-oauth'
   - Parse JSON to extract clientId and clientSecret fields

3. Add Cognito Domain:
   - Create UserPoolDomain
   - Domain prefix: `my-travel-agent-${environment}`
   - Export domain name as: CognitoDomainName
   - Export full domain URL as: CognitoDomainUrl

4. Configure User Pool for OAuth:
   - Keep existing email/password configuration
   - Add supportedIdentityProviders: [UserPoolClientIdentityProvider.COGNITO, UserPoolClientIdentityProvider.GOOGLE]
   - Add OAuth settings:
     * flows: {authorizationCodeGrant: true}
     * scopes: [OAuthScope.EMAIL, OAuthScope.OPENID, OAuthScope.PROFILE]
     * callbackUrls: [
         'http://localhost:5173/auth/callback',
         `https://${environment}.mytravelagent.com/auth/callback`,
         'https://mytravelagent.com/auth/callback'
       ]
     * logoutUrls: [
         'http://localhost:5173/',
         `https://${environment}.mytravelagent.com/`,
         'https://mytravelagent.com/'
       ]

5. Add Google Identity Provider:
   - Create UserPoolIdentityProviderGoogle
   - Use clientId and clientSecret from Secrets Manager
   - Scopes: ['profile', 'email', 'openid']
   - Attribute mapping:
     * email → email
     * given_name → given_name
     * family_name → family_name
     * picture → picture
     * sub → sub (Google user ID)

6. Add Dependency:
   - userPoolClient.node.addDependency(googleProvider)
   - This ensures Google provider is created before client

7. Export Additional Values:
   - HostedUIUrl: Full Cognito Hosted UI authorize URL
   - GoogleProviderName: 'Google'

Requirements:
- TypeScript with proper types
- Environment-aware (dev, prod)
- Comprehensive comments
- Error handling for secret retrieval
- CloudFormation outputs for all exports

Generate the complete updated AuthStack.
```

**Wait for Cursor to generate** (~2-3 minutes)

### Step 3.2: Deploy Updated Infrastructure

```bash
cd infrastructure

# Install dependencies (if any new ones added)
npm install

# Synthesize to check for errors
npx cdk synth --context environment=dev

# Deploy updated infrastructure
npx cdk deploy --all --context environment=dev

# Note the outputs - you'll need:
# - CognitoDomainName: my-travel-agent-dev.auth.us-east-1.amazoncognito.com
# - HostedUIUrl: https://my-travel-agent-dev.auth.us-east-1.amazoncognito.com/oauth2/authorize
```

**Expected Output**:
```
✅ AuthStack deployed
Outputs:
  UserPoolId: us-east-1_XXXXXX
  UserPoolClientId: xxxxxxxxxxxxx
  CognitoDomainName: my-travel-agent-dev.auth.us-east-1.amazoncognito.com
  HostedUIUrl: https://my-travel-agent-dev.auth.us-east-1.amazoncognito.com/oauth2/authorize
  GoogleProviderName: Google
```

### Step 3.3: Update Google Console with Cognito Domain

Now that you have your Cognito domain, go back to Google Cloud Console:

1. **Go to Credentials**:
   - https://console.cloud.google.com/apis/credentials

2. **Edit OAuth Client**:
   - Click on "My-Travel-Agent - Dev"
   - Under "Authorized redirect URIs", update:
     - Replace placeholder with actual: `https://my-travel-agent-dev.auth.us-east-1.amazoncognito.com/oauth2/idpresponse`
   - Click "SAVE"

**✅ Step 3 Complete! Infrastructure supports Google OAuth.**

---

## 💻 Step 4: Update Backend (30 minutes)

### Step 4.1: Create OAuth Callback Handler

**Cursor Prompt** (Composer Mode):

```
Create a Lambda function to handle OAuth callback from Google:

File: backend/src/handlers/auth/oauth-callback.ts

Requirements:

1. Lambda handler for GET /auth/callback
2. Input: Authorization code from query parameters
   - Query param: code (required)
   - Query param: state (optional, for CSRF protection)

3. Logic Flow:
   a. Extract authorization code from query params
   b. Exchange code for tokens with Cognito
   c. Decode id_token to get user info:
      - Cognito sub (user ID)
      - email
      - given_name
      - family_name
      - picture
   d. Check if user exists in DynamoDB (query by Cognito sub)
   e. If new user:
      - Generate username from email (e.g., "john.doe" from "john.doe@gmail.com")
      - Check username uniqueness, add number if needed (john.doe1, john.doe2)
      - Create DynamoDB profile:
        {
          PK: "USER#<cognitoSub>",
          SK: "PROFILE",
          userId: cognitoSub,
          email: userInfo.email,
          username: generated_username,
          displayName: `${userInfo.given_name} ${userInfo.family_name}`,
          authProvider: "google",
          profilePhoto: userInfo.picture,
          bio: "",
          credits: 0,
          createdAt: ISO timestamp,
          followerCount: 0,
          followingCount: 0,
          tripCount: 0,
          googleUserId: userInfo.sub
        }
      - Create GSI3 entry for username lookup
   f. If existing user:
      - Update lastLoginAt timestamp
   g. Return tokens and redirect URL

4. Response:
   - Redirect to: `${FRONTEND_URL}/auth/success?tokens={encrypted_tokens}`
   - Or return JSON: {success: true, tokens: {...}, user: {...}}

5. Error Handling:
   - Invalid code
   - Token exchange failure
   - DynamoDB errors
   - User-friendly error messages

6. Environment Variables:
   - USER_POOL_ID
   - USER_POOL_CLIENT_ID
   - COGNITO_DOMAIN
   - DYNAMODB_TABLE
   - FRONTEND_URL

7. Dependencies:
   - @aws-sdk/client-cognito-identity-provider
   - @aws-sdk/lib-dynamodb
   - jsonwebtoken (for decoding id_token)
   - uuid

Generate:
1. Lambda handler with TypeScript
2. TypeScript interfaces for OAuth tokens and user info
3. Helper functions:
   - exchangeCodeForTokens()
   - decodeIdToken()
   - generateUniqueUsername()
   - createUserProfile()
4. Unit tests with mocked AWS services
5. CDK construct for Lambda + API Gateway route (GET /auth/callback)

Use async/await, comprehensive error handling, and detailed comments.
```

**Wait for Cursor to generate** (~3 minutes)

### Step 4.2: Deploy Backend

```bash
cd backend

# Install new dependencies
npm install jsonwebtoken jwks-rsa

# Build
npm run build

# Deploy via CDK
cd ../infrastructure
npx cdk deploy --all --context environment=dev
```

**✅ Step 4 Complete! Backend handles Google OAuth.**

---

## 🎨 Step 5: Update Frontend (30 minutes)

### Step 5.1: Create Auth Configuration

**Cursor Prompt** (Composer Mode):

```
Create frontend auth configuration for Google OAuth:

File: frontend/src/config/auth.ts

Create a configuration object with:

1. Cognito settings:
   - userPoolId: from environment variable
   - clientId: from environment variable
   - domain: from environment variable (e.g., my-travel-agent-dev.auth.us-east-1.amazoncognito.com)

2. OAuth URLs:
   - getGoogleSignInUrl(): Returns full OAuth authorize URL
     * Base: https://{domain}/oauth2/authorize
     * Params:
       - client_id={clientId}
       - response_type=code
       - scope=email+openid+profile
       - redirect_uri={window.location.origin}/auth/callback
       - identity_provider=Google
   
   - getLogoutUrl(): Returns OAuth logout URL
     * Base: https://{domain}/logout
     * Params:
       - client_id={clientId}
       - logout_uri={window.location.origin}

3. Helper functions:
   - initiateGoogleSignIn(): Redirect to Google OAuth

Export as const authConfig with full TypeScript types.

Also create .env.example with:
VITE_COGNITO_DOMAIN=my-travel-agent-dev.auth.us-east-1.amazoncognito.com
VITE_COGNITO_CLIENT_ID=your_client_id

Generate complete auth config module.
```

### Step 5.2: Update Signup Form with Google Button

**Cursor Prompt** (Composer Mode):

```
Update the signup form to add Google Sign-In button:

File: frontend/src/components/auth/SignupForm.tsx

Add to existing signup form:

1. At the TOP of the form (above email/password fields):
   
   Google Sign-In Button:
   - Material-UI Button component
   - Full width
   - Variant: "outlined"
   - StartIcon: <GoogleIcon /> from @mui/icons-material
   - Text: "Continue with Google"
   - onClick: Call authConfig.initiateGoogleSignIn()

2. Divider:
   - After Google button
   - Material-UI Divider component
   - Text: "OR"

3. Keep existing form fields below

Requirements:
- Material-UI v6 components
- TypeScript
- Responsive design

Generate updated SignupForm component.
```

### Step 5.3: Create OAuth Callback Page

**Cursor Prompt** (Composer Mode):

```
Create a page to handle OAuth callback:

File: frontend/src/pages/AuthCallback.tsx

Requirements:

1. On mount (useEffect):
   a. Show loading spinner
   b. Parse URL query parameter: code
   c. Call backend: GET /auth/callback?code={code}
   d. Store tokens
   e. Redirect to dashboard

2. UI States:
   - Loading: CircularProgress
   - Success: Redirect
   - Error: Error message + "Try Again" button

Use TypeScript, Material-UI v6, React Query.

Generate complete AuthCallback page.
```

### Step 5.4: Build and Test

```bash
cd frontend

# Install new dependencies
npm install @mui/icons-material

# Create .env.local with Cognito domain
echo "VITE_COGNITO_DOMAIN=my-travel-agent-dev.auth.us-east-1.amazoncognito.com" > .env.local
echo "VITE_COGNITO_CLIENT_ID=your_client_id" >> .env.local

# Start dev server
npm run dev
```

**✅ Step 5 Complete! Frontend has Google Sign-In.**

---

## 🧪 Step 6: Test End-to-End (20 minutes)

### Test Google Sign-In Flow

1. Go to http://localhost:5173/signup
2. Click "Continue with Google"
3. Authorize with Google account
4. Verify redirect to dashboard
5. Check DynamoDB for user profile with `authProvider: "google"`

**✅ Step 6 Complete! Google Sign-In working.**

---

## 🚀 Step 7: Deploy (10 minutes)

```bash
git add .
git commit -m "Add Google Sign-In OAuth integration"
git push origin develop
```

---

## 📊 Success Checklist

- [ ] Google Cloud project created
- [ ] OAuth credentials obtained
- [ ] Credentials in AWS Secrets Manager
- [ ] CDK deployed with Google provider
- [ ] OAuth callback Lambda working
- [ ] Google button on signup form
- [ ] End-to-end test passed
- [ ] Deployed to dev

**Estimated Time**: 2-3 hours  
**Cost**: +$0.60/month  

---

**Status**: Ready to Implement 🚀
