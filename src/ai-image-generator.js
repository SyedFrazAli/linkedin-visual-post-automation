import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Generate AI background image using AI Horde (FREE, no API key needed)
 * Falls back to gradient if generation fails
 */
export async function generateAIBackground(prompt, outputPath) {
  try {
    console.log(`🎨 Generating AI image for: "${prompt}"`);

    // Clean and enhance the prompt for professional visuals
    const enhancedPrompt = `professional tech illustration, ${prompt}, modern design, clean, minimalist, gradient background, high quality, digital art, abstract, professional, corporate style`;

    // Step 1: Submit generation request to AI Horde
    const submitResponse = await axios.post(
      'https://aihorde.net/api/v2/generate/async',
      {
        prompt: enhancedPrompt,
        params: {
          steps: 25,
          width: 1200,
          height: 627,
          cfg_scale: 7.5,
          sampler_name: 'k_euler',
          n: 1
        },
        nsfw: false,
        trusted_workers: true,
     },
      {
        headers: {
          'apikey': '0000000000', // Anonymous key - completely free
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );

    const jobId = submitResponse.data.id;
    console.log(`⏳ Job submitted to AI Horde (ID: ${jobId}). Waiting for generation...`);

    // Step 2: Poll for completion (AI Horde is queue-based)
    let attempts = 0;
    const maxAttempts = 30; // 30 attempts = ~1 minute max wait
    
    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      
      const statusResponse = await axios.get(
        `https://aihorde.net/api/v2/generate/check/${jobId}`,
        { timeout: 5000 }
      );

      if (statusResponse.data.done) {
        // Step 3: Get the generated image
        const statusData = await axios.get(
          `https://aihorde.net/api/v2/generate/status/${jobId}`,
          { timeout: 10000 }
        );

        if (statusData.data.generations && statusData.data.generations.length > 0) {
          const imageUrl = statusData.data.generations[0].img;
          
          // Download the image
          const imageResponse = await axios.get(imageUrl, {
            responseType: 'arraybuffer',
            timeout: 15000
          });

          fs.writeFileSync(outputPath, imageResponse.data);
          console.log(`✅ AI image saved: ${outputPath}`);
          return true;
        }
      }

      attempts++;
      if (attempts % 5 === 0) {
        console.log(`⏳ Still waiting... (${attempts}/${maxAttempts})`);
      }
    }

    throw new Error('AI Horde generation timeout - queue too long');

  } catch (error) {
    console.error(`❌ AI image generation failed: ${error.message}`);
    console.log('📝 Falling back to gradient background...');
    return false;
  }
}

/**
 * Generate with Hugging Face Inference API (fallback option)
 * Free tier with rate limits
 */
export async function generateWithHuggingFace(prompt, outputPath) {
  try {
    console.log(`🎨 Trying Hugging Face API for: "${prompt}"`);
    
    const enhancedPrompt = `professional tech illustration, ${prompt}, modern design, clean, minimalist, gradient background, high quality, digital art`;

    const response = await axios.post(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1',
      { inputs: enhancedPrompt },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer',
        timeout: 30000
      }
    );

    fs.writeFileSync(outputPath, response.data);
    console.log(`✅ AI image saved (Hugging Face): ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Hugging Face generation failed: ${error.message}`);
    return false;
  }
}
