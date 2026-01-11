# My-Travel-Agent: Immediate Action Plan
**AI-First Development with Cursor + Claude**

**Last Updated**: January 10, 2026  
**Your Email**: lcgx03@gmail.com  
**Timeline**: TODAY through Week 2

---

## 🚀 TODAY: Day 1 Action Plan (4 hours)

### Hour 1: Repository Setup (9:00 AM - 10:00 AM)

#### Step 1.1: Create GitHub Repository
```bash
# Open terminal and run:
gh auth login
# Follow prompts, use lcgx03@gmail.com

# Create repository
gh repo create my-travel-agent \
  --private \
  --description "AI-powered social travel platform - Democratic creator economy for travelers" \
  --clone

cd my-travel-agent
```

#### Step 1.2: Initialize Project with Cursor

**Open Cursor** and use this prompt in Cursor Chat:

```
I'm starting a TypeScript monorepo for "My-Travel-Agent" - a social travel platform.

Project structure:
- /frontend - React + TypeScript + Material-UI PWA
- /backend - AWS Lambda functions in TypeScript
- /infrastructure - AWS CDK in TypeScript

Create the following:

1. Root package.json with npm workspaces:
   - workspaces: ["frontend", "backend", "infrastructure"]
   - scripts for build, test, deploy
   - devDependencies: typescript, prettier, eslint

2. .gitignore with:
   - node_modules
   - .env, .env.local
   - dist, build
   - .aws-sam, cdk.out
   - .DS_Store, .idea, .vscode (except settings)
   - *.log

3. Root tsconfig.json with:
   - target: ES2022
   - module: ESNext
   - strict: true
   - esModuleInterop: true

4. prettier.rc.json with my preferred settings

5. eslint.config.js for TypeScript

6. README.md with:
   - Project overview
   - Tech stack
   - Setup instructions
   - Development workflow

7. Directory structure:
   /frontend
   /backend
   /infrastructure
   /docs

8. Initial package.json for each workspace

Use modern conventions, TypeScript 5+, and include detailed comments.
```

#### Step 1.3: Commit Initial Structure
```bash
git add .
git commit -m "Initial project structure with TypeScript monorepo"
git push -u origin main

# Create develop branch
git checkout -b develop
git push -u origin develop
```

---

### Hour 2: CI/CD Pipeline (10:00 AM - 11:00 AM)

#### Step 2.1: Generate GitHub Actions Workflow

**Cursor Prompt** (Composer Mode):

```
Create GitHub Actions CI/CD pipeline for my AWS serverless app:

Requirements:
1. .github/workflows/deploy.yml:
   - Trigger: push to main (prod) and develop (dev)
   - Jobs: test, deploy
   - Test job:
     * Checkout code
     * Setup Node 20
     * Install dependencies in all workspaces
     * Run Jest tests in backend
     * Run React tests in frontend
     * Fail if any tests fail
   
   - Deploy job (depends on test):
     * Only runs on main or develop branches
     * Setup Node 20
     * Install AWS CDK CLI
     * Configure AWS credentials from secrets
     * Deploy infrastructure:
       - develop branch → dev environment
       - main branch → prod environment
     * Environment variables from GitHub secrets

2. .github/workflows/pr-check.yml:
   - Trigger: pull requests to main or develop
   - Jobs: lint, test, build
   - Status check required before merge

3. Environment-specific config:
   - infrastructure/cdk.json with context:
     * dev: {environment: "dev", domain: "dev.mytravelagent.com"}
     * prod: {environment: "prod", domain: "mytravelagent.com"}

AWS Secrets needed:
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_REGION (us-east-1)

Add comments explaining each step.
Include error handling and notifications.
```

#### Step 2.2: Configure GitHub Secrets

```bash
# In GitHub web interface (https://github.com/YOUR_USERNAME/my-travel-agent/settings/secrets):
# Go to Settings > Secrets and variables > Actions

# Add these secrets:
# 1. AWS_ACCESS_KEY_ID: <your-aws-access-key>
# 2. AWS_SECRET_ACCESS_KEY: <your-aws-secret-key>
# 3. AWS_REGION: us-east-1

# Or use GitHub CLI:
gh secret set AWS_ACCESS_KEY_ID
gh secret set AWS_SECRET_ACCESS_KEY
gh secret set AWS_REGION --body "us-east-1"
```

---

### Hour 3: AWS Infrastructure (11:00 AM - 12:00 PM)

#### Step 3.1: Generate CDK Infrastructure

**Cursor Prompt** (Composer Mode - this is a BIG one):

```
Create AWS CDK infrastructure for my travel platform:

Project: My-Travel-Agent
Environments: dev, prod
Region: us-east-1

Create these CDK stacks:

1. AuthStack (infrastructure/lib/auth-stack.ts):
   - Cognito User Pool:
     * Username: email
     * Password policy: min 8 chars, require uppercase, lowercase, numbers
     * Email verification required
     * MFA: optional
   - Cognito Identity Pool for authenticated users
   - Export: UserPoolId, UserPoolClientId, IdentityPoolId

2. DatabaseStack (infrastructure/lib/database-stack.ts):
   - DynamoDB table 'my-travel-agent-{env}':
     * PK: string (partition key)
     * SK: string (sort key)
     * Billing: ON_DEMAND
     * Point-in-time recovery: enabled
     * Stream: NEW_AND_OLD_IMAGES (for triggers)
     
     * GSI1: GSI1PK, GSI1SK (for social feed by time)
     * GSI2: GSI2PK, GSI2SK (for trip discovery by destination)
     * GSI3: GSI3PK, GSI3SK (for user lookup by email/username)
     
     * TTL attribute: ttl (for expiring data)
   
   - Export: TableName, TableArn

3. StorageStack (infrastructure/lib/storage-stack.ts):
   - S3 bucket for user uploads: 'my-travel-agent-uploads-{env}'
     * CORS enabled for React app
     * Versioning enabled
     * Lifecycle: delete after 7 days for incomplete uploads
     * Public access: blocked (use pre-signed URLs)
   
   - S3 bucket for static assets: 'my-travel-agent-assets-{env}'
     * Public read access
     * Website hosting enabled
   
   - Export: UploadsBucketName, AssetsBucketName

4. ApiStack (infrastructure/lib/api-stack.ts):
   - API Gateway REST API: 'my-travel-agent-api-{env}'
     * CORS enabled
     * Authorizer: Cognito User Pool
     * Throttling: 1000 req/sec
     * API key required for some endpoints
   
   - Sample Lambda function:
     * Runtime: Node 20
     * Handler: GET /health
     * Returns: {status: "ok", timestamp: ISO, env: "dev/prod"}
     * Environment variables: DYNAMODB_TABLE, S3_BUCKET
     * IAM role: read DynamoDB, read/write S3
   
   - Export: ApiUrl, ApiId

5. MonitoringStack (infrastructure/lib/monitoring-stack.ts):
   - CloudWatch billing alarms:
     * Alert at $50, $100, $150, $200
     * SNS topic: email to lcgx03@gmail.com
   
   - CloudWatch dashboard:
     * API Gateway metrics (requests, latency, errors)
     * Lambda metrics (invocations, errors, duration)
     * DynamoDB metrics (read/write capacity, throttles)
     * S3 metrics (request count, bytes transferred)

6. Main app (infrastructure/bin/app.ts):
   - Load environment from context (dev or prod)
   - Instantiate all stacks
   - Apply tags: Project=my-travel-agent, Environment={env}
   - Stack dependencies: Auth → Database → Storage → Api → Monitoring

Additional files:
- infrastructure/package.json with dependencies
- infrastructure/tsconfig.json
- infrastructure/cdk.json with context
- infrastructure/.env.example

Requirements:
- TypeScript 5+
- AWS CDK v2
- Proper error handling
- Comprehensive comments
- Follow AWS best practices for IAM (least privilege)
- Cost-optimized (use on-demand, not provisioned)
```

#### Step 3.2: Bootstrap and Deploy

```bash
cd infrastructure

# Install dependencies
npm install

# Bootstrap CDK (one-time setup)
npx cdk bootstrap

# Synthesize CloudFormation (check for errors)
npx cdk synth --context environment=dev

# Deploy dev environment
npx cdk deploy --all --context environment=dev --require-approval never

# Test health endpoint
curl https://<api-id>.execute-api.us-east-1.amazonaws.com/dev/health
```

---

### Hour 4: First Feature - User Signup (12:00 PM - 1:00 PM)

#### Step 4.1: Generate Backend for Signup

**Cursor Prompt** (Composer Mode):

```
Create a complete user signup feature for AWS Lambda + Cognito + DynamoDB:

File: backend/src/handlers/auth/signup.ts

Requirements:
1. Lambda handler for POST /auth/signup
2. Input schema:
   {
     email: string (valid email format)
     password: string (min 8 chars, complexity requirements)
     username: string (alphanumeric, 3-20 chars, unique)
     displayName: string (1-50 chars)
   }

3. Validation:
   - Email format (regex)
   - Password strength (min 8, uppercase, lowercase, number)
   - Username: alphanumeric only, check uniqueness in DynamoDB
   - Display name: not empty

4. Logic:
   - Validate input
   - Check if username already exists (query GSI3)
   - Create Cognito user with AdminCreateUser
   - Set permanent password with AdminSetUserPassword
   - Verify email with AdminUpdateUserAttributes
   - Create DynamoDB profile:
     {
       PK: "USER#<userId>",
       SK: "PROFILE",
       userId: uuid(),
       email: input.email,
       username: input.username,
       displayName: input.displayName,
       bio: "",
       profilePhoto: "",
       credits: 0,
       createdAt: ISO timestamp,
       followerCount: 0,
       followingCount: 0,
       tripCount: 0
     }
   - Also create GSI3 entry for username lookup:
     {
       PK: "USER#<userId>",
       SK: "PROFILE",
       GSI3PK: input.username,
       GSI3SK: "USERNAME"
     }

5. Response:
   Success: {
     success: true,
     userId: string,
     message: "Account created. Please check your email."
   }
   Error: {
     success: false,
     error: string (user-friendly message)
   }

6. Error handling:
   - UsernameExistsException from Cognito
   - Email already exists
   - DynamoDB errors
   - Invalid input

7. Dependencies:
   - @aws-sdk/client-cognito-identity-provider
   - @aws-sdk/lib-dynamodb
   - uuid
   - zod (for validation)

8. Environment variables:
   - USER_POOL_ID
   - DYNAMODB_TABLE

Generate:
1. Lambda handler with TypeScript
2. Input/output TypeScript interfaces
3. Helper functions for validation
4. Unit tests with Jest (mock AWS SDK)
5. CDK construct for Lambda + API Gateway route

Use async/await, proper error handling, and comprehensive comments.
```

#### Step 4.2: Generate Frontend Signup Form

**Cursor Prompt** (Composer Mode):

```
Create a React signup form component with Material-UI:

File: frontend/src/components/auth/SignupForm.tsx

Requirements:
1. Material-UI form with fields:
   - Email (email input, required)
   - Password (password input, required, show/hide toggle)
   - Confirm Password (must match password)
   - Username (text input, alphanumeric validation, required)
   - Display Name (text input, required)

2. Real-time validation:
   - Email format
   - Password strength indicator (weak/medium/strong)
   - Password confirmation match
   - Username format (alphanumeric, 3-20 chars)
   - Display name not empty

3. Form submission:
   - Disable submit button while loading
   - Show loading spinner
   - Call POST /auth/signup API
   - Success: Show success message, redirect to login
   - Error: Display error message from API

4. UI/UX:
   - Responsive (mobile-first)
   - Material-UI Card with elevation
   - Error messages below fields (red)
   - Success message (green Snackbar)
   - "Already have an account? Login" link
   - Password requirements helper text

5. State management:
   - Use React Hook Form for form handling
   - Use React Query for API call
   - Local state for loading, error

6. TypeScript:
   - Proper types for form data
   - API response types
   - Props interface

Generate:
1. SignupForm component
2. API client function (axios)
3. Form validation schema (yup or zod)
4. Unit tests with React Testing Library
5. Storybook story

Use React 18, TypeScript 5, Material-UI v6, and modern hooks.
```

---

## End of Day 1 Checklist

By 1:00 PM, you should have:

✅ GitHub repository created and pushed  
✅ CI/CD pipeline configured (auto-deploys on push)  
✅ AWS infrastructure deployed:
  - Cognito user pool
  - DynamoDB table with GSIs
  - S3 buckets
  - API Gateway
  - CloudWatch alarms
  - Health check endpoint working
✅ User signup feature complete:
  - Backend Lambda function
  - Frontend React form
  - End-to-end tested

**Total Time**: ~4 hours  
**Code Written by You**: ~200 lines (prompts, configs)  
**Code Generated by AI**: ~2,000 lines (90% of work)

---

## Day 2-3: Core Authentication (Next 8 hours)

### Features to Build

1. **User Login** (2 hours)
   - Lambda: POST /auth/login (Cognito authentication)
   - React: Login form component
   - JWT token handling

2. **Password Reset** (2 hours)
   - Lambda: POST /auth/forgot-password
   - Lambda: POST /auth/reset-password
   - React: Forgot password flow

3. **Protected Routes** (2 hours)
   - React: Auth context provider
   - JWT validation middleware for Lambda
   - Redirect logic for protected pages

4. **User Profile** (2 hours)
   - Lambda: GET /users/me
   - Lambda: PUT /users/me
   - React: Profile page with edit

### Cursor Prompts for Each Feature

Use the same pattern as Day 1, but replace "signup" with each feature above.

**Example for Login**:
```
Create a complete user login feature for AWS Lambda + Cognito:

File: backend/src/handlers/auth/login.ts

Requirements:
1. Lambda handler for POST /auth/login
2. Input: { email, password }
3. Logic:
   - Authenticate with Cognito (AdminInitiateAuth)
   - Return JWT tokens
   - Fetch user profile from DynamoDB
4. Response: { tokens, user }
5. Error handling

Generate:
1. Lambda handler
2. TypeScript interfaces
3. Unit tests
4. CDK construct
```

---

## Week 1 Goals (Days 1-5)

### Monday-Wednesday: Foundation + Auth
- [x] Day 1: Repository, CI/CD, Infrastructure, Signup
- [ ] Day 2: Login, Password Reset
- [ ] Day 3: Protected Routes, User Profile

### Thursday-Friday: Trip Planning Basics
- [ ] Day 4: Trip CRUD (create, read, update, delete)
- [ ] Day 5: Trip list and detail pages

**By End of Week 1**:
- Users can sign up, log in, reset password
- Users can create and view trips
- CI/CD pipeline deploying automatically
- ~8,000 lines of code (90% AI-generated)

---

## Week 2 Goals (Days 6-10)

### AI Trip Planning Feature

**Monday**: Bedrock Integration (4 hours)
```
Create AWS Bedrock integration for trip planning:

File: backend/src/services/bedrock.ts

Requirements:
1. Function: generateTripPlan(userMessage, conversationHistory)
2. Use AWS Bedrock with Claude Sonnet 4.5
3. System prompt:
   "You are a travel planning assistant. Help users plan amazing trips.
   Generate detailed itineraries with activities, times, and locations.
   Format output as JSON with this structure:
   {
     destination: string,
     days: [
       {
         day: number,
         date: string,
         activities: [
           {time, title, location, description, cost}
         ]
       }
     ],
     estimatedCost: number,
     tips: string[]
   }"
4. Conversation history: Store in DynamoDB
5. Token limit: 30,000 tokens max per conversation
6. Error handling: Bedrock throttling, token limits

Generate:
1. Bedrock service class
2. Conversation manager
3. Prompt templates
4. Unit tests
```

**Tuesday**: AI Chat UI (4 hours)
- React chat component with Material-UI
- Message history
- Typing indicators
- Streaming responses (optional)

**Wednesday**: Itinerary Display (4 hours)
- Parse AI-generated JSON
- Display as timeline/cards
- Edit itinerary
- Save to trip

**Thursday**: Photo Uploads (4 hours)
- S3 pre-signed URLs
- Upload component
- Image preview and crop
- Attach photos to trips

**Friday**: Integration Testing (4 hours)
- End-to-end tests
- User journey: Signup → Create trip → AI plan → Save
- Bug fixes

---

## Cursor Workflow Tips

### 1. Use Composer Mode for Multi-File Changes
When a feature requires changes across backend + frontend + infrastructure:
```
@composer Create a [FEATURE] with:
- Backend Lambda function
- Frontend React component  
- CDK infrastructure
- Unit tests for both
```

### 2. Use Chat Mode for Explanations
When you don't understand generated code:
```
Explain this code: [paste code]
What does this function do?
How would I modify this to add [X]?
```

### 3. Use @ Mentions for Context
```
@auth-stack.ts Add Cognito MFA to this stack
@signup.tsx Add Google OAuth to this signup form
@docs/api.md Generate API documentation for all endpoints
```

### 4. Iterate When Needed
If first generation isn't perfect:
```
Update the previous function to:
- Add rate limiting
- Improve error messages
- Add logging
```

### 5. Generate Tests Separately
If AI doesn't generate good tests:
```
Create comprehensive unit tests for [FILE] covering:
- Happy path
- Error cases
- Edge cases
- Mock all AWS services
```

---

## Cost Tracking Checklist

### Daily (End of Day)
```bash
# Check AWS costs
aws ce get-cost-and-usage \
  --time-period Start=2026-01-10,End=2026-01-11 \
  --granularity DAILY \
  --metrics "UnblendedCost" \
  --group-by Type=SERVICE
```

### Weekly (Friday)
- Review CloudWatch dashboard
- Check billing alarms (should be <$50/week)
- Optimize any expensive queries

### Monthly Target
- Beta: <$200/month total AWS costs
- Bedrock: <$150/month (largest cost)
- DynamoDB: <$20/month
- Lambda: <$10/month
- S3: <$10/month
- Other: <$10/month

---

## Troubleshooting Common Issues

### CI/CD Fails
```bash
# Check GitHub Actions logs
gh run list
gh run view <run-id>

# Common fixes:
# 1. AWS credentials expired → Update secrets
# 2. CDK bootstrap needed → Run cdk bootstrap
# 3. Tests failing → Fix tests locally first
```

### Lambda Deployment Fails
```bash
# Check CDK diff
cd infrastructure
npx cdk diff --context environment=dev

# Common fixes:
# 1. Missing IAM permissions → Update role
# 2. Environment variable missing → Add to CDK
# 3. Dependency issue → Check package.json
```

### Cursor Not Generating Good Code
```
# Try these:
1. Be more specific in prompts
2. Include example code
3. Reference documentation: @docs [URL]
4. Break into smaller prompts
5. Use Composer mode for complex changes
```

---

## Success Metrics

### End of Week 1
- ✅ 100% CI/CD working (automated deploys)
- ✅ Auth system complete (signup, login, reset)
- ✅ Trip CRUD working
- ✅ <$50 AWS costs

### End of Week 2  
- ✅ AI trip planning working (Bedrock integration)
- ✅ Photo uploads working
- ✅ 10+ features complete
- ✅ <$100 AWS costs

### End of Week 12
- ✅ All 5 core features complete
- ✅ 100 beta users signed up
- ✅ <$200/month AWS costs
- ✅ Production-ready quality

---

## Resources

### Documentation
- AWS CDK: https://docs.aws.amazon.com/cdk/
- AWS Bedrock: https://docs.aws.amazon.com/bedrock/
- DynamoDB Single-Table: https://www.alexdebrie.com/posts/dynamodb-single-table/
- Material-UI: https://mui.com/material-ui/
- React Query: https://tanstack.com/query/latest

### Cursor Resources
- Cursor Documentation: https://docs.cursor.com/
- Cursor Composer: https://docs.cursor.com/composer/
- Cursor @ Rules: https://docs.cursor.com/@-symbols/

### AWS Cost Calculator
- https://calculator.aws/

---

## Emergency Contacts

**Stuck? Need help?**
- Cursor AI Chat (built into IDE)
- Claude Pro web interface: https://claude.ai
- AWS Support (if costs spike)
- GitHub Issues (for CDK/AWS SDK bugs)

---

**YOU'RE READY! Start with Day 1, Hour 1, Step 1.1** 🚀

Open Cursor, create that GitHub repo, and let AI build your startup.

