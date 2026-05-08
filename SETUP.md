# SMSHub Setup Guide

## Quick Start

### 1. Installation

```bash
# Clone or download the project
cd smshub

# Install dependencies
pnpm install
```

### 2. Start Development Server

```bash
pnpm dev
```

The application will start at `http://localhost:3000`

### 3. Access the Platform

- **Landing Page**: `http://localhost:3000`
- **Login**: `http://localhost:3000/auth/login`
- **Dashboard**: `http://localhost:3000/dashboard` (after login)

## Demo Accounts

### User Account

```Email: demo@example.com
Password: demo123
Wallet Balance: $50.00
```

### Admin Account

```Email: admin@example.com
Password: admin123
Role: Administrator
```

## Main Features

### 1. Landing Page

Visit the home page to see marketing content, pricing, and features.

### 2. Sign Up

- Click "Get Started" on landing page
- Fill registration form with:
  - Full name
  - Company name
  - Email
  - Phone number
  - Password
- Receive $1.00 signup bonus

### 3. Send SMS

#### Single SMS

1. Go to Dashboard → Send SMS
2. Click "Send Single SMS" tab
3. Enter phone number with country code (e.g., +1234567890)
4. Type message (max 160 characters)
5. Click "Send SMS"
6. Cost: $0.10 per SMS

#### Bulk SMS

1. Go to Dashboard → Send SMS
2. Click "Send Bulk SMS" tab
3. Enter campaign name
4. Enter phone numbers (one per line)
5. Type message (max 160 characters)
6. Click "Send Bulk SMS"
7. See results and cost breakdown

### 4. View Campaigns

1. Go to Dashboard → Campaigns
2. See all your campaigns with:
   - Recipients count
   - Sent/Failed counts
   - Delivery rate percentage
   - Campaign status
3. Filter by status or search by name

### 5. Manage Wallet

#### View Balance

- Check balance on dashboard
- See transaction history
- Export transactions

#### Add Funds

1. Go to Dashboard → Wallet
2. Choose a pricing plan
3. Click "Add Funds"
4. Simulate Stripe payment
5. Funds added to wallet (demo)

### 6. Account Settings

1. Go to Dashboard → Settings
2. View account information
3. Access API keys
4. Configure notifications
5. Manage security settings

### 7. Admin Panel (Admin Only)

1. Login with admin account
2. Go to Dashboard → Admin Panel
3. View platform statistics
4. Monitor system health
5. Search and manage users
6. Suspend/activate accounts

## API Integration Example

### Send SMS via API

```javascript
// Authentication
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'demo@example.com',
    password: 'demo123'
  })
});

const { token, user } = await response.json();

// Send SMS
const smsResponse = await fetch('/api/sms/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    phoneNumber: '+1234567890',
    message: 'Hello! This is a test SMS.'
  })
});

const result = await smsResponse.json();
console.log(`Message sent! ID: ${result.messageId}`);
console.log(`Cost: $${result.cost / 100}`);
console.log(`New balance: $${result.remainingBalance / 100}`);
```

## Customization

### Change Platform Name

Edit these files:

- `/components/dashboard-sidebar.tsx` - Line 3
- `/app/page.tsx` - Line 8
- Update `app/layout.tsx` metadata

### Change Colors

Edit `/app/globals.css`:

```css
:root {
  --primary: oklch(0.45 0.25 250); /* Change blue to your color */
  --accent: oklch(0.5 0.2 250);
  /* Other colors... */
}
```

### Add New Features

1. Create new API route in `/app/api/`
2. Add page in `/app/dashboard/`
3. Update sidebar navigation in `/components/dashboard-sidebar.tsx`
4. Add corresponding UI components

## Testing

### Test Single SMS

1. Login with demo account
2. Go to Send SMS
3. Enter test number: +1555555555
4. Send message
5. Check results and balance deduction

### Test Bulk SMS

1. Login with demo account
2. Go to Send SMS → Bulk SMS
3. Enter test numbers (10 numbers)
4. Send campaign
5. View campaign in Campaigns page

### Test Wallet

1. Login with demo account
2. Go to Wallet
3. Choose any plan
4. Complete "payment"
5. Check balance increased

### Test Admin

1. Logout and login with `admin@example.com`
2. Go to Admin Panel
3. View all users and stats
4. Search and filter users
5. See system health status

## Troubleshooting

### Session Not Persisting

- Check browser localStorage is enabled
- Clear localStorage and login again
- Check browser console for errors

### SMS Sending Fails

- Verify phone number format (+country code)
- Check wallet balance is sufficient
- Check message is not empty
- Message must be ≤160 characters

### Payment Not Working

- This uses mock payment (demo)
- In production, integrate real Stripe
- Balance should update after 2 seconds

### Can't Access Admin Panel

- Make sure logged in with admin account
- Admin panel only visible to admin role

## Environment Variables

Currently using mock services - no env vars needed.

For production, add to `.env.local`:

```# Database
DATABASE_URL=postgresql://...

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLIC_KEY=pk_live_...

# SMS Gateway
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...

# Email
SMTP_HOST=...
SMTP_PORT=...
```

## Database Reset

To reset mock data to initial state:

1. Clear browser localStorage
2. Restart dev server
3. Login again - fresh demo data

## Performance Tips

- Use bulk SMS for large recipient lists
- Check wallet balance before sending
- Archive old campaigns regularly
- Monitor delivery rates

## Support

For issues or questions:

1. Check this setup guide
2. Review README.md
3. Check browser console for errors
4. Verify API endpoints are working

## Next Steps

1. **Customize**: Update colors, logos, and content
2. **Database**: Integrate real database (Supabase/Neon)
3. **Payments**: Add Stripe integration
4. **SMS**: Connect real SMS gateway (Twilio)
5. **Deploy**: Launch on Vercel or your server
6. **Monitor**: Set up analytics and logging

Happy SMS campaigning!
