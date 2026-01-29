# Tech Stack, Deployment, and Contact Form Analysis

## 📋 Tech Stack Summary

### Frontend
- **React 19** - Modern UI framework
- **TanStack Router** - Type-safe file-based routing
- **TanStack React Query** - Data fetching and state management
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Lucide React** - Icon library
- **Zustand** - State management (for language store)

### Backend
- **Node.js** - Runtime environment
- **Vinxi** - Full-stack framework (similar to Next.js but with different architecture)
- **tRPC** - End-to-end type-safe APIs (TypeScript-first RPC framework)
- **Prisma ORM** - Database toolkit and ORM
- **TypeScript** - Type safety across the stack

### Database
- **PostgreSQL** - Relational database (running in Docker)
- **Prisma** - Database schema management and migrations

### Infrastructure & DevOps
- **Docker & Docker Compose** - Containerization
- **Nginx** - Reverse proxy and web server
- **MinIO** - Object storage (S3-compatible)
- **Redis** - Caching (configured but may not be actively used)

### Development Tools
- **Vite** - Build tool and dev server
- **ESLint & Prettier** - Code quality and formatting
- **Playwright** - Browser automation/testing

---

## 🚀 Deployment Guide

### Current Setup
The project uses **Docker Compose** for containerization, making it deployable to any platform that supports Docker.

### Deployment Platforms (Recommended)

#### Option 1: DigitalOcean App Platform or Droplet
- **Easiest**: DigitalOcean App Platform (managed)
- **More Control**: DigitalOcean Droplet (VPS)
- **Steps**:
  1. Push code to GitHub/GitLab
  2. Connect repository to DigitalOcean
  3. Configure environment variables
  4. Deploy

#### Option 2: Railway
- Very simple deployment
- Automatic HTTPS
- Built-in PostgreSQL option
- **Steps**:
  1. Connect GitHub repo
  2. Railway auto-detects Docker
  3. Add environment variables
  4. Deploy

#### Option 3: AWS (EC2, ECS, or Elastic Beanstalk)
- **EC2**: Full control, manual setup
- **ECS**: Container orchestration
- **Elastic Beanstalk**: Easier managed deployment
- More complex but highly scalable

#### Option 4: Render
- Simple Docker deployment
- Free tier available
- Automatic SSL

#### Option 5: Fly.io
- Global edge deployment
- Great for performance
- Simple Docker deployment

### Deployment Steps (General)

1. **Prepare Environment Variables**
   Create a `.env` file with:
   ```env
   NODE_ENV=production
   BASE_URL=https://yourdomain.com
   ADMIN_PASSWORD=your-secure-password
   JWT_SECRET=your-jwt-secret
   OPENROUTER_API_KEY=your-key
   CONTACT_TO_EMAIL=amberwangxinyu2002@gmail.com
   DATABASE_URL=postgresql://user:password@host:5432/dbname
   ```

2. **Build Docker Image**
   ```bash
   docker build -f docker/Dockerfile -t bill-app .
   ```

3. **Deploy with Docker Compose** (if using VPS)
   ```bash
   cd docker
   docker-compose up -d
   ```

4. **Configure Domain**
   - Point your domain's A record to your server's IP
   - Or use platform's domain management (Railway, Render, etc.)
   - Configure SSL/HTTPS (most platforms do this automatically)

5. **Update Nginx Config** (if using custom server)
   - Update `docker/nginx/conf.d/default.conf` with your domain
   - Restart nginx container

### Database Considerations
- **Production**: Use managed PostgreSQL (DigitalOcean, AWS RDS, Railway, etc.)
- **Development**: Uses Docker PostgreSQL (as configured)
- Update `DATABASE_URL` in production environment

---

## 📧 Contact Form Email Logic Analysis

### Current Implementation

**Location**: `src/server/trpc/procedures/contact.ts`

### How It Works

1. **Form Submission Flow**:
   ```
   User fills form → Frontend (React) → tRPC mutation → Backend handler
   → Save to PostgreSQL → Attempt email send → Return response
   ```

2. **Email Recipient Logic**:
   - Checks for `CONTACT_TO_EMAIL` environment variable
   - If set: Uses that email address
   - If not set: Defaults to `billqin@bqrealtygroup.com`
   - **Current code**: Line 186 in `contact.ts`

3. **Email Sending Status**:
   ⚠️ **CRITICAL**: The email service is **SIMULATED** (not real)
   - Function `sendEmail()` only logs to console (lines 31-60)
   - Does NOT actually send emails
   - Returns success but no email is delivered

### Can It Send to `amberwangxinyu2002@gmail.com` Right Now?

**Answer: NO** ❌

**Reasons**:
1. Email service is simulated - it only logs, doesn't send
2. Even if you set `CONTACT_TO_EMAIL=amberwangxinyu2002@gmail.com`, it won't send
3. Database saves work correctly, but emails are not delivered

### What Works
✅ Form validation (Zod schema)
✅ Database storage (PostgreSQL)
✅ Frontend form submission
✅ Success/error handling
✅ Logging of email attempts

### What Doesn't Work
❌ Actual email delivery
❌ Email notifications to recipients

---

## 🔧 How to Fix Email Functionality

### Option 1: Resend (Recommended - Easiest)

1. **Sign up**: https://resend.com
2. **Get API key**: From dashboard
3. **Install package**:
   ```bash
   pnpm add resend
   ```
4. **Update `src/server/trpc/procedures/contact.ts`**:
   ```typescript
   import { Resend } from 'resend';

   const resend = new Resend(env.RESEND_API_KEY);

   async function sendEmail(payload: EmailPayload): Promise<EmailResponse> {
     try {
       const data = await resend.emails.send({
         from: payload.from,
         to: payload.to,
         subject: payload.subject,
         html: payload.html,
         text: payload.text,
       });

       return {
         success: true,
         messageId: data.id,
       };
     } catch (error) {
       return {
         success: false,
         error: error.message,
       };
     }
   }
   ```
5. **Add to `src/server/env.ts`**:
   ```typescript
   RESEND_API_KEY: z.string(),
   ```
6. **Add to `.env`**:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```

### Option 2: SendGrid

1. **Sign up**: https://sendgrid.com
2. **Get API key**
3. **Install**: `pnpm add @sendgrid/mail`
4. **Similar implementation** to Resend

### Option 3: Nodemailer with SMTP

1. **Install**: `pnpm add nodemailer`
2. **Configure SMTP** (Gmail, Outlook, custom SMTP)
3. **More complex** but flexible

---

## ✅ How to Verify Email Functionality

### Method 1: Test Script (Recommended)

The project includes a test script:

```bash
npx tsx scripts/sendContactTest.ts
```

**What it does**:
- Directly calls the contact submission procedure
- Bypasses frontend
- Shows logs of email attempt
- Verifies database save

**To use**:
1. Set `CONTACT_TO_EMAIL=amberwangxinyu2002@gmail.com` in `.env`
2. Run the script
3. Check console logs for email attempt
4. Check database for saved submission
5. **After implementing real email**: Check inbox

### Method 2: Use Contact Form on Website

1. Navigate to `/contact` page
2. Fill out the form
3. Submit
4. Check:
   - Success message appears
   - Database has new entry (via Prisma Studio: `pnpm db:studio`)
   - Server logs show email attempt
   - **After implementing real email**: Check recipient inbox

### Method 3: Check Database

```bash
# Open Prisma Studio
pnpm db:studio

# Or query directly
# Check ContactSubmission table for new entries
```

### Method 4: Check Server Logs

When you submit the form, look for logs like:
```
[EMAIL_SEND_ATTEMPT] To: amberwangxinyu2002@gmail.com
[EMAIL_SEND_SUCCESS] MessageId: sim_xxxxx
```

**Note**: Currently these are simulated. After implementing real email service, you'll see actual API responses.

### Method 5: Monitor Email Service Dashboard

After implementing Resend/SendGrid:
- Check their dashboard for sent emails
- View delivery status
- See bounce/spam reports

---

## 📝 Summary Checklist

### To Deploy:
- [ ] Choose deployment platform (Railway, DigitalOcean, etc.)
- [ ] Set up PostgreSQL database (managed or Docker)
- [ ] Configure environment variables
- [ ] Point domain to server
- [ ] Set up SSL/HTTPS
- [ ] Test deployment

### To Fix Email:
- [ ] Choose email service (Resend recommended)
- [ ] Sign up and get API key
- [ ] Install email package
- [ ] Replace `sendEmail()` function
- [ ] Add API key to environment variables
- [ ] Test with `sendContactTest.ts` script
- [ ] Verify email delivery

### To Verify:
- [ ] Run test script
- [ ] Submit form on website
- [ ] Check database entries
- [ ] Check server logs
- [ ] Verify email delivery (after implementing real service)

---

## 🔍 Current Email Code Location

**File**: `src/server/trpc/procedures/contact.ts`

**Key Functions**:
- `sendEmail()` - Lines 31-60 (SIMULATED)
- `generateContactEmailHtml()` - Lines 65-122
- `generateContactEmailText()` - Lines 127-145
- `submitContactForm` - Lines 151-229 (main handler)

**Environment Variable**:
- `CONTACT_TO_EMAIL` - Optional, defaults to `billqin@bqrealtygroup.com`

---

## 💡 Quick Start: Enable Real Emails

1. **Get Resend API key** (free tier: 100 emails/day)
2. **Install**: `pnpm add resend`
3. **Update code** (see Option 1 above)
4. **Set env var**: `CONTACT_TO_EMAIL=amberwangxinyu2002@gmail.com`
5. **Test**: `npx tsx scripts/sendContactTest.ts`
6. **Check inbox**: `amberwangxinyu2002@gmail.com`

---

**Last Updated**: Based on current codebase analysis
