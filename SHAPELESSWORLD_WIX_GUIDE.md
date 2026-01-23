# Shapelessworld.org Wix Integration Guide

This guide explains how to integrate the Shapeless Peace Movement platform with your Wix site at **shapelessworld.org**.

## Overview

The Shapeless Peace Movement is a decentralized music creation platform for peace in Israel & Palestine. This guide will help you add the peace platform to your Wix site with your custom cyberpunk images.

## Your Custom Images

We've created 4 custom SVG images with cyberpunk/holographic styling:

1. **cyberpunk-studio.svg** - Pirate skeletons making music in a neon-lit studio
2. **neon-skull-logo.svg** - Animated skull with audio waves and music notes
3. **holographic-skull.svg** - Color-shifting holographic skull with "SHAPELESS" text
4. **cityscape.svg** - Futuristic cyberpunk cityscape with holographic peace display

All images are located in the `images/` directory and use animated SVG with neon effects (cyan, magenta, green).

## Integration Methods

### Method 1: Custom HTML Embed (Recommended)

This method embeds the complete peace platform directly into your Wix site.

#### Step 1: Upload Images to Wix

1. Log into your Wix dashboard at wix.com
2. Open your shapelessworld.org site editor
3. Go to **Media Manager** (left sidebar)
4. Click **Upload Media**
5. Upload all 4 SVG files from the `images/` folder:
   - `cyberpunk-studio.svg`
   - `neon-skull-logo.svg`
   - `holographic-skull.svg`
   - `cityscape.svg`

#### Step 2: Get Image URLs

1. After uploading, click on each image in Media Manager
2. Click **Copy URL** for each image
3. Save these URLs - you'll need them shortly

**Example Wix image URL format:**
```
https://static.wixstatic.com/media/abc123_def456.svg
```

#### Step 3: Update wix-embed.html

The `wix-embed.html` file already has the local image paths configured:
- Hero background: `images/cyberpunk-studio.svg`
- Logo: `images/neon-skull-logo.svg`
- Cityscape: `images/cityscape.svg`

**Option A: Use Local Paths (if hosting on your domain)**
If you're hosting the entire site on shapelessworld.org, the current paths will work as-is.

**Option B: Use Wix Media URLs**
If embedding in Wix, replace the image paths with your Wix Media URLs:

Open `wix-embed.html` and update:
```css
/* Line 40 - Hero background */
background: url('YOUR_WIX_URL_FOR_CYBERPUNK_STUDIO') center/cover;

/* Line 309 - Cityscape background */
background: url('YOUR_WIX_URL_FOR_CITYSCAPE') center/cover;
```

```html
<!-- Line 397 - Logo image -->
<img src="YOUR_WIX_URL_FOR_NEON_SKULL_LOGO" alt="Shapeless Logo" class="logo">

<!-- Line 414 - Studio image -->
<img src="YOUR_WIX_URL_FOR_CYBERPUNK_STUDIO" alt="Cyberpunk Studio" class="studio-image">
```

#### Step 4: Embed in Wix

1. In Wix Editor, click **Add** (+) button
2. Select **Embed Code** → **Custom embeds** → **HTML iframe**
3. Click **Enter Code**
4. Paste the entire contents of `wix-embed.html`
5. Set iframe dimensions:
   - Width: 100%
   - Height: Auto (or at least 3000px to show all content)
6. Click **Update**
7. Position the embed on your page
8. Publish your site

### Method 2: External Link to Hosted Platform

If you prefer to keep the platform separate from your Wix site:

#### Option A: Link to GitHub Pages or Vercel

Current deployment: `https://shapeless-five.vercel.app/`

1. In Wix Editor, add a **Button** or **Menu Item**
2. Set link to: `https://shapeless-five.vercel.app/`
3. Set link to open in **New Tab**

#### Option B: Host on Shapelessworld.org Subdomain

1. Create a subdomain: `peace.shapelessworld.org` or `platform.shapelessworld.org`
2. Upload all files to your subdomain:
   - `index.html` (or `peace-platform.html`)
   - `images/` folder with all SVG files
   - All other platform files
3. Link to the subdomain from your Wix site

### Method 3: Wix Velo Integration (Advanced)

For developers who want native Wix integration with databases:

1. Enable **Wix Velo** (Dev Mode)
2. Create Content Collections:
   - `Members` - Track movement participants
   - `Teams` - Music creation teams
   - `Invites` - Referral tracking
   - `Tracks` - Created music pieces

3. Use Wix Elements to rebuild the UI:
   - Hero section with background images
   - Feature cards
   - Stats counters
   - CTA buttons

4. Add JavaScript (Velo) for:
   - Referral tracking
   - Stats calculation
   - Form submissions

## Image Customization

### Updating Colors

All SVG images use these neon colors:
- **Cyan**: `#00ffff`
- **Magenta**: `#ff00ff`
- **Green**: `#00ff00`

To change colors, open any `.svg` file and find/replace these hex codes.

### Animation Speed

Animations use CSS `dur` attributes. To adjust:
- Open the SVG file
- Find `<animate>` tags
- Change `dur="2s"` to your preferred duration

Example:
```xml
<!-- Slower glow (2s → 4s) -->
<animate attributeName="opacity" values="0.8;1;0.8" dur="4s" repeatCount="indefinite"/>
```

## Platform Features

Once integrated, your visitors can:

1. **View the Movement** - Learn about the peace initiative
2. **Join Teams** - Sign up via `join-movement.html`
3. **Create Music** - Use the composite tool at `composite.html`
4. **Track Progress** - View the dashboard at `dashboard.html`
5. **Invite Others** - Share referral links for viral growth

## File Structure

```
shapeless/
├── images/
│   ├── cyberpunk-studio.svg      # Pirate skeletons making music
│   ├── neon-skull-logo.svg       # Logo with audio waves
│   ├── holographic-skull.svg     # Holographic SHAPELESS logo
│   └── cityscape.svg             # Futuristic city with peace display
├── wix-embed.html                # Ready for Wix embedding
├── index.html                    # Main landing page (with images)
├── peace-platform.html           # Alternative landing page
├── join-movement.html            # Signup/referral form
├── dashboard.html                # Team dashboard
├── composite.html                # Music creation tool
└── video-composite.html          # Video composite tool
```

## Testing

### Test Locally
1. Open `wix-embed.html` in a browser
2. Verify all images load correctly
3. Check animations work smoothly
4. Test on mobile devices

### Test on Wix
1. Use Wix **Preview** mode before publishing
2. Test all interactive elements
3. Verify responsive design on mobile
4. Check load times

## Performance Tips

1. **SVG Optimization**: SVGs are already optimized, but you can compress further using SVGO if needed
2. **Lazy Loading**: Consider lazy loading images below the fold
3. **Caching**: Enable browser caching for SVG files
4. **CDN**: Use Wix's built-in CDN for faster image delivery

## Troubleshooting

### Images Not Showing
- **Check file paths**: Ensure image URLs are correct
- **CORS issues**: If hosting externally, enable CORS headers
- **Wix restrictions**: Verify Wix allows SVG files (they do)

### Animations Not Working
- **Browser compatibility**: Ensure browser supports SVG animations
- **JavaScript conflicts**: Check for Wix scripts interfering

### Layout Issues
- **Container width**: Set iframe/embed to 100% width
- **Height calculation**: Use `height: auto` or specific pixel height
- **Mobile view**: Test responsive breakpoints

## Next Steps

1. ✅ Upload SVG images to Wix Media Manager
2. ✅ Update `wix-embed.html` with Wix image URLs (if using Method 1B)
3. ✅ Embed the HTML in your Wix page
4. ✅ Test on desktop and mobile
5. ✅ Publish your site
6. ✅ Share the peace platform with the world! 🕊️

## Support & Resources

- **Platform Repository**: https://github.com/lshroom/shapeless
- **Live Demo**: https://shapeless-five.vercel.app/
- **Documentation**: See `README.md`, `WIX_INTEGRATION_GUIDE.md`
- **Discord Bot Setup**: See `DISCORD_AI_MODERATION.md`

## Color Reference

### Neon Cyberpunk Palette
```css
--neon-cyan: #00ffff;
--neon-magenta: #ff00ff;
--neon-green: #00ff00;
--dark-bg: #0a0e27;
--dark-purple: #1a1a3e;
--deep-purple: #2d1b69;
```

### Gradient Examples
```css
/* Rainbow gradient for title */
background: linear-gradient(135deg, #00ffff, #ff00ff, #00ff00);

/* Cyan to blue */
background: linear-gradient(135deg, #00ffff 0%, #0088ff 100%);

/* Magenta to purple */
background: linear-gradient(135deg, #ff00ff 0%, #8800ff 100%);

/* Green to dark green */
background: linear-gradient(135deg, #00ff00 0%, #008800 100%);
```

---

**Created for the Shapeless Peace Movement**  
🏴‍☠️ 🇮🇱 🕊️ 🇵🇸  
*Music knows no borders. Peace knows no limits.*
