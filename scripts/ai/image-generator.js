import axios from 'axios';
import { generateImage as comfyGenerate, checkConnection as comfyCheck } from './comfyui-client.js';

// Pollinations.ai implementation (free SDXL API)
async function generateWithPollinations(prompt, options = {}) {
  const defaultOptions = {
    width: 1024,
    height: 576, // 16:9 aspect ratio for hero images
    seed: Math.floor(Math.random() * 1000000),
    model: 'flux',
    nologo: true,
    private: true,
    enhance: true,
    ...options
  };

  try {
    console.log('🎨 Generating image with Pollinations.ai (SDXL)...');
    console.log('Prompt:', prompt.substring(0, 100) + '...');
    
    // Build URL with parameters
    const encodedPrompt = encodeURIComponent(prompt);
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${defaultOptions.width}&height=${defaultOptions.height}&seed=${defaultOptions.seed}&model=${defaultOptions.model}&nologo=${defaultOptions.nologo}&private=${defaultOptions.private}&enhance=${defaultOptions.enhance}`;
    
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 60000 // 60 second timeout
    });

    if (response.data) {
      // Convert buffer to base64
      const base64 = Buffer.from(response.data, 'binary').toString('base64');
      console.log('✅ Image generated successfully via Pollinations.ai');
      return `data:image/png;base64,${base64}`;
    } else {
      throw new Error('No image data in response');
    }
  } catch (error) {
    console.error('❌ Error generating image with Pollinations.ai:', error.message);
    throw error;
  }
}

/**
 * Generate an image - tries ComfyUI first, falls back to Pollinations.ai
 * @param {string} prompt - The image generation prompt
 * @param {object} options - Generation options
 * @returns {Promise<string>} - Base64 encoded image
 */
export async function generateImage(prompt, options = {}) {
  const USE_COMFYUI = process.env.USE_COMFYUI === 'true';
  
  if (USE_COMFYUI) {
    try {
      return await comfyGenerate(prompt, options);
    } catch (error) {
      console.warn('⚠️  ComfyUI failed, falling back to Pollinations.ai:', error.message);
      return await generateWithPollinations(prompt, options);
    }
  } else {
    return await generateWithPollinations(prompt, options);
  }
}

/**
 * Check if image generation service is accessible
 * @returns {Promise<boolean>}
 */
export async function checkConnection() {
  const USE_COMFYUI = process.env.USE_COMFYUI === 'true';
  
  if (USE_COMFYUI) {
    try {
      const isAvailable = await comfyCheck();
      if (isAvailable) {
        console.log('✅ ComfyUI is accessible');
      } else {
        console.warn('⚠️  ComfyUI not accessible, will use Pollinations.ai');
      }
      return true; // Always return true since we have fallback
    } catch (error) {
      console.warn('⚠️  ComfyUI check failed, will use Pollinations.ai:', error.message);
      return true; // Still return true since we have fallback
    }
  } else {
    console.log('✅ Using Pollinations.ai (always available)');
    return true;
  }
}