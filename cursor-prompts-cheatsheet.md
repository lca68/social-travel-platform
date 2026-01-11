# Cursor Prompts Cheat Sheet
**Quick Reference for AI-First Development**

---

## 🎯 Master Prompt Template

```
Create a [COMPONENT_TYPE] for [FEATURE_NAME]:

Requirements:
- [REQUIREMENT_1]
- [REQUIREMENT_2]
- [REQUIREMENT_3]

Tech Stack:
- [TECHNOLOGIES]

Generate:
1. [OUTPUT_1]
2. [OUTPUT_2]
3. Unit tests
4. [INFRASTRUCTURE_IF_NEEDED]
```

---

## 🔧 Backend: Lambda Functions

### Basic CRUD Lambda
```
Create a Lambda function for [ENTITY] [OPERATION]:

File: backend/src/handlers/[entity]/[operation].ts

Requirements:
- Handler: [HTTP_METHOD] /[path]
- Input: { [fields] }
- Validate input with Zod
- DynamoDB operation: [GET/PUT/UPDATE/DELETE/QUERY]
- Table: my-travel-agent-main
- Auth: Verify Cognito JWT token
- Response: { success: boolean, data?: any, error?: string }
- Error handling: DynamoDB errors, validation errors
- Logging: CloudWatch with request ID

Dependencies:
- @aws-sdk/lib-dynamodb
- zod

Generate:
1. Lambda handler with TypeScript
2. Input/output interfaces
3. Validation schema
4. Unit tests with Jest
5. CDK Lambda construct
```

### API Integration Lambda
```
Create a Lambda function to integrate with [EXTERNAL_API]:

File: backend/src/handlers/[feature]/[operation].ts

Requirements:
- Call [API_NAME] API
- API Key: From environment variable
- Input: { [parameters] }
- Transform response to our format
- Error handling: API errors, rate limits, timeouts
- Retry logic: 3 attempts with exponential backoff
- Cache results in DynamoDB for [DURATION]

Generate:
1. Lambda handler
2. API client class
3. Response transformer
4. Caching logic
5. Unit tests with mocked API
6. CDK construct with API key in Secrets Manager
```

---

## ⚛️ Frontend: React Components

### Form Component
```
Create a React form component for [FEATURE]:

File: frontend/src/components/[feature]/[Name]Form.tsx

Requirements:
- Material-UI Card with form
- Fields: [list fields with types]
- Real-time validation:
  * [validation rules]
- Submit: Call [API_ENDPOINT]
- Loading state: Disable form, show CircularProgress
- Success: Show Snackbar, [action after success]
- Error: Display error message below form

UI/UX:
- Responsive (mobile-first)
- Material-UI components
- Error messages in red below fields
- Helper text for complex fields

State:
- React Hook Form for form handling
- React Query for API call

Generate:
1. Form component with TypeScript
2. Validation schema (yup)
3. API client function
4. Unit tests with React Testing Library
5. Storybook story
```

### List/Grid Component
```
Create a React component to display a list of [ENTITIES]:

File: frontend/src/components/[feature]/[Name]List.tsx

Requirements:
- Fetch from: [API_ENDPOINT]
- Display as: [Grid/List/Cards]
- Each item shows: [fields to display]
- Actions: [click to view, edit button, delete button]
- Pagination: Load more on scroll (infinite scroll)
- Loading: Skeleton placeholders
- Empty state: Nice message + illustration
- Error state: Error message + retry button

Features:
- Search/filter: [filter options]
- Sort: [sort options]
- Responsive: 1 column mobile, 2 tablet, 3+ desktop

Generate:
1. List component with TypeScript
2. List item component
3. Hooks for data fetching (React Query)
4. Pagination logic
5. Unit tests
```

### Modal/Dialog Component
```
Create a Material-UI Dialog for [PURPOSE]:

File: frontend/src/components/[feature]/[Name]Dialog.tsx

Props:
- open: boolean
- onClose: () => void
- [additional props]

Content:
- Title: [dialog title]
- Body: [what to show]
- Actions: [Cancel, Confirm, etc.]

Requirements:
- Close on backdrop click
- Close on Escape key
- Confirm action: [what happens]
- Loading state while processing
- Success/error feedback

Generate:
1. Dialog component
2. Props interface
3. Unit tests
```

---

## 🏗️ Infrastructure: AWS CDK

### Lambda + API Gateway
```
Create CDK construct for [FEATURE] API:

File: infrastructure/lib/constructs/[feature]-api.ts

Requirements:
- Lambda function:
  * Runtime: Node 20
  * Handler: index.handler
  * Code: ../backend/dist/handlers/[path]
  * Memory: 512 MB
  * Timeout: 30 seconds
  * Environment variables: [list vars]
  * IAM permissions: [DynamoDB, S3, etc.]

- API Gateway routes:
  * [METHOD] /[path] → Lambda
  * Authorizer: Cognito User Pool
  * CORS enabled
  * Request validation: [body schema]

- Outputs:
  * Lambda function ARN
  * API endpoint URL

Generate:
1. CDK construct class
2. Lambda function definition
3. API Gateway integration
4. IAM roles and policies
5. CloudWatch log group
```

### DynamoDB Table
```
Create CDK construct for DynamoDB table:

File: infrastructure/lib/constructs/[feature]-table.ts

Requirements:
- Table name: my-travel-agent-[feature]-{env}
- Keys:
  * PK: string (partition key)
  * SK: string (sort key)
- GSIs:
  * [GSI_NAME]: PK=[field], SK=[field]
- Billing: ON_DEMAND
- Point-in-time recovery: enabled
- Stream: NEW_AND_OLD_IMAGES
- TTL: [field_name]

Generate:
1. CDK construct
2. Table definition with all indexes
3. IAM policy for read/write access
4. Outputs: table name, ARN
```

---

## 🧪 Testing

### Unit Tests for Lambda
```
Create Jest unit tests for [LAMBDA_FUNCTION]:

File: backend/src/handlers/[path]/__tests__/[name].test.ts

Test cases:
1. Happy path: Valid input returns success
2. Invalid input: Returns validation error
3. DynamoDB error: Returns error response
4. Auth error: Returns 401 unauthorized
5. Edge cases: [specific edge cases]

Requirements:
- Mock AWS SDK (DynamoDB, Cognito, etc.)
- Mock environment variables
- Test all error scenarios
- Code coverage >80%

Generate comprehensive test suite.
```

### Component Tests
```
Create React Testing Library tests for [COMPONENT]:

File: frontend/src/components/[path]/__tests__/[name].test.tsx

Test cases:
1. Renders correctly
2. Form submission: Success case
3. Form submission: Error case
4. Validation: Invalid inputs show errors
5. User interactions: Clicks, typing, etc.
6. Loading states
7. Edge cases: [specific cases]

Requirements:
- Mock API calls (MSW or Jest mocks)
- Mock React Router navigation
- Test accessibility (a11y)
- Snapshot tests for UI

Generate comprehensive test suite.
```

---

## 🗃️ Database Queries

### DynamoDB Query
```
Create a DynamoDB query helper for [USE_CASE]:

File: backend/src/db/queries/[name].ts

Requirements:
- Table: my-travel-agent-main
- Operation: [QUERY/SCAN/GET/PUT/UPDATE/DELETE]
- Keys:
  * PK: [value or expression]
  * SK: [value or expression]
- GSI: [if needed]
- Filter: [conditions]
- Projection: [fields to return]
- Pagination: Return cursor for next page

Generate:
1. TypeScript function with proper types
2. Input/output interfaces
3. Error handling
4. Pagination logic
5. Unit tests with mocked DynamoDB
```

### Complex Query (Multiple Items)
```
Create a function to fetch [DESCRIPTION]:

Requirements:
- Query [ENTITY] where [CONDITIONS]
- Sort by [FIELD]
- Limit: [N] items
- Include related data: [join logic]
- Batch get if needed (for efficiency)

Example:
"Fetch user's trips with associated posts and engagement counts"

Generate:
1. Query function with batch operations
2. Data transformation/aggregation
3. Caching strategy
4. Unit tests
```

---

## 🔗 API Client

### REST API Client
```
Create API client for [FEATURE]:

File: frontend/src/api/[feature].ts

Endpoints:
- [METHOD] /[path] - [description]
- [METHOD] /[path] - [description]

Requirements:
- Use axios
- Base URL from environment variable
- Auth: Include JWT token in headers
- Error handling: Network errors, API errors
- TypeScript interfaces for all requests/responses
- Retry logic for failed requests (3 attempts)

Generate:
1. API client class
2. All endpoint methods
3. Request/response types
4. Error handling utilities
5. Unit tests with mocked axios
```

---

## 🎨 Styling & UI

### Theme Customization
```
Create Material-UI theme for My-Travel-Agent:

File: frontend/src/theme.ts

Requirements:
- Color palette:
  * Primary: [color] (travel/adventure vibe)
  * Secondary: [color]
  * Background: Light and dark modes
- Typography:
  * Font family: [modern, readable]
  * Font sizes: Responsive
- Components:
  * Button: Rounded corners, elevation
  * Card: Subtle shadow
  * Input: Outlined style
- Spacing: Consistent 8px grid
- Breakpoints: Mobile-first

Generate:
1. Theme configuration
2. Custom component overrides
3. Dark mode support
```

---

## 🤖 AI Integration (Bedrock)

### Bedrock Conversation
```
Create Bedrock integration for [FEATURE]:

File: backend/src/services/bedrock-[feature].ts

Requirements:
- Model: Claude Sonnet 4.5
- System prompt: [detailed prompt]
- Input: User message + conversation history
- Output: Structured JSON response
- Token limits: Max 30K tokens per conversation
- Conversation history: Store in DynamoDB
- Streaming: Optional (for real-time updates)
- Error handling: Bedrock throttling, token limits

Generate:
1. Bedrock service class
2. Prompt templates
3. Conversation manager
4. Response parser
5. Unit tests with mocked Bedrock
```

---

## 📊 Monitoring & Logging

### CloudWatch Dashboard
```
Create CloudWatch dashboard for [FEATURE]:

File: infrastructure/lib/monitoring/[feature]-dashboard.ts

Widgets:
- API Gateway: Request count, latency, errors
- Lambda: Invocations, errors, duration, throttles
- DynamoDB: Read/write capacity, throttles
- Custom metrics: [business metrics]

Alarms:
- Error rate >1%
- Latency >2000ms
- Throttles detected

Generate:
1. CDK dashboard construct
2. All widgets
3. Alarm definitions
4. SNS topic for notifications
```

---

## 🚀 Quick Commands

### Generate New Feature (Full Stack)
```
@composer Create a new feature for [FEATURE_NAME]:

Backend:
- Lambda: [HTTP_METHOD] /[path]
- Logic: [description]
- Database: [operations]

Frontend:
- Component: [Name]Component
- UI: [description]
- API calls: [endpoints]

Infrastructure:
- CDK: Lambda + API Gateway route
- Permissions: [IAM policies]

Generate all files, tests, and CDK constructs.
```

### Add Validation
```
Add input validation to [FILE]:

Use Zod schema to validate:
- [field]: [rules]
- [field]: [rules]

Return clear error messages for invalid inputs.
```

### Add Error Handling
```
Improve error handling in [FILE]:

Add:
1. Try-catch blocks around async operations
2. Specific error types for different scenarios
3. User-friendly error messages
4. Logging with context
5. Rollback logic if needed
```

### Refactor for Performance
```
Optimize [FILE] for performance:

Issues:
- [performance issue 1]
- [performance issue 2]

Improvements:
- Add caching where appropriate
- Reduce unnecessary API calls
- Optimize database queries
- Add pagination
- Lazy load components
```

---

## 💡 Tips for Best Results

### 1. Be Specific
❌ "Create a login form"  
✅ "Create a Material-UI login form with email/password fields, validation, loading state, and error handling. Use React Hook Form and call POST /auth/login API."

### 2. Include Context
```
@auth-stack.ts Add MFA to this Cognito setup
@README.md Follow the conventions in this file
```

### 3. Iterate
```
Update the previous function to:
- Add rate limiting (5 requests per minute)
- Add request logging
- Improve error messages
```

### 4. Reference Docs
```
@docs https://docs.aws.amazon.com/bedrock/ Create Bedrock integration following AWS best practices
```

### 5. Use Composer for Multi-File
When a feature touches backend + frontend + infrastructure, use:
```
@composer Create [FEATURE] with:
- Backend Lambda
- React component
- CDK infrastructure
- Tests for both
```

---

## 🎯 Daily Workflow

### Morning (Planning)
```
I'm building [FEATURE] today. It needs:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

Generate a checklist of files I need to create and prompts to use.
```

### During Development
Use prompts from this cheat sheet, substituting [PLACEHOLDERS] with your specifics.

### Before Pushing
```
Review the code I'm about to commit:
[paste code]

Check for:
- Security issues
- Performance problems
- Missing error handling
- Code quality improvements
```

---

**Print this and keep it next to your desk! 🖨️**

Every prompt here is battle-tested and optimized for Cursor + Claude.

