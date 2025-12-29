import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import { generateAIBackground } from './ai-image-generator.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function generateImages() {
  // Load post content
  const postsPath = path.join(__dirname, '../content/posts.json');
  const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));

  // Ensure output directory exists
  const outputDir = path.join(__dirname, '../output/images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(chalk.blue(`\n📸 Found ${posts.length} posts to generate\n`));

  // Generate AI background images first
  console.log(chalk.cyan('\n🎨 Generating AI background images...\n'));
  
  for (const post of posts) {
    if (post.status !== 'ready') continue;
    
    const bgImagePath = path.join(outputDir, `bg-${post.id}.png`);
    
    // Use aiPrompt from post data if available
    const prompt = post.aiPrompt || post.title;
    
    await generateAIBackground(prompt, bgImagePath);
  }

  // Now generate final images with text overlay using Puppeteer
  console.log(chalk.cyan('\n📝 Creating text overlays...\n'));
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 627 });

  for (const post of posts) {
    if (post.status !== 'ready') continue;

    console.log(chalk.yellow(`Generating: ${post.title}`));

    // Load HTML template
    const templatePath = path.join(__dirname, 'templates/post-template.html');
    let html = fs.readFileSync(templatePath, 'utf-8');

    // Replace placeholders
    html = html
      .replaceAll('{{TITLE}}', post.title)      .replaceAll('{{SUBTITLE}}', post.subtitle || '')
      .replaceAll('{{AUTHOR}}', post.author || 'Syed Fraz Ali')
      .replaceAll('{{COLOR}}', post.color || '#0A66C2');

    // Check if AI background image exists
    const bgImagePath = path.join(outputDir, `bg-${post.id}.png`);
    const hasBgImage = fs.existsSync(bgImagePath);
    
    if (hasBgImage) {
      // Read background image and convert to base64
      const bgImageBuffer = fs.readFileSync(bgImagePath);
      const bgImageBase64 = bgImageBuffer.toString('base64');
      
      // Inject background image into HTML
      html = html.replace(
        '<style>',
        `<style>
        body {
          background-image: url('data:image/png;base64,${bgImageBase64}') !important;
          background-size: cover !important;
          background-position: center !important;
        }
        .post-card {
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(10px) !important;
        }`
      );
    }

    // Generate image with retry logic
    let success = false;
    let retries = 3;
    
    while (!success && retries > 0) {
      try {
        await page.setContent(html, { 
          waitUntil: 'domcontentloaded',
          timeout: 60000
        });
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const imagePath = path.join(outputDir, `${post.id}.png`);
        await page.screenshot({ path: imagePath, type: 'png' });

        post.imagePath = imagePath;
        console.log(chalk.green(`✅ Saved: ${imagePath}`));
        success = true;
      } catch (error) {
        retries--;
        console.log(chalk.yellow(`⚠️  Retry ${3 - retries}/3 for ${post.title}`));
        if (retries === 0) {
          console.log(chalk.red(`❌ Failed to generate image for ${post.title}: ${error.message}`));
        }
      }
    }
  }

  await browser.close();

  // Update posts.json with image paths
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));

  console.log(chalk.green.bold('\n✅ All images generated successfully!\n'));
  console.log(chalk.blue('\n📄 Post descriptions are ready in content/posts.json'));
  console.log(chalk.blue('Copy the "description" field for your LinkedIn posts!\n'));
}
