# 🚀 LinkedIn Visual Post Automation with AI

**Automated system for generating branded visual posts for LinkedIn with AI-generated backgrounds + detailed educational content**

Perfect for busy professionals who want consistent, high-quality visual content with comprehensive descriptions without spending hours on design.

---

## ✨ What This Does

📸 **Automatically generates beautiful branded images** with AI-generated backgrounds
🎨 **Creates professional tech illustrations** using FREE Pollinations.AI
📖 **Provides ready-to-copy detailed descriptions** (200-300 words) explaining concepts
📝 **Schedules and reminds you** when it's time to post  
⏱️ **Takes 30 seconds** to copy-paste into LinkedIn manually

**⚠️ No LinkedIn API hassles. No third-party service fees. Complete control.⚠️**

---

## 🎯 Features

### ✅ AI-Powered Visual Generation
- **FREE AI Image Generation** using Pollinations.AI (no API key needed!)
- Professional tech illustrations based on your content
- Fallback to gradient backgrounds if AI is unavailable
- Alternative Hugging Face support (free API token)

### 📝 Comprehensive Content Creation
- **Full post descriptions** (200-300 words) explaining each concept
- Educational content with examples and best practices
- Ready-to-use hashtags
- Professional formatting for LinkedIn

### 🎨 Professional Branding
- Customizable colors and themes
- Your name and branding on every image
- LinkedIn-optimized dimensions (1200x627)
- Semi-transparent card overlay on AI backgrounds

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js v18+ (check with: node --version)
Git
```

### Installation

```bash
# Clone the repository
git clone https://github.com/SyedFrazAli/linkedin-visual-post-automation.git
cd linkedin-visual-post-automation

# Install dependencies
npm install
```

### Generate Your First Posts

```bash
# Generate images with AI backgrounds + get post descriptions
node src/index.js generate

# Images will be saved in: output/images/
# Post descriptions are in: content/posts.json
```

---

## 📚 How to Use

### Step 1: Generate Visual Content

```bash
node src/index.js generate
```

This will:
1. 🎨 Generate AI background images for each post
2. 📝 Create text overlays with your branding
3. 💾 Save final images to `output/images/`
4. 📊 Update `content/posts.json` with image paths

### Step 2: Get Your Post Content

Open `content/posts.json` and copy the `description` field for each post. These are comprehensive 200-300 word explanations ready for LinkedIn!

**Example post structure:**
```json
{
  "id": 1,
  "title": "5 Key Principles of Software Architecture",
  "description": "Full 250-word explanation with examples...",
  "imagePath": "/path/to/image/1.png"
}
```

### Step 3: Post to LinkedIn

1. Go to LinkedIn
2. Create a new post
3. Upload the generated image from `output/images/`
4. Copy-paste the `description` from `posts.json`
5. Publish! 🎉

### Step 4 (Optional): Schedule Reminders

```bash
node src/index.js schedule
```

This will send you desktop notifications when it's time to post.

---

## 📝 Adding Your Own Posts

Edit `content/posts.json`:

```json
{
  "id": 6,
  "title": "Your Topic Here",
  "subtitle": "Your subtitle",
  "description": "Full 200-300 word explanation of the concept. Include examples, best practices, and actionable insights. End with relevant hashtags.",
  "author": "Your Name",
  "color": "#0077B5",
  "status": "ready",
  "aiPrompt": "detailed description for AI image generation, e.g., 'cloud architecture diagram, modern tech illustration, blue theme'"
}
```

**Tips for AI Prompts:**
- Be specific about the visual style
- Include colors and themes
- Mention "professional" or "modern" for better results
- Examples: "software architecture layers diagram", "code editor with syntax highlighting"

---

## 🎨 AI Image Generation

### FREE Option: Pollinations.AI (No API Key!)

The system uses **Pollinations.AI** by default - completely free, no signup required!

### Alternative: Hugging Face (Free API Token)

If you want to use Hugging Face instead:

1. Get a free API token: https://huggingface.co/settings/tokens
2. Create `.env` file:
   ```bash
   HUGGINGFACE_API_TOKEN=your_token_here
   ```
3. Update `src/generate-images.js` to use Hugging Face instead of Pollinations

---

## 🛠️ Customization

### Change Colors

Edit colors in `content/posts.json`:
- `#0077B5` - LinkedIn Blue
- `#2ECC71` - Green
- `#E74C3C` - Red
- `#9B59B6` - Purple
- `#F39C12` - Orange

### Modify Template

Edit `src/templates/post-template.html` to change:
- Fonts
- Layout
- Card styling
- Branding elements

### Adjust Dimensions

In `src/generate-images.js`, change:
```javascript
await page.setViewport({ width: 1200, height: 627 }); // LinkedIn optimal size
```

---

## 📊 Current Content Library

5 ready-to-post topics with full descriptions:

1. **5 Key Principles of Software Architecture**
2. **The Power of Clean Code**
3. **Microservices vs Monolith**
4. **DevOps Best Practices**
5. **Understanding Design Patterns**

Each includes:
- 🖼️ AI-generated professional illustration
- 📝 200-300 word detailed explanation
- 📚 Key principles and examples
- 🎯 Actionable insights
- #️⃣ Relevant hashtags

---

## 💻 Commands

```bash
# Generate images + get descriptions
node src/index.js generate

# Set up posting schedule
node src/index.js schedule

# Development mode
npm run dev
```

---

## 💡 Pro Tips

1. **Generate images in batches** - Create 5-10 posts at once
2. **Copy descriptions early** - Save them in a notes app for quick access
3. **Schedule your posts** - Use LinkedIn's native scheduler
4. **Customize AI prompts** - Better prompts = better visuals
5. **Mix content types** - Alternate between topics

---

## ⚠️ Troubleshooting

### AI Image Generation Fails

**Issue**: Timeout or connection errors

**Solution**: The system automatically falls back to gradient backgrounds. Images will still be generated with text overlays.

### CSS Warnings in VSCode

**Issue**: CSS errors in `post-template.html`

**Solution**: These are harmless warnings about template placeholders `{{TITLE}}`, etc. They're replaced at runtime.

### Puppeteer Launch Errors

```bash
npm audit fix --force
# This upgrades Puppeteer to v24+
```

---

## 📚 Tech Stack

- **Node.js** - Runtime
- **Puppeteer** - Headless browser for screenshot generation
- **Axios** - HTTP client for AI API calls
- **Pollinations.AI** - FREE AI image generation
- **node-cron** - Scheduling
- **chalk** - Terminal styling

---

## 🛡️ Why Semi-Automated?

**LinkedIn ToS Compliance**: LinkedIn's Terms of Service prohibit automated posting via unofficial APIs. This semi-automated approach:

✅ Generates content automatically  
✅ Respects LinkedIn's rules  
✅ Gives you final control  
✅ No risk of account suspension  

---

## 📝 License

MIT License - Feel free to use for personal or commercial projects!

---

## 🚀 Future Enhancements

- [ ] More AI providers (DALL-E, Stability AI)
- [ ] Multi-language support
- [ ] Video content generation
- [ ] Analytics tracking
- [ ] Browser extension for 1-click posting

---

## 🤝 Contributing

Pull requests welcome! Please:
1. Fork the repo
2. Create a feature branch
3. Add your changes
4. Submit a PR

---

## 💬 Support

Questions? Open an issue on GitHub!

Happy posting! 🎉
