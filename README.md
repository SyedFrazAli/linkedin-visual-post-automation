# 🚀 LinkedIn Visual Post Automation

**Semi-automated system for generating branded visual posts for LinkedIn with Node.js**

Perfect for busy professionals who want consistent, high-quality visual content without spending hours on design.

## ✨ What This Does

✅ **Automatically generates beautiful branded images** from your post titles  
✅ **Schedules and reminds you** when it's time to post  
✅ **Provides ready-to-copy text** with your content  
✅ **Takes 30 seconds** to copy-paste into LinkedIn manually  

*No LinkedIn API hassles. No third-party service fees. Complete control.*

---

## 📸 How It Works

1. **Write your posts** in `content/posts.json`
2. **Run the generator** to create branded images
3. **Get notifications** when it's time to post
4. **Copy & paste** into LinkedIn (30 seconds)

---

## 🎯 Option A: Semi-Automated (Recommended)

This is the perfect balance of automation and control:
- ✅ Images generated automatically
- ✅ Reminders sent at scheduled times
- ✅ You manually post (stays compliant with LinkedIn TOS)
- ✅ No paid third-party services needed

---

## 🛠️ Setup Instructions

### Prerequisites

- **Node.js** 18+ installed
- **Git** installed
- Basic terminal/command line knowledge

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/SyedFrazAli/linkedin-visual-post-automation.git
cd linkedin-visual-post-automation

# 2. Install dependencies
npm install

# 3. Create the required directories
mkdir -p src/templates content output/images

# 4. Add all the source files (see File Structure below)
```

---

## 📁 Complete File Structure

Create these files in your project:

```
linkedin-visual-post-automation/
├── package.json              ✅ Already created
├── .env.example             📝 Create this
├── .gitignore               ✅ Already created
├── README.md                ✅ You're reading it
├── src/
│   ├── index.js             📝 Create this
│   ├── generate-images.js   📝 Create this
│   ├── scheduler.js         📝 Create this
│   └── templates/
│       └── post-template.html  📝 Create this
├── content/
│   └── posts.json           📝 Create this
└── output/
    └── images/              (auto-generated)
```

### 📝 Files To Create

See the **Files** section below for the complete code for each file.

---

## 🚦 Usage

### Generate Images

```bash
npm run generate
```

This creates branded PNG images in `output/images/` for each post marked as `"status": "ready"`.

### Start Scheduler (Reminder System)

```bash
npm run schedule
```

This runs in the background and:
- Checks every hour for posts due to be published
- Shows you the post text and image path
- Reminds you to post manually on LinkedIn

### Manual Workflow

1. **Scheduler reminds you**: Console shows "Time to post!"
2. **Open the image**: From `output/images/post-001.png`
3. **Copy the text**: From the console output
4. **Go to LinkedIn**: https://linkedin.com
5. **Create post**: Paste text + upload image
6. **Publish**: Takes 30 seconds total!

---

## 📚 Complete Code Files

Create each of these files in your project. I've provided all the code ready to copy-paste.

### Clone and add these files locally

```bash
git clone https://github.com/SyedFrazAli/linkedin-visual-post-automation.git
cd linkedin-visual-post-automation
npm install
```

**Then create these files with the code provided in the previous response:**

1. `.env.example` - Environment configuration
2. `src/index.js` - Main entry point
3. `src/generate-images.js` - Image generation engine
4. `src/scheduler.js` - Scheduling and reminders
5. `src/templates/post-template.html` - Visual template
6. `content/posts.json` - Your post content

> 💡 **All complete code files are documented in the GitHub Issues or refer to initial setup guide above.**

---

## ✏️ Writing Posts

Edit `content/posts.json`:

```json
[
  {
    "id": "post-001",
    "title": "Your Catchy Title",
    "subtitle": "Supporting text",
    "author": "Your Name",
    "text": "Full LinkedIn post text with emojis and hashtags",
    "scheduledDate": "2025-01-05T09:00:00Z",
    "status": "ready",
    "color": "#0A66C2"
  }
]
```

**Status Options:**
- `draft` - Not ready yet
- `ready` - Ready to generate image
- `posted` - Already published

---

## 🎨 Customization

### Change Colors

Edit `src/templates/post-template.html`:
```css
background: linear-gradient(135deg, #YOUR_COLOR 0%, #YOUR_DARK_COLOR 100%);
```

### Change Font/Layout

Edit the CSS in `post-template.html` to match your brand.

### Add Your Logo

Replace the badge section with your logo image.

---

## 🔧 Troubleshooting

### Images not generating?

```bash
# Make sure puppeteer is installed
npm install puppeteer

# Check output directory exists
mkdir -p output/images
```

### Scheduler not working?

Make sure your `scheduledDate` is in the future and status is `"ready"`.

---

## 📈 Next Steps

1. ✅ **Clone this repo**
2. ✅ **Add all source files** (see code above)
3. ✅ **Run `npm install`**
4. ✅ **Create your first post** in `posts.json`
5. ✅ **Generate image**: `npm run generate`
6. ✅ **Test it**: Post manually on LinkedIn
7. ✅ **Schedule**: `npm run schedule`

---

## 🎯 Why This Approach?

✅ **No API limits** - Direct posting avoids LinkedIn's strict API access  
✅ **No bans** - Manual posting is 100% compliant  
✅ **Full control** - Review before posting  
✅ **Free** - No paid services  
✅ **Simple** - 30 seconds per post  

---

## 📝 Portfolio Value

This project demonstrates:
- **Node.js** backend development
- **Puppeteer** for image generation
- **Cron scheduling** for automation
- **JSON data management**
- **Modular architecture**
- **Practical problem-solving**

Perfect for your MSc Software Engineering portfolio!

---

## 🤝 Contributing

Feel free to fork, improve, and submit PRs!

## 📝 License

MIT License - Free to use for personal and commercial projects.

---

## 👨‍💻 Author

**Syed Fraz Ali**  
MSc Software Engineering Student  
[LinkedIn](https://linkedin.com/in/syedfrazali) | [GitHub](https://github.com/SyedFrazAli)

---

**🚀 Star this repo if you find it useful!**
