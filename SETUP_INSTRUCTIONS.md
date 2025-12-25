# Clerk Authentication App - Setup Instructions

## Project Overview

This is a Next.js application with Clerk authentication deployed on Vercel. The application includes:

- **Sign-in page** at `/sign-in` using Clerk's SignIn component
- **Protected embed page** at `/embed` that requires authentication
- The embed page allows authenticated users to enter a URL and embed content in an iframe

## Repository

GitHub: https://github.com/MerpGoaterman/clerk-auth-app

## Vercel Project

Project URL: https://vercel.com/9o4t/clerk-auth-app

**Note:** The initial deployment failed because Clerk environment variables are required for the build to succeed.

## Required Setup Steps

### 1. Create a Clerk Account and Application

1. Go to https://clerk.com and sign up for a free account
2. Create a new application in the Clerk Dashboard
3. Navigate to **API Keys** section in your Clerk dashboard
4. Copy your **Publishable Key** and **Secret Key**

### 2. Add Environment Variables to Vercel

1. Go to your Vercel project: https://vercel.com/9o4t/clerk-auth-app/settings/environment-variables
2. Add the following environment variables:

   **Key:** `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   **Value:** Your Clerk Publishable Key (starts with `pk_test_` or `pk_live_`)
   **Environments:** Production, Preview, Development

   **Key:** `CLERK_SECRET_KEY`
   **Value:** Your Clerk Secret Key (starts with `sk_test_` or `sk_live_`)
   **Environments:** Production, Preview, Development

   **Key:** `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
   **Value:** `/sign-in`
   **Environments:** Production, Preview, Development

   **Key:** `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`
   **Value:** `/embed`
   **Environments:** Production, Preview, Development

3. Click **Save** after adding each variable

### 3. Redeploy the Application

After adding the environment variables:

1. Go to the **Deployments** tab in your Vercel project
2. Click on the latest deployment
3. Click **Redeploy** button
4. Or simply push a new commit to the `main` branch to trigger a new deployment

### 4. Configure Clerk Application Settings

In your Clerk Dashboard:

1. Go to **Paths** settings
2. Set the **Sign-in URL** to match your Vercel domain: `https://your-domain.vercel.app/sign-in`
3. Set the **After sign-in URL** to: `https://your-domain.vercel.app/embed`
4. Add your Vercel domain to the **Allowed redirect URLs**

## Application Structure

```
/app
  /sign-in
    page.tsx          # Sign-in page with Clerk's SignIn component
  /embed
    page.tsx          # Protected page for embedding content
  layout.tsx          # Root layout with ClerkProvider
  page.tsx            # Home page that redirects to sign-in or embed
middleware.ts         # Clerk middleware for protecting routes
```

## Features

### Sign-In Page (`/sign-in`)
- Uses Clerk's pre-built SignIn component
- Handles user authentication
- Redirects to `/embed` after successful sign-in

### Embed Page (`/embed`)
- Protected route (requires authentication)
- Shows UserButton for account management
- Allows users to input a URL
- Embeds the URL content in an iframe
- Responsive design with Tailwind CSS

## Local Development

To run locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/MerpGoaterman/clerk-auth-app.git
   cd clerk-auth-app
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create `.env.local` file with your Clerk keys:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
   CLERK_SECRET_KEY=your_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/embed
   ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

5. Open http://localhost:3000 in your browser

## Troubleshooting

### Build Fails with "Missing publishableKey" Error

This means the Clerk environment variables are not set in Vercel. Follow step 2 above to add them.

### Redirect Loop After Sign-In

Check that your Clerk Dashboard paths match your Vercel domain and the environment variables are correctly set.

### Embed Page Shows 404

Make sure you're authenticated. The middleware protects the `/embed` route and will redirect unauthenticated users.

## Support

For Clerk-specific issues, visit: https://clerk.com/docs
For Vercel deployment issues, visit: https://vercel.com/docs
