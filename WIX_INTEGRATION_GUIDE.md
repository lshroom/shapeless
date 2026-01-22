# How to Add Shapeless Peace Platform to Your Wix Site

## Method 1: Embed as Custom Code (Recommended)

### Step 1: Upload Your Images to Wix

1. In Wix Editor, go to **Media Manager** (left sidebar)
2. Click **Upload Media**
3. Upload your 4 images:
   - `cyberpunk-studio.jpg` (the pirate skeletons making music)
   - `neon-skull-logo.png` (the skull with audio waves - transparent background)
   - `holographic-skull.png` (colorful skull with SHAPELESS text)
   - `cityscape.jpg` (futuristic city with holographic display)

4. After uploading, right-click each image and select **Copy Image URL**
5. Save these URLs - you'll need them in Step 3

### Step 2: Add Custom HTML Element

1. In Wix Editor, click **Add** (+) button on the left
2. Go to **Embed** → **Custom Element** → **HTML iframe**
3. Drag and drop it onto your page
4. Resize it to full width of your page

### Step 3: Insert the Custom Code

1. Open the file `wix-embed.html`
2. Replace the placeholder image URLs with your actual Wix image URLs:

Find these lines and replace with your URLs:
```html
<!-- Line ~172: Replace with your neon skull logo -->
<img src="YOUR_NEON_SKULL_URL_HERE" alt="Shapeless Logo" class="logo">

<!-- Line ~186: Replace with your cyberpunk studio image -->
<img src="YOUR_STUDIO_IMAGE_URL_HERE" alt="Cyberpunk Studio" class="studio-image">

<!-- Line ~276: In the cityscape section, update the background URL in the CSS -->
background: url('YOUR_CITYSCAPE_URL_HERE') center/cover;
```

3. Copy the entire modified HTML code
4. In Wix, double-click your HTML iframe element
5. Click **Code** tab
6. Paste your modified code
7. Click **Update**

### Step 4: Adjust Settings

1. Make sure the iframe is set to **Full Width**
2. Remove any padding/margins in the section
3. Set the height to **Auto** or manually to ~4000px

---

## Method 2: Create a Separate Page

### Option A: Add as New Wix Page

1. Go to **Pages & Menu** in Wix
2. Click **Add Page** → **Blank Page**
3. Name it "Peace Movement" or similar
4. Follow Steps 2-4 from Method 1 above

### Option B: Link to External Vercel Deployment

Simply add a button/link on your Wix site that points to:
```
https://shapeless-five.vercel.app/
```

---

## Method 3: Use Wix Velo (Advanced)

If you want full integration with Wix databases and dynamic content:

### Step 1: Enable Velo

1. Click **Dev Mode** in top right of Wix Editor
2. Enable **Velo by Wix**

### Step 2: Create Database Collections

1. Go to **Database Manager**
2. Create collections:
   - `Members` (for tracking referrals)
   - `Teams` (for music teams)
   - `Invites` (for referral tracking)

### Step 3: Convert HTML to Wix Elements

Instead of custom HTML, rebuild using Wix native elements:
- Strips for sections
- Columns for feature cards
- Buttons with hover effects
- Image galleries for your photos

### Step 4: Add Velo Code

Add JavaScript for:
- Animated counters
- Form submissions
- Referral tracking
- Member dashboard

---

## Quick Start: Just Want Images?

If you just want to add your cool images to the current site:

1. **Replace the logo** (line ~172 in wix-embed.html):
```html
<img src="https://static.wixstatic.com/media/YOUR_IMAGE_ID.png" alt="Shapeless Logo" class="logo">
```

2. **Add studio background** (update CSS around line 38):
```css
.hero::before {
    background: url('https://static.wixstatic.com/media/YOUR_STUDIO_IMAGE.jpg') center/cover;
    opacity: 0.3;
}
```

3. **Add cityscape** (line ~276):
```css
.cityscape {
    background: url('https://static.wixstatic.com/media/YOUR_CITYSCAPE.jpg') center/cover;
}
```

---

## Upload Images to Imgur (Alternative)

If you want to host images externally:

1. Go to [imgur.com](https://imgur.com)
2. Click **New Post** → Upload your 4 images
3. After uploading, right-click each image → **Copy Image URL**
4. Use these URLs in the HTML code

Example:
```html
<img src="https://i.imgur.com/ABC123.jpg" alt="Studio">
```

---

## Matching Your Wix Site Vibe

Based on your current site (shapelessworld.org), I see you have:
- Dark background with colorful accents
- Artistic, trippy visuals
- Sections for Music, Artists, Activism

### To Integrate Seamlessly:

1. **Color Scheme**: The code already uses cyan (#00ffff), magenta (#ff00ff), and neon green to match your style

2. **Typography**: Update to match your Wix fonts:
```css
body {
    font-family: 'YOUR_WIX_FONT', sans-serif;
}
```

3. **Sections**: Add the peace platform as a new section under "Activism" on your main site

4. **Navigation**: Update your Wix menu to include:
   - Home
   - Music
   - Artists
   - **Peace Movement** ← New
   - Activism

---

## Troubleshooting

### Images not showing?
- Make sure URLs are correct and public
- Check if Wix media URLs have proper permissions
- Try using Imgur as alternative host

### Code not displaying?
- Wix free plan may have limitations on custom code
- Try using a page section instead of iframe
- Make sure you're not in "Mobile view" while editing

### Buttons not working?
- Update button URLs to match your actual page URLs
- If using Wix pages, use relative URLs: `/join-movement`
- For external links, use full URLs: `https://shapeless-five.vercel.app/join-movement.html`

### Styling looks off?
- Wix may inject its own CSS
- Add `!important` to critical styles
- Consider using Wix native elements instead

---

## Next Steps

1. Upload your 4 images to Wix Media Manager
2. Get the image URLs
3. Update `wix-embed.html` with your image URLs
4. Add the HTML iframe to your Wix page
5. Paste the code
6. Test and adjust sizing

**Pro Tip**: Start with just one section (like the hero) to test, then gradually add more sections once you confirm it works!

---

## Quick Copy-Paste Image URLs Template

Replace these placeholders in your code:

```
NEON_SKULL_LOGO: ____________________________________
STUDIO_IMAGE: ____________________________________
HOLOGRAPHIC_SKULL: ____________________________________
CITYSCAPE_IMAGE: ____________________________________
```

Once you have these URLs, do a find-and-replace in the HTML file!

---

Need help? The code is self-contained and should work on any platform that supports HTML/CSS/JS. 🏴‍☠️🕊️
