# My-Travel-Agent: Architecture Plan
**Social Travel Platform with AI Trip Planning**

Version: 1.0 (Beta)  
Timeline: 12 Weeks  
Budget: <$200/month  
Target: 100 Beta Users

---

## Table of Contents
1. [Architecture Validation](#architecture-validation)
2. [DynamoDB Table Schemas](#dynamodb-table-schemas)
3. [Lambda Functions](#lambda-functions)
4. [REST API Endpoints](#rest-api-endpoints)
5. [Build Phases (12 Weeks)](#build-phases-12-weeks)
6. [AI-Assisted vs Manual Work](#ai-assisted-vs-manual-work)
7. [Cost Estimate](#cost-estimate)
8. [Next Steps](#next-steps)

---

## AI-First Development Strategy

### Code Generation Philosophy

**Human Role (13% of effort)**:
- Define architecture and data models
- Write Cursor prompts for each component  
- Review and validate AI-generated code
- Make business logic decisions
- Test and iterate

**AI Role (87% of effort)**:
- Generate all Lambda functions (Cursor)
- Generate all React components (Cursor)
- Write TypeScript interfaces (Cursor)
- Create CDK infrastructure code (Cursor)
- Write unit tests (Cursor)
- Generate API client code (Cursor)

### Development Velocity

| Metric | Without AI | With AI (Cursor + Claude) |
|--------|-----------|---------------------------|
| **Total Time** | 480 hours | 75 hours |
| **Lines of Code** | ~17,500 manual | ~15,000 AI + 2,500 manual |
| **Features/Week** | 3-5 features | 15-20 features |
| **Time to Beta** | 6-9 months | 3 months |
| **Acceleration** | 1x | **6.4x** |

### Cursor Prompt Template (Reusable)

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

### Daily Workflow with AI

**Morning (2 hours)**:
1. Plan 3-5 features to build
2. Write Cursor prompts for each
3. Generate code with Cursor
4. Review and validate

**Afternoon (2 hours)**:
5. Test in dev environment (auto-deployed)
6. Refine and iterate
7. Push to GitHub (CI/CD deploys to staging)
8. Monitor CloudWatch logs

**Evening (1 hour)**:
9. Test in staging
10. Fix any issues discovered
11. Plan tomorrow's features

**Result**: 15-20 features per week (solo founder)

---

## Core Features

1. **Social Feed** - Instagram-style sharing of trips
2. **AI Trip Planning** - Conversational planning using Claude via AWS Bedrock
3. **Credit System** - Users earn $ when others use their trips
4. **Live Trip Assistance** - Real-time recommendations while traveling
5. **Group Travel** - Shared planning, group chat, voting on activities

---

## Tech Stack

### Frontend
- **Framework**: React + TypeScript
- **UI Library**: Material-UI
- **Type**: Progressive Web App (PWA)

### Backend
- **Compute**: AWS Lambda (serverless)
- **API**: API Gateway (REST)
- **Database**: DynamoDB (NoSQL)
- **AI**: AWS Bedrock (Claude Sonnet 4.5)
- **Storage**: S3 + CloudFront
- **Auth**: AWS Cognito
- **Infrastructure**: AWS CDK (TypeScript)

---

## 1. Architecture Validation

### ✅ What's Good

- **Serverless approach** - Perfect for beta with unpredictable usage
- **DynamoDB** - Right choice for social feed access patterns
- **Bedrock** - Integrated AI without managing models
- **Progressive Web App** - Avoid app store delays

### 🚨 Red Flags & Fixes

#### A. Real-time Features Will Spike Costs
**Problem**: Group chat + live trip mode need WebSocket API Gateway (~$1/million messages)

**Fix**: Use polling for beta, add WebSockets in v2

#### B. AI Conversation Costs
**Problem**: Claude Sonnet 4.5 = ~$3 per 1M input tokens, $15 per 1M output

**Cost**: 100 users planning 5 trips each = ~$50-150/month (manageable)

**Fix**: 
- Add conversation length limits
- Cache common responses
- Use Claude Haiku for simple queries

#### C. Photo Storage
**Problem**: Direct S3 uploads needed to avoid Lambda payload limits. CloudFront adds ~$10-20/month (overkill for beta)

**Fix**: Use S3 directly for beta, add CloudFront when you need CDN

#### D. DynamoDB Access Patterns
**Problem**: Social feed queries can be expensive if not designed right. Each GSI = separate cost

**Fix**: Use single-table design pattern to minimize GSIs

#### E. Credit/Payment System
**Problem**: Real money = compliance, fraud detection, payment processing (Stripe)

**Fix**: Start with "points" system for beta, add real payments later

---

## 2. DynamoDB Table Schemas

### Single-Table Design: `my-travel-agent-main`

Using partition key (PK) and sort key (SK) pattern for efficiency.

### User Entity
```typescript
{
  PK: "USER#<userId>",
  SK: "PROFILE",
  userId: string,
  email: string,
  username: string,
  displayName: string,
  bio: string,
  profilePhoto: string, // S3 key
  credits: number,
  createdAt: string,
  followerCount: number,
  followingCount: number,
  tripCount: number
}
```

### Trip Entity
```typescript
{
  PK: "USER#<userId>",
  SK: "TRIP#<tripId>",
  tripId: string,
  title: string,
  destination: string,
  startDate: string,
  endDate: string,
  status: "planning" | "active" | "completed",
  isPublic: boolean,
  coverPhoto: string,
  description: string,
  participants: string[], // userIds for group trips
  conversationId: string, // Link to AI conversation
  itinerary: {
    day: number,
    activities: Array<{
      time: string,
      title: string,
      location: string,
      notes: string
    }>
  }[],
  createdAt: string,
  updatedAt: string,
  usageCount: number, // How many times others used this trip
  totalCreditsEarned: number
}
```

### Post Entity (Social Feed)
```typescript
{
  PK: "POST#<postId>",
  SK: "METADATA",
  postId: string,
  userId: string,
  tripId: string,
  caption: string,
  photos: string[], // S3 keys
  location: string,
  createdAt: string,
  likeCount: number,
  commentCount: number,
  shareCount: number,
  
  // Denormalized for feed display
  authorUsername: string,
  authorPhoto: string,
  tripTitle: string
}

// GSI-1: Feed query by time
{
  GSI1PK: "FEED",
  GSI1SK: "<timestamp>#POST#<postId>",
  // ... rest of post data
}
```

### Engagement (Likes, Comments)
```typescript
// Like
{
  PK: "POST#<postId>",
  SK: "LIKE#USER#<userId>",
  userId: string,
  createdAt: string
}

// Comment
{
  PK: "POST#<postId>",
  SK: "COMMENT#<commentId>",
  commentId: string,
  userId: string,
  text: string,
  createdAt: string,
  
  // Denormalized
  authorUsername: string,
  authorPhoto: string
}
```

### Follow Relationship
```typescript
// Following
{
  PK: "USER#<userId>",
  SK: "FOLLOWING#USER#<targetUserId>",
  targetUserId: string,
  targetUsername: string,
  createdAt: string
}

// Follower
{
  PK: "USER#<userId>",
  SK: "FOLLOWER#USER#<followerId>",
  followerId: string,
  followerUsername: string,
  createdAt: string
}
```

### AI Conversation
```typescript
{
  PK: "CONVERSATION#<conversationId>",
  SK: "MESSAGE#<timestamp>",
  conversationId: string,
  tripId: string,
  role: "user" | "assistant",
  content: string,
  timestamp: string
}
```

### Credit Transaction
```typescript
{
  PK: "USER#<userId>",
  SK: "CREDIT#<transactionId>",
  transactionId: string,
  amount: number, // Positive for earned, negative for spent
  type: "earned" | "spent" | "awarded",
  relatedTripId?: string,
  relatedUserId?: string, // Who used your trip
  description: string,
  createdAt: string
}
```

### Group Trip Messages
```typescript
{
  PK: "TRIP#<tripId>",
  SK: "MESSAGE#<timestamp>",
  messageId: string,
  userId: string,
  text: string,
  timestamp: string,
  
  // Denormalized
  authorUsername: string,
  authorPhoto: string
}
```

### Group Trip Voting
```typescript
{
  PK: "TRIP#<tripId>",
  SK: "VOTE#<voteId>",
  voteId: string,
  createdBy: string,
  question: string,
  options: Array<{
    id: string,
    text: string,
    votes: string[] // userIds
  }>,
  status: "active" | "closed",
  createdAt: string,
  expiresAt: string
}
```

### Live Trip Location (Optional)
```typescript
{
  PK: "TRIP#<tripId>",
  SK: "LOCATION#<userId>",
  userId: string,
  latitude: number,
  longitude: number,
  timestamp: string,
  ttl: number // Auto-expire after 24h
}
```

### Global Secondary Indexes

#### GSI-1: Social Feed
- **PK**: `GSI1PK` (value: "FEED")
- **SK**: `GSI1SK` (timestamp#POST#postId)
- **Use**: Get recent posts for feed

#### GSI-2: Trip Discovery
- **PK**: `GSI2PK` (value: "TRIP#PUBLIC")
- **SK**: `GSI2SK` (destination#timestamp)
- **Use**: Browse public trips by destination

#### GSI-3: User Lookup
- **PK**: `GSI3PK` (email or username)
- **SK**: `GSI3SK` (constant)
- **Use**: Login, user search

---

## 3. Lambda Functions

### Total: 22 Core Functions

### Authentication & Users (4)

**1. auth-signup** (POST /auth/signup)
- Create Cognito user + DynamoDB profile

**2. auth-login** (POST /auth/login)
- Cognito authentication

**3. users-get-profile** (GET /users/{userId})
- Fetch user profile with stats

**4. users-update-profile** (PUT /users/me)
- Update profile, upload photo to S3

### Social Feed (5)

**5. posts-create** (POST /posts)
- Upload photos to S3, create post

**6. posts-get-feed** (GET /feed)
- Query GSI-1 for recent posts
- Paginated results

**7. posts-like** (POST /posts/{postId}/like)
- Add like, increment counter

**8. posts-comment** (POST /posts/{postId}/comments)
- Add comment with denormalized user data

**9. posts-get-details** (GET /posts/{postId})
- Post + comments + likes

### Trip Planning (6)

**10. trips-create** (POST /trips)
- Initialize trip, create conversation

**11. trips-get** (GET /trips/{tripId})
- Fetch trip with itinerary

**12. trips-update** (PUT /trips/{tripId})
- Update itinerary, photos, details

**13. trips-list-user** (GET /users/{userId}/trips)
- Get all trips for a user

**14. ai-chat** (POST /trips/{tripId}/chat)
- Send message to Claude via Bedrock
- Append to conversation history
- Update trip itinerary if AI generates one

**15. trips-discover** (GET /trips/discover)
- Query GSI-2 for public trips
- Filter by destination, dates

### Credits & Usage (3)

**16. trips-use** (POST /trips/{tripId}/use)
- Clone trip for user
- Award credits to original creator
- Record transaction

**17. credits-get-balance** (GET /users/me/credits)
- Get current balance + transaction history

**18. credits-get-earnings** (GET /users/me/earnings)
- Breakdown of earnings by trip

### Group Travel (2)

**19. trips-invite** (POST /trips/{tripId}/invite)
- Add participant to trip

**20. trips-group-chat** (POST /trips/{tripId}/messages)
- Add message to group chat
- (For beta: simple polling, not WebSocket)

### Utility Functions (2)

**21. upload-presigned-url** (GET /upload/presigned)
- Generate S3 pre-signed URL for direct upload

**22. notifications-send** (Internal, triggered by DynamoDB Streams)
- Send email/push notifications for likes, comments, credits

---

## 4. REST API Endpoints

**Base URL**: `https://api.mytravelagent.com`

### Authentication
```
POST   /auth/signup
POST   /auth/login
POST   /auth/refresh
GET    /auth/me
```

### Users
```
GET    /users/{userId}
PUT    /users/me
GET    /users/me/credits
GET    /users/me/earnings
GET    /users/search?q={query}
POST   /users/{userId}/follow
DELETE /users/{userId}/follow
```

### Trips
```
POST   /trips
GET    /trips/{tripId}
PUT    /trips/{tripId}
DELETE /trips/{tripId}
GET    /trips/discover?destination={dest}&startDate={date}
GET    /users/{userId}/trips
POST   /trips/{tripId}/use        # Clone & award credits
POST   /trips/{tripId}/publish    # Make public
```

### AI Chat
```
POST   /trips/{tripId}/chat
GET    /trips/{tripId}/conversation
```

### Group Travel
```
POST   /trips/{tripId}/invite
GET    /trips/{tripId}/participants
POST   /trips/{tripId}/messages
GET    /trips/{tripId}/messages?since={timestamp}
POST   /trips/{tripId}/votes
POST   /trips/{tripId}/votes/{voteId}/cast
```

### Social Feed
```
GET    /feed?limit={n}&cursor={token}
GET    /feed/following?limit={n}
POST   /posts
GET    /posts/{postId}
DELETE /posts/{postId}
POST   /posts/{postId}/like
DELETE /posts/{postId}/like
POST   /posts/{postId}/comments
GET    /posts/{postId}/comments
```

### Uploads
```
GET    /upload/presigned?fileType={type}
```

### Live Mode (MVP)
```
POST   /trips/{tripId}/location
GET    /trips/{tripId}/recommendations?lat={lat}&lon={lon}
```

---

## 5. Build Phases (12 Weeks)

### WEEK 1-2: Foundation + CI/CD ⚡ **90% AI-Generated**
**Tasks:**
- [ ] AWS account setup, CDK project structure (Cursor generates)
- [ ] **GitHub Actions CI/CD pipeline** (Cursor generates workflow)
- [ ] **Automated testing setup** (Jest, React Testing Library)
- [ ] **Multi-environment setup** (dev, staging, prod)
- [ ] Cognito user pool + identity pool (Cursor generates CDK)
- [ ] DynamoDB table with GSIs (Cursor generates CDK)
- [ ] S3 buckets (photos, static assets) (Cursor generates CDK)
- [ ] API Gateway + Lambda skeleton (Cursor generates CDK)
- [ ] React app scaffolding (Material-UI) (Cursor scaffolds)
- [ ] Auth flows (signup, login, JWT handling) (Cursor generates)
- [ ] **Cost monitoring alarms** (CloudWatch)

**Deliverable:** Users can sign up and log in + CI/CD deploys automatically

**Cursor Prompts**: 8-10 major prompts  
**Human Time**: ~10 hours (prompts, validation, AWS configuration)

---

### WEEK 3-4: Trip Planning + AI ⚡ **85% AI-Generated**
**Tasks:**
- [ ] Trip CRUD operations (Cursor generates Lambda functions)
- [ ] Bedrock integration (Cursor generates Claude API wrapper)
- [ ] AI conversation UI (Cursor generates chat interface)
- [ ] Trip itinerary display (Cursor generates React components)
- [ ] Photo uploads (S3 pre-signed URLs) (Cursor generates)

**Deliverable:** Users can create trips and chat with AI to plan

**Cursor Prompts**: 12-15 prompts  
**Human Time**: ~12 hours (Bedrock prompt engineering, testing)

---

### WEEK 5-6: Social Feed ⚡ **90% AI-Generated**
**Tasks:**
- [ ] Post creation with photos (Cursor generates upload flow)
- [ ] Feed query (GSI-1) (Cursor generates pagination)
- [ ] Like/comment functionality (Cursor generates engagement)
- [ ] User profiles with trip showcase (Cursor generates components)
- [ ] Follow/unfollow (Cursor generates social graph)

**Deliverable:** Instagram-style social feed works

**Cursor Prompts**: 10-12 prompts  
**Human Time**: ~8 hours (UX validation, design tweaks)

---

### WEEK 7-8: Credits System ⚡ **80% AI-Generated**
**Tasks:**
- [ ] "Use Trip" feature (clone + award credits) (Cursor generates logic)
- [ ] Credit transaction logging (Cursor generates DynamoDB queries)
- [ ] Earnings dashboard (Cursor generates UI + charts)
- [ ] Trip discovery page (browse public trips) (Cursor generates)
- [ ] Trip usage analytics (Cursor generates queries)

**Deliverable:** Users earn credits when others use their trips

**Cursor Prompts**: 8-10 prompts  
**Human Time**: ~12 hours (business logic validation, anti-abuse)

---

### WEEK 9-10: Group Travel ⚡ **85% AI-Generated**
**Tasks:**
- [ ] Add participants to trips (Cursor generates invites)
- [ ] Shared trip editing (Cursor generates conflict resolution)
- [ ] Group chat (polling-based) (Cursor generates chat component)
- [ ] Voting on activities (Cursor generates voting UI + logic)
- [ ] Group permissions (Cursor generates auth checks)

**Deliverable:** Friends can plan trips together

**Cursor Prompts**: 10-12 prompts  
**Human Time**: ~10 hours (coordination logic, permissions)

---

### WEEK 11: Live Trip Mode (MVP) ⚡ **85% AI-Generated**
**Tasks:**
- [ ] Location tracking (optional) (Cursor generates geolocation)
- [ ] "I'm here now" recommendations (Cursor generates Bedrock integration)
- [ ] Check-in posts (Cursor generates check-in component)
- [ ] Activity completion tracking (Cursor generates tracking)

**Deliverable:** Basic live assistance while traveling

**Cursor Prompts**: 6-8 prompts  
**Human Time**: ~8 hours (AI prompt engineering for recommendations)

---

### WEEK 12: Polish & Launch ⚡ **70% AI-Generated**
**Tasks:**
- [ ] UI/UX refinements (Cursor generates improvements)
- [ ] Error handling + loading states (Cursor adds error boundaries)
- [ ] Performance optimization (Cursor optimizes queries)
- [ ] Beta user onboarding flow (Cursor generates tutorial)
- [ ] Analytics (CloudWatch) (Cursor generates dashboards)
- [ ] Deploy to production (Automated via CI/CD)

**Deliverable:** Beta launch with 10-20 friends

**Cursor Prompts**: 8-10 prompts  
**Human Time**: ~15 hours (manual testing, polish, user feedback)

---

## AI Development Summary

**Total Development Time**: ~75 hours over 12 weeks (6.25 hours/week)  
**Total Code Generated**: ~15,000 lines (85% by AI)  
**Total Manual Code**: ~2,500 lines (15% critical logic)

**Acceleration Factor**: 6.4x faster than manual development

**Human Focus Areas**:
- Architecture decisions
- Prompt engineering
- Business logic validation
- UX/design decisions
- Testing and quality assurance

---

## 6. AI-Assisted vs Manual Work

### HIGH AI LEVERAGE (Cursor + Claude)

✅ **Lambda function boilerplate** (80% AI-generated)
- CRUD operations
- DynamoDB queries
- Input validation
- Error handling

✅ **React components** (70% AI-generated)
- Form components
- List/grid layouts
- Material-UI integration
- State management patterns

✅ **API client code** (90% AI-generated)
- Axios/fetch wrappers
- TypeScript interfaces
- Request/response types

✅ **CDK infrastructure** (60% AI-generated)
- Lambda definitions
- API Gateway routes
- DynamoDB table definitions
- IAM roles

✅ **Unit tests** (80% AI-generated)
- Mock data
- Test cases
- Jest/React Testing Library

### MODERATE AI LEVERAGE (AI Helps, You Guide)

🟡 **DynamoDB access patterns** (40% AI-generated)
- AI can write queries, YOU design the patterns
- You define PK/SK strategy, AI implements

🟡 **Bedrock conversation logic** (50% AI-generated)
- AI writes the API calls
- YOU craft the prompts and context
- YOU design the conversation flow

🟡 **UI/UX flows** (40% AI-generated)
- AI generates layouts
- YOU design the user journey

🟡 **Complex business logic** (30% AI-generated)
- Credit calculations
- Trip cloning with participant handling
- AI can scaffold, you refine

### LOW AI LEVERAGE (Mostly Manual)

❌ **System architecture decisions**
- Single-table vs multi-table
- When to use GSIs
- Cost optimization strategies

❌ **Access pattern design**
- How users will query data
- What needs to be denormalized

❌ **Prompt engineering for AI features**
- Claude's system prompts
- Context window management
- Conversation memory

❌ **Beta user feedback integration**
- What to prioritize
- What to cut

❌ **Security & permissions**
- IAM policies
- API authentication logic
- Data privacy decisions

---

## 7. Cost Estimate

### First 3 Months Budget

**Assumptions**: 100 users, 500 trips created, 2000 posts

| Service | Usage | Cost/Month |
|---------|-------|------------|
| **DynamoDB** | 1M reads, 500K writes | ~$5 |
| **Lambda** | 1M requests, 500ms avg | ~$2 |
| **API Gateway** | 1M requests | ~$3.50 |
| **S3** | 50GB storage, 100GB transfer | ~$5 |
| **Bedrock (Claude Sonnet 4.5)** | 500 conversations, 50K tokens each | ~$225 |
| | - Input: 25M tokens × $3/M | $75 |
| | - Output: 10M tokens × $15/M | $150 |
| **Cognito** | First 50K MAUs free | $0 |
| **TOTAL** | | **~$240/month** |

### 🚨 Above Budget - Need to Reduce

**Cost Optimization Strategies:**

1. **Limit AI conversations to 30K tokens**
2. **Cache common AI responses**
3. **Use Claude Haiku for simple queries** ($0.25 per M input tokens)
4. **Implement conversation length limits**
5. **Optimize DynamoDB queries** (reduce reads)

**Target**: $150-180/month

---

## 8. Next Steps

### Week 1 Action Items

1. **Set up AWS account + billing alerts** ($200/month threshold)
2. **Create GitHub repo** (private for beta)
3. **Install AWS CDK + React starter**
4. **Set up Cursor with Claude API access**
5. **Configure development environment**

### Quick Wins

- Use **AWS Amplify Gen 2** for auth (saves time)
- Use **Material-UI templates** for UI (faster development)
- Start with **Trip Planning + AI** (core value prop)
- Deploy early, iterate often

### Deferred to V2 (Post-Beta)

- Real-time WebSocket chat
- Real money payments (use points for beta)
- CloudFront CDN
- Advanced recommendation algorithms
- Mobile app (iOS/Android)
- Social features (stories, direct messages)
- Advanced analytics dashboard

---

## Key Success Metrics (Beta)

- **User Engagement**: 70%+ of users create at least 1 trip
- **Social Sharing**: 50%+ of users create at least 1 post
- **AI Usefulness**: 60%+ of AI conversations result in saved itinerary
- **Credit System**: 30%+ of trips are "used" by other users
- **Retention**: 40%+ weekly active users
- **Cost**: Stay under $200/month

---

## Risk Mitigation

### Technical Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| AI costs spiral | High | Implement token limits, caching |
| DynamoDB costs spike | Medium | Monitor read/write units, optimize queries |
| Photo storage costs | Low | Compress images, set size limits |
| Lambda cold starts | Low | Use provisioned concurrency for critical paths |

### Product Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Low user engagement | High | Focus on AI quality, iterate quickly |
| Credit system abuse | Medium | Rate limiting, manual review for beta |
| Poor AI recommendations | High | Extensive prompt engineering, user feedback |
| Group coordination complexity | Medium | Start simple, add features based on feedback |

---

## Support & Resources

### Documentation
- AWS CDK: https://docs.aws.amazon.com/cdk/
- DynamoDB Single-Table Design: https://www.alexdebrie.com/posts/dynamodb-single-table/
- AWS Bedrock: https://docs.aws.amazon.com/bedrock/
- React + TypeScript: https://react-typescript-cheatsheet.netlify.app/

### Community
- AWS Serverless Discord
- r/aws subreddit
- Bedrock community forum

---

**Document Version**: 1.0  
**Last Updated**: January 2026  
**Status**: Ready for Development

