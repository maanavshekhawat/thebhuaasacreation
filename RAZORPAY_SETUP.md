# Razorpay Payment Gateway Setup

## Steps to Get Razorpay Test Keys

### Step 1: Create a Razorpay Account
1. Go to **https://razorpay.com/**
2. Click on **"Sign Up"** (top right corner)
3. Enter your details:
   - Email address
   - Password
   - Business name (e.g., "The Bhuaasa Creation")
   - Mobile number
4. Verify your email and mobile number
5. Complete the basic account setup

### Step 2: Access the Dashboard
1. Login to **Razorpay Dashboard**: https://dashboard.razorpay.com/
2. You'll see the dashboard overview

### Step 3: Get Your Test API Keys
1. In the Razorpay Dashboard, look for **"Settings"** in the left sidebar
2. Click on **"Settings"** → **"API Keys"**
3. You'll see two sections:
   - **Test Mode Keys** (for development/testing)
   - **Live Mode Keys** (for production - requires KYC)
4. Under **"Test Mode Keys"**, you'll see:
   - **Key ID** (starts with `rzp_test_`)
   - **Key Secret** (click "Reveal" to see it)
5. **Copy both keys** - you'll need them for your application

### Step 4: Update Your Backend Configuration
1. Open `backend/src/main/resources/application.properties`
2. Replace the placeholder values with your actual keys:
   ```
   razorpay.key.id=rzp_test_YOUR_ACTUAL_KEY_ID_HERE
   razorpay.key.secret=YOUR_ACTUAL_SECRET_KEY_HERE
   ```
3. **Important**: 
   - Don't share these keys publicly
   - Don't commit them to public repositories
   - Use Test Keys for development
   - Use Live Keys only after completing KYC for production

### Step 5: Restart Backend Server
After updating the keys, restart your Spring Boot backend server for changes to take effect.

## Visual Guide to Find API Keys

**Dashboard Path**: Settings → API Keys → Test Mode Keys

You'll see:
- **Key ID**: `rzp_test_xxxxxxxxxxxxx` (visible immediately)
- **Key Secret**: `xxxxxxxxxxxxxxxxxxxx` (click "Reveal" button to see)

## Test the Integration

Once you've configured the keys and restarted the backend:

1. Add items to cart
2. Click "Proceed to Checkout"
3. Razorpay payment modal will open
4. Use these **test card details**:
   - **Card Number**: `4111 1111 1111 1111`
   - **CVV**: Any 3 digits (e.g., `123`, `456`)
   - **Expiry Date**: Any future date (e.g., `12/25`, `01/26`)
   - **Name on Card**: Any name (e.g., "Test User")
   - **OTP**: For test mode, use `1234` if prompted

## Alternative: Quick Test Keys (If You Can't Access Dashboard)

If you're having trouble accessing the dashboard, you can also:
1. Check your email for Razorpay welcome email - it may contain setup instructions
2. Contact Razorpay support if you need help accessing your account
3. Make sure you've verified your email and completed the initial setup

## How It Works

1. User clicks "Proceed to Checkout" in the cart
2. Backend creates an order in Razorpay and saves it to the database
3. Razorpay payment modal opens
4. User completes payment
5. Payment is verified on the backend
6. Cart is cleared and user is redirected

## Important Notes

- **Test Mode**: Use test keys during development
- **Production**: Switch to live keys and complete KYC before going live
- **Security**: Never commit your secret keys to version control
- **Webhooks**: For production, set up webhooks for better payment tracking

## Troubleshooting

- If payment fails, check:
  - Razorpay keys are correct in `application.properties`
  - Backend server is running
  - Network connectivity
  - Razorpay dashboard for error logs

