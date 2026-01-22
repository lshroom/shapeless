# Wix Embedding Guide for Peace Platform

This guide explains how to embed the Peace Platform components into your Wix website.

## Overview

The Peace Platform provides embeddable React components that can be integrated into your Wix site while maintaining full Wix editor control for content, images, and text.

## Available Embed Components

### 1. Video Composite Mixer (`/embed/video-composite`)
Multi-layer video compositing with real-time controls for collaborative streaming.

### 2. SonoBus Session Manager (`/embed/sonobus`)
Audio collaboration session browser with connection details for music creation.

### 3. Wave Tracker (Coming to `/embed/wave-tracker`)
Displays the current wave growth and movement progress.

## Deployment to Vercel

### Step 1: Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Configure environment variables:
   - `GOOGLE_AI_API_KEY` - Your Google AI API key (for Gemini moderation)
   - `ANTHROPIC_API_KEY` - Your Anthropic API key (for Claude moderation)
   - `DISCORD_BOT_TOKEN` - Your Discord bot token
   - `JWT_SECRET` - A random secret key for authentication

6. Click "Deploy"

Your app will be available at: `https://your-project.vercel.app`

### Step 2: Get API Keys

#### Google AI (Gemini) - Free for Nonprofits
1. Go to [Google for Nonprofits](https://www.google.com/nonprofits/)
2. Apply with your NGO documentation
3. Once approved, get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

#### Anthropic (Claude)
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Create an account
3. Generate an API key
4. Note: You may qualify for research/nonprofit credits

## Embedding in Wix

### Method 1: Using Wix HTML iframe Element

1. **Add HTML Element**
   - In Wix Editor, click "Add" (+)
   - Go to "Embed" → "HTML iframe"
   - Drag it to your page

2. **Configure the iframe**
   - Click on the HTML element
   - Click "Enter Code"
   - Paste the following code:

   ```html
   <!-- For Video Composite -->
   <iframe
     src="https://your-project.vercel.app/embed/video-composite"
     width="100%"
     height="600px"
     frameborder="0"
     allow="camera; microphone; autoplay; fullscreen"
     allowfullscreen
     style="border: none;"
   ></iframe>

   <!-- For SonoBus Manager -->
   <iframe
     src="https://your-project.vercel.app/embed/sonobus"
     width="100%"
     height="800px"
     frameborder="0"
     style="border: none;"
   ></iframe>
   ```

3. **Adjust Size**
   - Resize the HTML element to fit your layout
   - Recommended heights:
     - Video Composite: 600-800px
     - SonoBus Manager: 700-900px

### Method 2: Using Wix Velo (Custom Code)

For more advanced integration:

1. **Enable Velo**
   - In Wix Editor, enable "Dev Mode"
   - Go to "Velo" in the top menu

2. **Add Code**
   - Create a new page code file
   - Add this code:

   ```javascript
   $w.onReady(function () {
     // Get iframe element by ID
     const videoComposite = $w('#videoCompositeFrame');

     // Configure iframe
     videoComposite.src = 'https://your-project.vercel.app/embed/video-composite';

     // Optional: Listen for messages from iframe
     $w('#videoCompositeFrame').onMessage((event) => {
       console.log('Message from Peace Platform:', event.data);
     });
   });
   ```

## Customization

### Styling to Match Your Wix Theme

The embedded components use a dark theme by default. To customize:

1. **URL Parameters** (Coming Soon)
   ```
   /embed/video-composite?theme=light&primaryColor=667eea
   ```

2. **CSS Overrides**
   In your Wix page code:
   ```css
   /* Add to Custom CSS */
   iframe[src*="peace-platform"] {
     border-radius: 12px;
     box-shadow: 0 4px 20px rgba(0,0,0,0.3);
   }
   ```

## Responsive Design

The components are fully responsive. For mobile:

```html
<iframe
  src="https://your-project.vercel.app/embed/video-composite"
  width="100%"
  height="100vh"
  frameborder="0"
  style="min-height: 400px;"
></iframe>
```

## Communication Between Wix and Embedded Components

Use `postMessage` API for advanced integration:

**From Wix to Component:**
```javascript
// In Wix Velo
$w('#videoCompositeFrame').postMessage({
  action: 'addLayer',
  streamId: 'custom-stream-123'
});
```

**From Component to Wix:**
```javascript
// Component sends messages automatically
// Listen in Wix:
$w.onReady(() => {
  window.addEventListener('message', (event) => {
    if (event.data.source === 'peace-platform') {
      console.log('Event:', event.data);
    }
  });
});
```

## Example Wix Page Structure

```
┌─────────────────────────────────────┐
│  [Wix Header - Editable]            │
├─────────────────────────────────────┤
│  [Wix Text: "Join Our Music"]       │
│  [Wix Image: Peace Banner]          │
├─────────────────────────────────────┤
│  [EMBEDDED: Video Composite]        │  ← React Component
│  (Full functionality)               │
├─────────────────────────────────────┤
│  [Wix Text: "Connect with Audio"]   │
├─────────────────────────────────────┤
│  [EMBEDDED: SonoBus Manager]        │  ← React Component
├─────────────────────────────────────┤
│  [Wix Buttons: Donate, Join]        │
│  [Wix Footer - Editable]            │
└─────────────────────────────────────┘
```

## Troubleshooting

### Component Not Loading
- Check that Vercel deployment is successful
- Verify the iframe `src` URL is correct
- Check browser console for CORS errors

### Camera/Microphone Not Working
- Ensure `allow` attribute includes: `camera; microphone; autoplay`
- Check browser permissions
- VDO.Ninja requires HTTPS (Vercel provides this automatically)

### Slow Loading
- Components are optimized but depend on VDO.Ninja
- Consider showing a loading placeholder in Wix

## Security Considerations

1. **CORS Headers**: Already configured in `next.config.ts`
2. **API Keys**: Never expose in frontend code (using environment variables)
3. **Content Moderation**: Enabled by default with Gemini + Claude
4. **Rate Limiting**: Consider adding for production

## Support

For issues or questions:
- GitHub Issues: [your-repo]/issues
- Email: [your-email]
- Discord: [your-discord]

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Get API keys
3. ✅ Test embed URLs
4. ✅ Add to Wix
5. ✅ Customize styling
6. ✅ Launch! 🚀
