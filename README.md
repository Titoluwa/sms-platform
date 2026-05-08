# SMSHub - Bulk SMS Campaign Platform

A professional, enterprise-grade SMS marketing platform built with Next.js 16, featuring user authentication, bulk SMS sending, wallet management, and admin controls.

## Overview

SMSHub is a comprehensive bulk SMS platform that allows businesses to send SMS campaigns to thousands of customers instantly. With an intuitive dashboard, real-time analytics, and flexible pricing, it's designed for marketing teams and businesses of all sizes.

## Features

### User Features

- **User Authentication**: Secure sign up and login with persistent sessions
- **Single SMS**: Send individual SMS messages to specific phone numbers
- **Bulk SMS Campaigns**: Send SMS to thousands of contacts simultaneously
- **Campaign Management**: Track and manage all your SMS campaigns with detailed analytics
- **Wallet System**: Top up wallet balance via Stripe payments (mock integration)
- **Real-time Tracking**: Monitor delivery status and engagement metrics
- **Transaction History**: View all credits/debits with timestamps

### Admin Features

- **User Management**: View, manage, and monitor all platform users
- **System Health Monitoring**: Check API, database, and gateway status
- **Analytics Dashboard**: Platform-wide metrics and revenue tracking
- **User Suspension**: Manage account status for compliance

### Platform Features

- **Professional Landing Page**: Marketing website with pricing and features
- **Mock SMS Gateway**: Simulated SMS delivery with realistic success rates
- **Mock Payments**: Stripe integration simulation for testing
- **Responsive Design**: Mobile-first, fully responsive interface
- **Clean UI**: Modern, professional design with Tailwind CSS and shadcn/ui

## Tech Stack

- **Frontend**: Next.js 16, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: Custom mock auth with session management
- **Data Layer**: In-memory mock database
- **API**: Next.js API routes
- **Icons**: Lucide React

## Project Structure

```/app
  /api
    /auth          # Authentication endpoints
    /sms           # SMS sending endpoints
    /wallet        # Payment/wallet endpoints
  /auth
    /login         # Login page
    /register      # Registration page
  /dashboard
    /layout        # Dashboard layout with sidebar
    /page          # Main dashboard
    /send          # SMS sending interface
    /campaigns     # Campaign management
    /wallet        # Wallet and payment page
    /admin         # Admin dashboard (admin only)
    /settings      # Account settings
  /page            # Landing page
  /layout          # Root layout with auth provider
  /globals.css     # Global styles and theme

/lib
  /mockData.ts     # Mock database and data models
  /auth.ts         # Authentication utilities
  /authContext.tsx # React context for auth state

/components
  /dashboard-sidebar.tsx      # Dashboard navigation
  /protected-route.tsx        # Route protection wrapper
  /ui                         # shadcn/ui components
```

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`

### Demo Credentials

**User Account:**

- Email: `demo@example.com`
- Password: `demo123`
- Wallet Balance: $50.00

**Admin Account:**

- Email: `admin@example.com`
- Password: `admin123`

## Key Pages & Features

### Landing Page (`/`)

Marketing website showcasing platform features, pricing, and benefits. Includes call-to-action buttons directing to login/signup.

### Authentication

- **Login** (`/auth/login`): Sign in with email and password
- **Register** (`/auth/register`): Create new account with company information

### Dashboard

- **Home** (`/dashboard`): Overview with stats, recent campaigns, and quick actions
- **Send SMS** (`/dashboard/send`): Single or bulk SMS sending interface
- **Campaigns** (`/dashboard/campaigns`): View and manage all campaigns
- **Wallet** (`/dashboard/wallet`): Check balance, add funds, view transaction history
- **Admin** (`/dashboard/admin`): Admin-only user management and system monitoring
- **Settings** (`/dashboard/settings`): Account info, API keys, notifications, security

## API Endpoints

### Authentication APIs

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/validate` - Validate session token

### SMS Sending

- `POST /api/sms/send` - Send single SMS
- `POST /api/sms/bulk` - Send bulk SMS campaign

### Wallet & Payments

- `POST /api/wallet/topup` - Initiate payment
- `POST /api/wallet/confirm` - Confirm payment

## Authentication Flow

1. User submits login/register form
2. Credentials validated against mock data store
3. Session token generated and stored
4. Token saved to localStorage for persistence
5. AuthContext provides user data to app
6. Protected routes validate token on access
7. Logout clears token and session

## Mock Services

### Mock SMS Gateway

- Simulates SMS delivery with 95% success rate
- Returns message IDs for tracking
- Deducts from wallet balance

### Mock Payment System

- Simulates Stripe checkout process
- No real payments processed
- Adds credits to wallet balance

### Mock Data Store

- In-memory database with users, campaigns, messages
- Pre-populated with demo data
- Persists during session

## Pricing Plans

1. **Starter** - $9.99/month (100 SMS @ $0.08/SMS)
2. **Pro** - $39.99/month (500 SMS @ $0.07/SMS)
3. **Business** - $99.99/month (2000 SMS @ $0.05/SMS)

## Customization

### Changing Colors

Edit `/app/globals.css` CSS variables:

- `--primary` - Main brand color (currently blue)
- `--accent` - Accent color
- `--background` - Background color
- `--foreground` - Text color

### Adding Real Database

Replace `/lib/mockData.ts` with Neon or Supabase integration:

```typescript
// Example: Supabase integration
import { createClient } from '@supabase/supabase-js'
```

### Integrating Real Stripe

Replace `/app/api/wallet/confirm/route.ts` with actual Stripe webhook handling:

```typescript
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
```

### Adding Real SMS Gateway

Replace `MockSmsGateway` in `/lib/mockData.ts` with Twilio or AWS SNS:

```typescript
import twilio from 'twilio'
const client = twilio(accountSid, authToken)
```

## Security Considerations

### Current Implementation (Demo)

- Simple password comparison (no hashing)
- Tokens stored in localStorage
- In-memory session storage
- Mock data with no persistence

### Production Improvements Needed

- Hash passwords with bcrypt
- Use secure HTTP-only cookies for tokens
- Implement proper session management
- Add rate limiting on auth endpoints
- Use actual database with encryption
- Implement CSRF protection
- Add input validation and sanitization
- Enable HTTPS only
- Add audit logging
- Implement 2FA

## Performance Optimizations

- Server-side rendered landing page
- Client-side navigation in dashboard
- Lazy loading of components
- Optimized images and icons
- CSS-in-JS with Tailwind
- Async/await for API calls

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Vercel (Recommended)

```bash
vercel deploy
```

### Docker

```bash
docker build -t smshub .
docker run -p 3000:3000 smshub
```

### Manual

```bash
pnpm build
pnpm start
```

## Support & Documentation

For API documentation, visit `/api-docs` (when deployed)

For issues and feature requests, contact `support@smshub.io`

## License

MIT License - See LICENSE file for details

## Authors

Built with v0.app - AI-powered development platform
