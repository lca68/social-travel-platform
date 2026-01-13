# Add Apple Sign-In: Complete Action Plan
**Sign in with Apple Integration for My-Travel-Agent**

**Estimated Time**: 3-4 hours  
**Prerequisites**: Basic email/password authentication already working  
**Result**: Users can sign up/login with "Sign in with Apple"  
**Cost**: $99/year Apple Developer Program + $0.60/month AWS

---

## 📋 Overview

This guide adds Apple Sign-In as an authentication method. Apple Sign-In provides enhanced privacy and is **required** if you build an iOS app with social login.

---

## ⚠️ IMPORTANT: Prerequisites

### Required Before Starting

1. **Apple Developer Account** ($99/year)
   - Enroll at: https://developer.apple.com/programs/enroll/
   - Wait 24-48 hours for approval
   - **Cannot proceed without this**

2. **Domain Name**
   - Must own domain (e.g., mytravelagent.com)
   - Apple requires verified domain ownership

3. **HTTPS Required**
   - Apple Sign-In only works over HTTPS
   - Local testing requires ngrok or similar

---

## 🍎 Step 1: Apple Developer Setup (45 min)

### 1.1: Create App ID

1. Go to: https://developer.apple.com/account/resources/identifiers/list
2. Click "+" → Select "App IDs" → Continue
3. Configure:
   - Description: `My-Travel-Agent App`
   - Bundle ID: `com.mytravelagent.app` (explicit)
   - Enable: ✅ Sign in with Apple
4. Register

### 1.2: Create Services ID (for Web)

1. Click "+" → Select "Services IDs" → Continue
2. Configure:
   - Description: `My-Travel-Agent Web`
   - Identifier: `com.mytravelagent.web`
3. Register
4. Click on it → Enable "Sign in with Apple" → Configure
5. Add:
   - Primary App ID: `My-Travel-Agent App`
   - Domain: `mytravelagent.com`
   - Return URL: `https://my-travel-agent-dev.auth.us-east-1.amazoncognito.com/oauth2/idpresponse`
   - (Update with actual Cognito domain later)
6. Save

### 1.3: Generate Private Key

1. Go to "Keys" → Click "+"
2. Key Name: `My-Travel-Agent Apple Key`
3. Enable: ✅ Sign in with Apple → Configure
4. Select: `My-Travel-Agent App`
5. Register
6. **DOWNLOAD** `AuthKey_XXXXXXXXXX.p8` 
   - **CRITICAL**: Save securely, can't re-download
   - Note Key ID: `XXXXXXXXXX`
7. Note Team ID (top right): `YYYYYYYYYY`

**What you need**:
- Services ID: `com.mytravelagent.web`
- Key ID: `XXXXXXXXXX`
- Team ID: `YYYYYYYYYY`
- Private key file: `AuthKey_XXXXXXXXXX.p8`

---

## 🔐 Step 2: Store Credentials (20 min)

### 2.1: Convert Key to Base64

```bash
# Convert .p8 to base64
base64 -i AuthKey_XXXXXXXXXX.p8 | tr -d '\n' > apple-key.txt
```

### 2.2: Store in AWS Secrets Manager

```bash
# Store secret
aws secretsmanager create-secret \
  --name my-travel-agent/dev/apple-oauth \
  --secret-string "{
    \"teamId\": \"YYYYYYYYYY\",
    \"keyId\": \"XXXXXXXXXX\",
    \"privateKey\": \"$(cat apple-key.txt)\",
    \"servicesId\": \"com.mytravelagent.web\"
  }" \
  --region us-east-1
```

### 2.3: Add to GitHub

```bash
gh secret set APPLE_TEAM_ID --body "YYYYYYYYYY"
gh secret set APPLE_KEY_ID --body "XXXXXXXXXX"
gh secret set APPLE_PRIVATE_KEY < apple-key.txt
```

---

## 🏗️ Step 3: Update Infrastructure (30 min)

### 3.1: Update Cognito with Apple

**Cursor Prompt** (Composer):

```
Update Cognito User Pool to add Apple Sign-In:

File: infrastructure/lib/auth-stack.ts

Add:
1. Retrieve Apple credentials from Secrets Manager: 'my-travel-agent/{env}/apple-oauth'
2. Create UserPoolIdentityProviderApple:
   - teamId, keyId, privateKey from secrets
   - clientId: servicesId from secrets
   - scopes: ['email', 'name']
   - attributeMapping: email→email, name→name
3. Add APPLE to supportedIdentityProviders
4. Add dependency: client depends on Apple provider

Generate updated AuthStack with Apple support.
```

### 3.2: Deploy

```bash
cd infrastructure
npx cdk deploy --all --context environment=dev

# Note the CognitoDomainName output
```

### 3.3: Update Apple Console

1. Go to Services ID in Apple Developer
2. Edit return URLs
3. Add exact Cognito domain from CDK output
4. Save

---

## 💻 Step 4: Update Backend (30 min)

### 4.1: Update OAuth Callback

**Cursor Prompt** (Composer):

```
Update OAuth callback handler to support Apple:

File: backend/src/handlers/auth/oauth-callback.ts

Add Apple support:
1. Detect Apple tokens (issuer: "https://appleid.apple.com")
2. Extract Apple user info (sub, email)
3. Handle Apple specifics:
   - Email hiding via Private Relay
   - Name only on first sign-in
   - Store appleUserId
4. Create profile with authProvider: "apple"

Generate updated callback handler.
```

---

## 🎨 Step 5: Update Frontend (40 min)

### 5.1: Update Auth Config

**Cursor Prompt**:

```
Add Apple Sign-In to auth config:

File: frontend/src/config/auth.ts

Add:
- getAppleSignInUrl() function
- response_mode=form_post (Apple requirement)
- identity_provider=SignInWithApple

Generate updated config.
```

### 5.2: Add Apple Button

**Cursor Prompt**:

```
Add Apple Sign-In button to signup form:

File: frontend/src/components/auth/SignupForm.tsx

Add:
- Black button with Apple logo
- Text: "Sign in with Apple"
- Position: Top of form
- Style: Follow Apple HIG

Generate updated form.
```

### 5.3: Handle POST Callback

Apple uses POST, not GET. Update callback page to handle both.

---

## 🧪 Step 6: Test (30 min)

**Must test on HTTPS** (Apple requirement)

1. Deploy to dev environment
2. Test Sign in with Apple flow
3. Verify email hiding works
4. Check name captured on first sign-in

---

## 🚀 Step 7: Deploy

```bash
git commit -m "Add Apple Sign-In"
git push origin develop
```

---

## ✅ Success Checklist

- [ ] Apple Developer account active ($99/year)
- [ ] App ID + Services ID created
- [ ] Private key generated and stored
- [ ] Cognito configured with Apple
- [ ] Backend handles Apple tokens
- [ ] Frontend has Apple button
- [ ] POST callback working
- [ ] Tested on HTTPS
- [ ] Deployed to dev

**Time**: 3-4 hours  
**Cost**: $99/year + $0.60/month

---

## 🐛 Common Issues

### "Invalid client"
- Verify Services ID matches
- Check return URL exact match
- Wait 5 min for propagation

### Doesn't work on localhost
- Apple requires HTTPS
- Use ngrok or deploy to test

### Name not appearing
- Apple only sends on first sign-in
- Store permanently when received
- Use email fallback if missing

---

## 📱 iOS App Note

If you build iOS app with ANY social login:
- **MUST** offer Apple Sign-In (App Store requirement)
- Apple button must be equal/more prominent
- Reuse same credentials

---

**Status**: Ready to Implement 🚀
