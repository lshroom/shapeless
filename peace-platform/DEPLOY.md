# Quick Deploy to Vercel

The easiest way to test this is to deploy it to Vercel (takes ~2 minutes):

## Option 1: One-Click Deploy 🚀

1. **Install Vercel CLI** (if you haven't):
   ```bash
   npm install -g vercel
   ```

2. **Deploy from the peace-platform directory**:
   ```bash
   cd /home/user/shapeless/peace-platform
   vercel
   ```

3. **Follow the prompts**:
   - Login to Vercel (or create account)
   - Confirm project settings (just press Enter for defaults)
   - Wait ~60 seconds for deployment
   - Get your URL: `https://your-project.vercel.app`

4. **Add environment variables** (optional, for AI moderation):
   ```bash
   vercel env add GOOGLE_AI_API_KEY
   vercel env add ANTHROPIC_API_KEY
   vercel env add JWT_SECRET
   ```

5. **Redeploy with env vars**:
   ```bash
   vercel --prod
   ```

## Option 2: Deploy via GitHub + Vercel Dashboard

1. **Your code is already pushed to GitHub** ✅
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Connect your GitHub account
5. Select the `lshroom/shapeless` repository
6. Set **Root Directory** to: `peace-platform`
7. Click "Deploy"
8. Done! You'll get a URL like: `https://shapeless-xxx.vercel.app`

## Option 3: Test with Static Export

If you want to test locally without a server:

```bash
cd /home/user/shapeless/peace-platform
npm run build
npm start
```

Then try accessing via the network IP instead of localhost.

## What You'll Be Able to Test:

### Working Right Away (No API Keys Needed):
- ✅ Main landing page with design
- ✅ Video Composite Mixer at `/embed/video-composite`
- ✅ SonoBus Session Manager at `/embed/sonobus`
- ✅ All UI components and interactions
- ✅ Embed in Wix (use your Vercel URL)

### Requires API Keys:
- ❌ AI Moderation endpoints
- ❌ Live wave data

## Test URLs After Deploy:

```
https://your-app.vercel.app/
https://your-app.vercel.app/embed/video-composite
https://your-app.vercel.app/embed/sonobus
```

**Want me to help you deploy it, or would you prefer a different approach?**
