import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Free AI Image Generation APIs
const AI_PROVIDERS = {
  // Hugging Face - Completely FREE, no credit card required
  HUGGINGFACE: {
    url: 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1',
    method: 'POST',
    requiresToken: true, // Free token from huggingface.co
  },
  
  // Pollinations.AI - Completely FREE, no API key needed
  POLLINATIONS: {
    url: 'https://image.pollinations.ai/prompt/',
    method: 'GET',
    requiresToken: false,
  },
};

/**
 * Generate AI background image using Pollinations.AI (FREE, no API key needed)
 */
export async function generateAIBackground(prompt, outputPath) {
  try {
    console.log(`🎨 Generating AI image for: "${prompt}"`);
    
    // Clean and enhance the prompt for professional visuals
    const enhancedPrompt = `professional tech illustration, ${prompt}, modern design, clean, minimalist, gradient background, high quality, digital art`;
    
    // Use Pollinations.AI - completely free, no API key needed
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?width=1200&height=627&nologo=true&enhance=true`;
    
    // Download the image
    const response = await axios({
      url: imageUrl,
      method: 'GET',
      responseType: 'arraybuffer',
      timeout: 60000, // 60 second timeout
    });
    
    // Save the image
    fs.writeFileSync(outputPath, response.data);
    
    console.log(`✅ AI image saved: ${outputPath}`);
    return outputPath;
    
  } catch (error) {
    console.error(`❌ AI image generation failed: ${error.message}`);
    console.log('📝 Falling back to gradient background...');
    return null;
  }
}

/**
 * Alternative: Generate using Hugging Face (requires free API token)
 */
export async function generateWithHuggingFace(prompt, outputPath, apiToken) {
  try {
    if (!apiToken) {
      throw new Error('Hugging Face API token required. Get free token at https://huggingface.co/settings/tokens');
    }
    
    const response = await axios({
      url: AI_PROVIDERS.HUGGINGFACE.url,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        inputs: `professional tech illustration, ${prompt}, modern, clean, high quality`,
      },
      responseType: 'arraybuffer',
      timeout: 60000,
    });
    
    fs.writeFileSync(outputPath, response.data);
    console.log(`✅ AI image saved: ${outputPath}`);
    return outputPath;
    
  } catch (error) {
    console.error(`❌ Hugging Face generation failed: ${error.message}`);
    return null;
  }
}

/**
 * Get AI image prompts based on post content
 */
export function getImagePrompt(post) {
  const prompts = {
    'architecture': 'software architecture diagram, system design, cloud infrastructure',
    'clean code': 'code editor, programming, clean syntax highlighting',
    'microservices': 'distributed systems, microservices architecture, containers',
    'devops': 'CI/CD pipeline, automation, deployment process',
    'design patterns': 'software design patterns, object oriented programming',
  };
  
  // Match keywords in title
  const title = post.title.toLowerCase();
  for (const [keyword, prompt] of Object.entries(prompts)) {
    if (title.includes(keyword)) {
      return prompt;
    }
  }
  
  // Default prompt based on title
  return `${post.title}, technology, software development`;
}
