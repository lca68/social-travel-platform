# My-Travel-Agent: Complete Project Requirements
**AI-Powered Social Travel Platform**

**Founder**: Lourdes  
**Email**: lcgx03@gmail.com  
**Status**: NEW Startup Launch  
**Timeline**: 12 Weeks to Beta  
**Target**: 100 Beta Users, <$200/month

---

## Table of Contents

1. [Founder Background](#founder-background)
2. [Product Overview](#product-overview)
3. [Competitive Context](#competitive-context)
4. [Tech Stack](#tech-stack)
5. [Accounts & Tools Ready](#accounts--tools-ready)
6. [Beta Goals (12 Weeks)](#beta-goals-12-weeks)
7. [Business Model](#business-model)
8. [Requirements Breakdown](#requirements-breakdown)
9. [Constraints](#constraints)
10. [Success Criteria](#success-criteria)

---

## Founder Background

### Experience
- **25+ years** in telecommunications and IT
- **Former VP at Wipro** - Led 3,000 engineers in global 5G practice
- **Former AVP at AT&T** - Managed $100M+ budget
- **Strong AWS experience** - Comfortable with infrastructure
- **Federal contracting expertise** - SAM.gov registered, CAGE certified
- **Technical founder** - Building solo using AI agents (Cursor + Claude)

### This Venture
- **NEW business** (separate from previous work)
- **Fresh start** - No legacy code or technical debt
- **Solo founder** - Leveraging AI for acceleration
- **Self-funded** - Bootstrap approach initially

---

## Product Overview

### Core Value Proposition
**My-Travel-Agent** combines five powerful features that no competitor offers together:

### 1. Social Feed (Instagram-Style)
- Users browse and share trips
- Post photos, itineraries, recommendations
- Discover destinations through real travelers
- Like, comment, save posts

### 2. AI Trip Planning
- **Conversational interface** using Claude via AWS Bedrock
- Natural language: "Plan me a 7-day trip to Japan in cherry blossom season"
- AI generates detailed itineraries
- Real-time adjustments based on preferences
- Learn from user behavior

### 3. Democratic Credit Rewards
- **Everyone earns money** when others use their trips (not just influencers)
- Base $5 per trip usage + bonuses for engagement
- Transparent earnings dashboard
- Sustainable model: 10-21% of booking commission
- Build a creator economy for all travelers

### 4. Live Trip Mode
- **Real-time assistance while traveling**
- "I'm at the Eiffel Tower, what should I do next?"
- Context-aware recommendations
- Location-based suggestions
- Check-in tracking

### 5. Group Travel
- **Shared trip planning** with friends/family
- Collaborative editing of itinerary
- Group chat for coordination
- Voting on activities
- Per-person cost tracking
- Shared photo albums

### Why This Wins
- **Full lifecycle coverage**: Plan → Share → Travel → Earn
- **Social + Utility**: Not just planning tools, but community
- **Democratic rewards**: Every user can earn, not just influencers
- **Group coordination**: Solves the "group trip nightmare"
- **AI-powered**: Best recommendations, personalized

---

## Competitive Context

### Boop (Main Competitor)
- **Raised $3.2M** (November 2025)
- **Gaps**:
  - ❌ No social feed
  - ❌ No AI chat interface
  - ❌ No live trip mode
  - ❌ Creator-only rewards (not democratic)
  - ❌ Weak group travel features

### My Competitive Advantages
✅ **Social feed** - Community engagement  
✅ **Conversational AI** - Better UX than forms  
✅ **Democratic rewards** - Everyone earns  
✅ **Live assistance** - Real-time value  
✅ **Group features** - Shared planning, chat, voting  
✅ **Full lifecycle** - End-to-end solution  

### Market Window
- **6-month window** to execute before copycats
- First-mover advantage in democratic creator economy
- Boop's funding validates market demand

---

## Tech Stack

### Frontend
- **Framework**: React 18+
- **Language**: TypeScript 5+
- **UI Library**: Material-UI v6
- **App Type**: Progressive Web App (PWA)
  - Avoid app store approval delays
  - Works on iOS, Android, Desktop
  - Installable from browser

### Backend (Serverless)
- **Compute**: AWS Lambda (Node.js 20)
- **API**: API Gateway (REST)
- **Database**: DynamoDB (NoSQL)
- **AI**: AWS Bedrock (Claude Sonnet 4.5)
- **Storage**: S3 (photos, assets)
- **CDN**: CloudFront (optional for v1)
- **Auth**: AWS Cognito (user management)
- **Email**: AWS SES (notifications)

### Infrastructure as Code
- **Framework**: AWS CDK (TypeScript) - AI-generated
- **Version Control**: GitHub
- **CI/CD**: GitHub Actions (automated from Week 1)
  - Auto-test on every push
  - Auto-deploy to dev/staging/prod
  - Rollback on failure
- **Environments**: Dev, Staging, Production (isolated)
- **Monitoring**: CloudWatch (automated alerts)

### Development Tools (AI-First)
- **IDE**: Cursor (AI-powered code generation)
- **AI Assistant**: Claude Pro (architecture & design decisions)
- **Browser Extension**: Claude Chrome Extension (documentation & debugging)
- **Package Manager**: npm/yarn
- **CI/CD**: GitHub Actions (automated testing & deployment)

### Development Philosophy: **AI-First, Human-Guided**

**Code Generation Strategy**:
- **90% AI-Generated**: Cursor writes boilerplate, CRUD, UI components
- **10% Human-Guided**: Architecture decisions, prompts, validation
- **100% Automated**: CI/CD deploys, tests, and monitors

**Human Role**:
- ✅ Define architecture and data models
- ✅ Write Cursor prompts for each component
- ✅ Review and validate AI-generated code
- ✅ Make design decisions (UX, business logic)
- ✅ Test and iterate

**AI Role (Cursor + Claude)**:
- ✅ Generate all Lambda functions
- ✅ Generate all React components
- ✅ Write TypeScript interfaces
- ✅ Create CDK infrastructure code
- ✅ Write unit tests
- ✅ Generate API client code

### Architecture Pattern
- **Serverless first**: Pay only for usage
- **Event-driven**: DynamoDB Streams for notifications
- **Single-table design**: Optimize DynamoDB costs
- **Pre-signed URLs**: Direct S3 uploads (avoid Lambda limits)
- **AI-generated code**: Cursor creates 90% of implementation

---

## Accounts & Tools Ready

### ✅ All Set Up with lcgx03@gmail.com

| Service | Status | Notes |
|---------|--------|-------|
| **GitHub** | ✅ Connected | Ready for repo creation |
| **AWS Account** | ✅ Active | CloudWatch billing alarms configured |
| **Cursor IDE** | ✅ Installed | Desktop, ready to code |
| **Claude Pro** | ✅ Active | For development assistance |
| **Claude Chrome Extension** | ✅ Installed | Laptop |
| **Email** | ✅ Primary | lcgx03@gmail.com |
| **Domain** | 📋 Planned | Will register mytravelagent.com |

### AWS Billing Alarms
- Configured for <$200/month
- Alerts to lcgx03@gmail.com
- Ready to monitor costs

---

## Beta Goals (12 Weeks)

### Target Metrics
- **Users**: 100 beta testers
- **Budget**: <$200/month AWS costs
- **Timeline**: 12 weeks from kickoff
- **Quality**: Production-ready (not prototype)

### Features to Ship

#### ✅ MUST HAVE (Critical for Beta)

**Social Features**:
- Social feed with posts and engagement
- Like, comment, save functionality
- User profiles with trip showcase
- Follow/unfollow users
- Photo uploads (multiple per post)

**AI Trip Planning**:
- Conversational interface with Claude
- Natural language trip requests
- AI-generated itineraries
- Save and edit AI suggestions
- Conversation history

**Credit System**:
- Earn credits when others use your trips
- Democratic model (everyone can earn)
- Transaction history
- Balance tracking
- Base $5 + engagement bonuses

**Group Travel**:
- Shared trip editing
- Group chat (polling-based for beta)
- Voting on activities
- Invite friends to trips
- Per-person cost tracking

**Core Infrastructure**:
- User authentication (signup/login)
- User profiles with bio, photo
- Photo uploads to S3
- Trip CRUD operations
- Basic search/discovery

**Live Trip Mode (MVP)**:
- "I'm here now" check-ins
- Location-based recommendations
- Activity completion tracking
- Real-time AI suggestions

#### 📋 NICE TO HAVE (Post-Beta v2)

- Real-time WebSocket chat (use polling for beta)
- Real money payouts (use "points" for beta)
- CloudFront CDN (S3 direct for beta)
- Advanced recommendation algorithms
- Mobile app (iOS/Android native)
- Social features (stories, DMs)
- Advanced analytics
- Multi-language support

---

## Business Model

### Revenue Strategy

#### Phase 1: Beta (Months 1-3)
- **FREE for beta users**
- Focus on engagement and feedback
- No revenue, minimize costs (<$200/month)

#### Phase 2: Revenue Launch (Months 4-10)
- **Booking Commissions**: 8% on hotels, flights, activities
- **Subscriptions**:
  - Free tier: Limited features
  - Pro ($9.99/mo): Unlimited AI conversations, priority support
  - Business ($29.99/mo): Group travel tools, analytics
- **Premium Features**:
  - Advanced trip templates ($4.99 each)
  - Live concierge support ($19.99/trip)

#### Phase 3: Profitability (Month 10+)
- Target: **Profitable by Month 10**
- Revenue from commissions + subscriptions
- Credit payouts: 10-21% of commission (sustainable)
- Scale with organic growth

### Credit Economics

**User Earns**:
- Base $5 when someone uses their trip
- +$1 per 100 likes on associated post
- +$2 per 50 comments
- +$3 if trip is completed by user

**Platform Costs**:
- 8% booking commission = $80 on $1000 booking
- User credit payout = $5-15 (6-19% of commission)
- Sustainable margin: 80-94% of commission retained

**Why It Works**:
- Users feel rewarded (creates flywheels)
- Platform keeps majority of commission
- Scales with booking volume
- Democratic (not just for influencers)

### Fundraising Strategy

**Bootstrap First**:
- Self-funded through beta
- Prove product-market fit
- Build traction (100 → 1000 → 10K users)

**Optional Seed Round** (if desired):
- Raise after proving traction
- Use for: Marketing, team expansion, enterprise features
- Valuation leverage from proven metrics

---

## AI Development Workflow

### Code Generation Breakdown

| Component | AI Generation | Human Work | Tool |
|-----------|---------------|------------|------|
| **Lambda Functions** | 90% | 10% (prompts, logic) | Cursor |
| **React Components** | 85% | 15% (UX decisions) | Cursor |
| **CDK Infrastructure** | 80% | 20% (architecture) | Cursor |
| **TypeScript Types** | 95% | 5% (validation) | Cursor |
| **Unit Tests** | 90% | 10% (edge cases) | Cursor |
| **API Routes** | 95% | 5% (security) | Cursor |
| **DynamoDB Queries** | 85% | 15% (optimization) | Cursor |
| **CI/CD Pipelines** | 90% | 10% (AWS secrets) | Cursor |

**Total AI Generation**: **87% of code written by AI**  
**Total Human Work**: **13% (architecture, prompts, validation)**

### Cursor Prompt Templates (Copy-Paste Ready)

#### Lambda Function Generation
```
Create a Lambda function for [FEATURE] with the following:

Requirements:
- Handler: async function that [DESCRIPTION]
- Input: [INPUT_SCHEMA]
- Output: [OUTPUT_SCHEMA]
- Database: DynamoDB table 'my-travel-agent-main'
- Auth: Verify JWT token from Cognito
- Error handling: Return proper HTTP status codes
- Logging: CloudWatch with request ID

Tech Stack:
- TypeScript
- AWS SDK v3
- DynamoDB DocumentClient

Generate:
1. Lambda handler function
2. TypeScript interfaces for input/output
3. Unit tests with Jest
4. CDK construct to deploy
```

#### React Component Generation
```
Create a React component for [FEATURE] with the following:

Requirements:
- Component: [COMPONENT_NAME]
- Props: [PROP_TYPES]
- State: [STATE_DESCRIPTION]
- UI: Material-UI v6 components
- API calls: Use axios to [ENDPOINTS]
- Responsive: Mobile-first design
- Loading states: Show skeleton while fetching
- Error handling: Display error messages

Features:
[LIST_FEATURES]

Tech Stack:
- React 18 with TypeScript
- Material-UI v6
- React Query for data fetching
- React Router for navigation

Generate:
1. Component with TypeScript
2. Custom hooks if needed
3. Unit tests with React Testing Library
4. Storybook story
```

#### DynamoDB Query Generation
```
Create a DynamoDB query helper for [FEATURE]:

Requirements:
- Table: 'my-travel-agent-main'
- Operation: [QUERY/SCAN/GET/PUT/UPDATE/DELETE]
- Access Pattern: [DESCRIPTION]
- Keys: PK=[VALUE], SK=[VALUE]
- GSI: [IF_NEEDED]
- Filter: [CONDITIONS]

Generate:
1. TypeScript function with proper types
2. Error handling
3. Pagination if needed
4. Unit tests with mocked DynamoDB
```

#### CDK Infrastructure Generation
```
Create AWS CDK construct for [RESOURCE]:

Requirements:
- Resource: [LAMBDA/DYNAMODB/S3/APIGATEWAY]
- Configuration: [SPECS]
- IAM Policies: Least privilege
- Environment: Dev, Staging, Prod
- Monitoring: CloudWatch alarms
- Tags: Project=my-travel-agent

Generate:
1. CDK construct in TypeScript
2. Environment-specific configs
3. IAM roles and policies
4. CloudWatch alarms
```

### AI Development Process (Per Feature)

**1. Design Phase (Human - 30 min)**
- Define data model
- Sketch API contract
- Write user stories

**2. Generation Phase (AI - 10 min)**
- Cursor generates code from prompts
- AI writes tests
- AI creates infrastructure

**3. Validation Phase (Human - 20 min)**
- Review generated code
- Test functionality
- Refine prompts if needed

**4. Deployment Phase (Automated - 5 min)**
- Push to GitHub
- CI/CD runs tests
- Auto-deploy to dev/staging

**Total**: 65 min per feature (vs 4-6 hours manual)

### Daily Development Workflow

```
Morning (2 hours):
1. Plan 3-5 features to build today
2. Write Cursor prompts for each
3. Generate code with Cursor
4. Review and validate

Afternoon (2 hours):
5. Test in dev environment
6. Refine and iterate
7. Push to GitHub (auto-deploys)
8. Monitor CloudWatch logs

Evening (1 hour):
9. Test in staging
10. Fix any issues
11. Plan tomorrow's features
```

**Velocity**: 15-20 features per week (solo founder with AI)

### AI Limitations (Where Human Excels)

❌ **AI Struggles**:
- Complex business logic with many edge cases
- Security architecture decisions
- Cost optimization strategies
- UX design decisions
- Prompt engineering for Bedrock

✅ **Human Excels**:
- Product decisions (what to build)
- Architecture choices (how to structure)
- Prompt writing (how to guide AI)
- Testing and validation (does it work?)
- User feedback integration (what to improve?)

### Cursor Best Practices

1. **Be Specific**: "Create a Lambda function for user signup with Cognito integration, email verification, and DynamoDB profile creation"
   
2. **Provide Context**: Include tech stack, patterns, and existing code structure

3. **Iterate**: If first attempt isn't perfect, refine prompt: "Update to add rate limiting"

4. **Use Chat Mode**: Ask Cursor to explain generated code

5. **Composer Mode**: For multi-file changes (e.g., adding a new feature across Lambda + React + CDK)

6. **Reference Docs**: "@docs DynamoDB single-table design"

---

## Requirements Breakdown

### 1. Architecture Validation Needed

**Request**: Review and validate technical choices

- ✅ **Confirm tech stack** (React, AWS Lambda, DynamoDB, Bedrock)
- ✅ **Identify red flags** in architecture
- ✅ **Validate scalability** to 1M users
- ✅ **Confirm costs** <$200/month for beta
- ✅ **Suggest alternatives** if better options exist
- ✅ **Security review** (Cognito, IAM, data privacy)

### 2. Complete Database Design

**Request**: DynamoDB schemas with TypeScript + CDK

**Tables Needed**:

1. **Users**
   - Profile info (name, bio, photo)
   - Credit balance
   - Preferences (interests, budget, travel style)
   - Follower/following counts
   - Stats (trips, posts, earnings)

2. **Trips**
   - Trip details (destination, dates, itinerary)
   - Creator + collaborators (for group travel)
   - Public/private visibility
   - Conversation ID (link to AI chat)
   - Usage count (how many times used)
   - Credits earned
   - Status (planning, active, completed)

3. **Posts** (Social Feed)
   - Post content (caption, photos)
   - Associated trip
   - Engagement metrics (likes, comments, saves)
   - Timestamp for feed ordering
   - Location tags

4. **Credits** (Transaction Log)
   - User ID
   - Amount (positive = earned, negative = spent)
   - Type (earned from trip usage, engagement bonus, etc.)
   - Related trip/post ID
   - Timestamp
   - Description

5. **Engagement** (Likes, Comments, Saves)
   - Post ID
   - User ID
   - Type (like, comment, save)
   - Comment text (if applicable)
   - Timestamp

6. **Invites** (Group Collaboration)
   - Trip ID
   - Inviter user ID
   - Invitee email/user ID
   - Status (pending, accepted, declined)
   - Timestamp

7. **LiveTrips** (Active Trip Tracking)
   - Trip ID
   - User location (lat/lon)
   - Current activity
   - Check-in timestamps
   - TTL (auto-expire after trip ends)

**Deliverables**:
- Primary keys, sort keys, GSIs for each table
- TypeScript interfaces for all entities
- AWS CDK code to create tables
- Access patterns documented
- Query examples for common operations

### 3. API Endpoint Design

**Request**: Complete REST API specification

**Group by Domain**:

#### User APIs
- POST /auth/signup
- POST /auth/login
- GET /auth/me
- GET /users/{userId}
- PUT /users/me
- POST /users/{userId}/follow
- DELETE /users/{userId}/follow
- GET /users/search

#### Trip APIs
- POST /trips
- GET /trips/{tripId}
- PUT /trips/{tripId}
- DELETE /trips/{tripId}
- GET /users/{userId}/trips
- POST /trips/{tripId}/publish
- POST /trips/{tripId}/use (clone & award credits)
- GET /trips/discover

#### Social APIs
- POST /posts
- GET /feed
- GET /posts/{postId}
- POST /posts/{postId}/like
- DELETE /posts/{postId}/like
- POST /posts/{postId}/comments
- GET /posts/{postId}/comments

#### AI APIs
- POST /trips/{tripId}/chat
- GET /trips/{tripId}/conversation
- POST /ai/suggest (general recommendations)

#### Credit APIs
- GET /users/me/credits
- GET /users/me/earnings
- GET /credits/transactions

#### Booking APIs (Future)
- POST /bookings/hotels/search
- POST /bookings/hotels/book
- POST /bookings/flights/search
- POST /bookings/flights/book

#### Group Travel APIs
- POST /trips/{tripId}/invite
- GET /trips/{tripId}/participants
- POST /trips/{tripId}/messages
- GET /trips/{tripId}/messages
- POST /trips/{tripId}/votes
- POST /trips/{tripId}/votes/{voteId}/cast

**For Each Endpoint**:
- HTTP method
- Path with parameters
- Purpose
- Request body schema
- Response schema
- Authentication required?
- Complexity (simple/medium/complex)

### 4. Lambda Functions List

**Request**: Every Lambda function needed with details

**Categories**:
- Authentication (4 functions)
- Social Feed (5 functions)
- Trip Planning (6 functions)
- Credits & Usage (3 functions)
- Group Travel (2 functions)
- Utility (2 functions)

**For Each Function**:
- Name and purpose
- Triggered by (API Gateway, DynamoDB Stream, EventBridge)
- Input/output
- Complexity level
- Can Cursor generate 100%?
- Estimated lines of code
- External dependencies

### 5. 12-Week Build Plan (AI-Accelerated)

**Request**: Week-by-week breakdown with AI leverage

**Week 1-2**: Foundation + CI/CD ⚡ **90% AI-Generated**
- AWS setup (Cursor generates CDK code)
- GitHub Actions CI/CD (Cursor generates workflow)
- Cognito, DynamoDB, S3 (Cursor generates infrastructure)
- React app skeleton (Cursor scaffolds project)
- Auth flows (Cursor generates signup/login)
- **Cursor Prompts**: 8-10 major prompts
- **Human Time**: 10 hours (prompts + validation)

**Week 3-4**: Trip Planning + AI ⚡ **85% AI-Generated**
- Trip CRUD (Cursor generates Lambda functions)
- Bedrock integration (Cursor generates API wrapper)
- Chat UI (Cursor generates React component)
- Itinerary display (Cursor generates components)
- **Cursor Prompts**: 12-15 prompts
- **Human Time**: 12 hours (Bedrock prompts + testing)

**Week 5-6**: Social Feed ⚡ **90% AI-Generated**
- Post creation (Cursor generates upload flow)
- Feed queries (Cursor generates pagination)
- Like/comment (Cursor generates engagement)
- User profiles (Cursor generates profile pages)
- **Cursor Prompts**: 10-12 prompts
- **Human Time**: 8 hours (UX validation)

**Week 7-8**: Credits System ⚡ **80% AI-Generated**
- Trip usage/cloning (Cursor generates logic)
- Credit calculations (Cursor generates formula - human validates)
- Transaction logging (Cursor generates queries)
- Earnings dashboard (Cursor generates UI)
- **Cursor Prompts**: 8-10 prompts
- **Human Time**: 12 hours (business logic validation)

**Week 9-10**: Group Travel ⚡ **85% AI-Generated**
- Participant management (Cursor generates invites)
- Shared editing (Cursor generates conflict resolution)
- Group chat (Cursor generates polling)
- Voting system (Cursor generates UI + logic)
- **Cursor Prompts**: 10-12 prompts
- **Human Time**: 10 hours (coordination logic)

**Week 11**: Live Trip Mode ⚡ **85% AI-Generated**
- Location tracking (Cursor generates geolocation)
- AI recommendations (Cursor generates Bedrock integration)
- Check-ins (Cursor generates components)
- **Cursor Prompts**: 6-8 prompts
- **Human Time**: 8 hours (AI prompt engineering)

**Week 12**: Polish & Launch ⚡ **70% AI-Generated**
- UI refinements (Cursor generates improvements)
- Error handling (Cursor adds try-catch)
- Testing (Cursor generates test cases)
- Beta deploy (Automated via CI/CD)
- **Cursor Prompts**: 8-10 prompts
- **Human Time**: 15 hours (manual testing, polish)

**Total Human Time**: ~75 hours over 12 weeks = 6.25 hours/week  
**Total AI-Generated Code**: ~15,000 lines (85% of codebase)  
**Total Manual Code**: ~2,500 lines (15% - critical logic)

**Velocity**: 
- **Without AI**: 6-9 months (480 hours)
- **With AI**: 3 months (75 hours)
- **Acceleration**: 6.4x faster

**For Each Week**:
- Monday: Plan features, write Cursor prompts
- Tue-Thu: Generate code, validate, iterate
- Friday: Test, deploy, review
- Milestone checkpoints every 2 weeks

### 6. Cursor Workflow Guidance

**Request**: Exact prompts and templates

**For Each Major Component**:
- Lambda function template prompt
- React component template prompt
- DynamoDB query helper prompt
- API endpoint generator prompt
- TypeScript interface generator prompt

**Workflow Strategy**:
- When to use Cursor vs manual coding
- How to structure Cursor sessions
- Prompting best practices
- Iterating when code isn't perfect
- Testing AI-generated code

**Reusable Templates**:
- "Create a Lambda function that..."
- "Build a React component for..."
- "Write a DynamoDB query to..."
- "Generate TypeScript types for..."

### 7. Immediate Next Steps (AI-FIRST, TODAY)

**Request**: Actionable steps to start RIGHT NOW with Cursor

**Step 1**: Create GitHub Repository (5 minutes)
```bash
# Commands for lcgx03@gmail.com account
gh auth login
gh repo create my-travel-agent --private --description "AI-powered social travel platform"
cd my-travel-agent
git init
```

**Cursor Prompt for Initial Setup**:
```
I'm starting a new TypeScript monorepo for a travel platform with:
- Frontend: React + TypeScript + Material-UI (in /frontend)
- Backend: AWS Lambda + TypeScript (in /backend)
- Infrastructure: AWS CDK + TypeScript (in /infrastructure)

Create the following:
1. Root package.json with workspaces
2. .gitignore for Node.js, AWS, and IDE files
3. tsconfig.json for each package
4. README.md with project overview
5. Initial directory structure
6. prettier and eslint configs

Use npm workspaces and modern TypeScript 5+.
```

**Step 2**: Initialize CI/CD with Cursor (10 minutes)

**Cursor Prompt**:
```
Create a GitHub Actions CI/CD pipeline for my AWS serverless app:

Requirements:
- Trigger: Push to main, develop branches
- Jobs: test, deploy
- Test: Run Jest tests for backend + frontend
- Deploy: Use AWS CDK to deploy all stacks
- Environments: dev (on develop), prod (on main)
- Secrets: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
- Node version: 20

Generate:
1. .github/workflows/deploy.yml
2. .github/workflows/test.yml (PR validation)
3. Environment-specific CDK context files
```

**Step 3**: Generate AWS Infrastructure with Cursor (15 minutes)

**Cursor Prompt**:
```
Create AWS CDK infrastructure for my travel platform beta:

Stacks needed:
1. Auth Stack: Cognito User Pool + Identity Pool
2. Database Stack: DynamoDB table with single-table design
   - Table name: my-travel-agent-main
   - PK: string, SK: string
   - GSI1: GSI1PK, GSI1SK (for feed queries)
   - GSI2: GSI2PK, GSI2SK (for trip discovery)
   - GSI3: GSI3PK, GSI3SK (for user lookup)
   - On-demand billing
3. Storage Stack: S3 bucket for photos + CloudFront (optional)
4. API Stack: API Gateway (REST) + sample Lambda
5. Monitoring Stack: CloudWatch alarms for costs

Requirements:
- TypeScript CDK v2
- Environment-aware (dev, staging, prod)
- Cost alarms at $50, $100, $150, $200
- Least privilege IAM
- Tags: Project=my-travel-agent

Generate all CDK constructs and bin/app.ts
```

**Step 4**: Deploy "Hello World" to AWS (10 minutes)

```bash
# Install CDK CLI
npm install -g aws-cdk

# Bootstrap AWS environment
cd infrastructure
npm install
cdk bootstrap

# Deploy dev environment
cdk deploy --all --context environment=dev

# Test API endpoint (Cursor will generate this)
curl https://<api-id>.execute-api.us-east-1.amazonaws.com/dev/health
```

**Step 5**: Generate First Feature with Cursor (15 minutes)

**Cursor Prompt**:
```
Create a complete user signup feature:

Backend (Lambda):
- POST /auth/signup endpoint
- Input: { email, password, username, displayName }
- Validate email format, password strength
- Create Cognito user
- Create DynamoDB profile record
- Return: { userId, tokens }
- TypeScript with proper types
- Unit tests with Jest

Frontend (React):
- SignupForm component with Material-UI
- Fields: email, password, confirm password, username, display name
- Validation with error messages
- Loading state during submission
- Success/error handling
- TypeScript with proper types
- React Testing Library tests

CDK:
- Lambda function definition
- API Gateway route: POST /auth/signup
- IAM permissions for Cognito and DynamoDB

Generate all files with proper imports and exports.
```

**End of Day 1 Goal**: 
✅ GitHub repo created  
✅ CI/CD pipeline deploying automatically  
✅ AWS infrastructure deployed (Cognito, DynamoDB, API Gateway)  
✅ First feature (user signup) working end-to-end  
✅ ~90% of code generated by Cursor  
✅ ~2 hours of human time

---

**Day 2 Plan** (repeat this pattern):
1. Choose 3 features to build
2. Write Cursor prompts for each
3. Generate code (Cursor does the work)
4. Test and validate
5. Push to GitHub (auto-deploys)

**Weekly Pattern**:
- **Monday**: Plan week's features, write prompts
- **Tue-Thu**: Generate + validate code with Cursor
- **Friday**: Test, polish, prepare for next week

### 8. AI Build Strategy

**Request**: Realistic AI acceleration plan

**Code Generation Breakdown**:
- What % can Cursor generate vs manual?
- Where will AI struggle?
- What requires deep custom logic?

**Best Practices**:
- How to prompt Cursor effectively
- When to accept AI code vs rewrite
- Testing AI-generated code
- Version control with AI assistance

**Realistic Timeline**:
- Solo founder with AI tools
- Expected velocity per week
- Bottlenecks to anticipate

### 9. Credit System Specifics

**Request**: Implementation details

**Calculation Formula**:
- Base: $5 per trip usage
- Bonus: +$1 per 100 likes
- Bonus: +$2 per 50 comments  
- Bonus: +$3 if trip completed
- Max earnings per trip: $50

**Database Schema**:
- Credit balance field on User
- Transaction log fields
- Tracking fields on Trip (usageCount, creditsEarned)

**Lambda Function Logic**:
```
1. User clicks "Use This Trip"
2. Clone trip to their account
3. Calculate credits (base + bonuses)
4. Award to original creator
5. Log transaction
6. Update balances
```

**Anti-Abuse Measures**:
- Rate limiting (max 5 trips used per hour)
- Velocity detection (flag suspicious patterns)
- Manual review queue for high-value transactions
- Prevent self-usage (can't use own trips)

**Cost Sustainability**:
- Credit payouts = 10-21% of booking commission
- Average booking = $1000
- Commission = $80 (8%)
- Credit payout = $5-15
- Platform keeps $65-75 (sustainable)

### 10. Group Travel Implementation

**Request**: Beta inclusion assessment

**My Assessment**: ✅ **YES, include in beta**

**Rationale**:
- Only +8 days to development
- Key differentiator vs Boop
- Solves real pain point
- Low complexity to start

**Simplified Features for Beta**:
- ✅ Shared trip editing
- ✅ Group chat (polling, not WebSocket)
- ✅ Per-person cost tracking
- ✅ Voting on activities
- ❌ Multi-origin flights (v2)
- ❌ Auto expense splitting (v2)

**Database Changes**:
- Add `participants: string[]` to Trip schema
- Add `GroupMessage` entity
- Add `Vote` entity

**Additional Lambda Functions**:
- trips-invite (add participants)
- trips-group-chat (post messages)
- trips-vote-create
- trips-vote-cast

**Cursor Prompts**:
- "Create a Lambda function to add participants to a trip..."
- "Build a React component for group chat with polling..."
- "Generate voting UI with Material-UI cards..."

### 11. Company Formation

**Request**: Legal entity advice

**Questions**:
- Form LLC/Corp now or wait?
- Which entity type (LLC vs C-Corp)?
- When to worry about legal structure?
- IP protection basics (trademark, etc.)?
- Tax considerations?

**Context**:
- Solo founder
- Self-funded (no investors yet)
- Operating from US
- Potential to raise funding later

---

## Constraints

### Hard Constraints
- ✅ **Solo founder** (just me + AI)
- ✅ **Budget**: <$200/month for beta
- ✅ **Timeline**: 12 weeks to 100 users
- ✅ **Quality**: Production-ready, not prototype
- ✅ **Self-funded**: Bootstrap initially

### Soft Constraints
- ⚡ **Speed to market**: Beat Boop (6-month window)
- 💡 **Innovation**: Must differentiate vs competitors
- 🎯 **Focus**: Beta must prove core value props
- 📈 **Scalability**: Architecture must support 1M users

### Risk Factors
- **Solo founder velocity**: Need AI to accelerate
- **AWS costs**: Must stay under budget
- **Competitor timing**: Boop has funding, hiring
- **Product complexity**: Five features is ambitious
- **Market validation**: Need beta to prove demand

---

## Success Criteria

### Beta Success (Week 12)
- ✅ **100 users** signed up and active
- ✅ **70%+ engagement**: Users creating trips
- ✅ **50%+ social**: Users creating posts
- ✅ **30%+ sharing**: Users using others' trips
- ✅ **<$200/month**: AWS costs under budget
- ✅ **0 critical bugs**: Production-ready quality

### Product-Market Fit Signals
- Users returning 3+ times/week
- Organic word-of-mouth growth
- Positive NPS (Net Promoter Score)
- Users completing trips with AI plans
- Credit system driving engagement

### Financial Success (Month 10)
- Profitable (revenue > costs)
- $10K+ MRR (Monthly Recurring Revenue)
- Sustainable credit economics
- Path to $100K ARR visible

---

## Output Format Requested

Please structure response as:

1. **Architecture Review**
   - Validate tech stack
   - Flag red flags
   - Suggest improvements

2. **Database Schemas**
   - Complete DynamoDB design
   - TypeScript interfaces
   - AWS CDK code

3. **API Endpoints**
   - Complete list by domain
   - Request/response schemas

4. **Lambda Functions**
   - Complete list with details
   - Cursor generation assessment

5. **12-Week Build Plan**
   - Week-by-week tasks
   - Milestones and checkpoints

6. **Credit System Implementation**
   - Calculation logic
   - Anti-abuse measures
   - Database schema

7. **Group Travel Assessment**
   - Include in beta? (Yes/No)
   - Implementation details

8. **Company Formation Advice**
   - Entity type recommendation
   - Timing guidance

9. **Immediate Action Plan**
   - What to do TODAY
   - Step-by-step commands

10. **Cursor Workflow Templates**
    - Reusable prompts
    - Best practices

---

## Contact & Repository

**Founder**: Lourdes  
**Email**: lcgx03@gmail.com  
**GitHub**: lcgx03@gmail.com account  
**Repository**: To be created (my-travel-agent)  
**Domain**: mytravelagent.com (to be registered)  

---

**Status**: ✅ Ready to Build  
**All Accounts Configured**: ✅ Complete  
**Next Action**: Create GitHub repo and initialize project  

---

**Document Version**: 1.0  
**Last Updated**: January 10, 2026  
**Purpose**: Complete requirements for My-Travel-Agent startup build

