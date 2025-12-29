import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

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
      .replace('{{TITLE}}', post.title)
      .replace('{{SUBTITLE}}', post.subtitle || '')
      .replace('{{AUTHOR}}', post.author || 'Syed Fraz Ali')
      .replace('{{COLOR}}', post.color || '#0A66C2');

    // Generate image with retry logic
    let success = false;
    let retries = 3;
    
    while (!success && retries > 0) {
      try {
        await page.setContent(html, { 
          waitUntil: 'networkidle0',
          timeout: 60000  // Increased timeout to 60s
        });
        
        // Wait for content to fully render
        await page.waitForTimeout(2000);
        
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
}
