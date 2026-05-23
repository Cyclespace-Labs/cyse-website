import * as dotenv from 'dotenv';
import { generateImage as comfyGenerate, checkConnection as comfyCheck } from './ai/comfyui-client.js';

dotenv.config();

async function testComfyUI() {
  console.log('🧪 Testing ComfyUI Standalone...\n');
  
  // Check connection
  console.log('Step 1: Checking ComfyUI connection...');
  const isConnected = await comfyCheck();
  
  if (!isConnected) {
    console.log('❌ ComfyUI is not accessible.');
    console.log('🔗 ComfyUI URL:', process.env.COMFYUI_URL || 'http://127.0.0.1:8188');
    console.log('\n📋 Setup Instructions:');
    console.log('1. Install ComfyUI: https://github.com/comfyanonymous/ComfyUI');
    console.log('2. Download SDXL model to: ComfyUI/models/checkpoints/');
    console.log('3. Start server: python main.py --listen 127.0.0.1 --port 8188');
    process.exit(1);
  }
  
  console.log('✅ ComfyUI is accessible!\n');
  
  // Test image generation
  console.log('Step 2: Generating test image with ComfyUI...');
  const testPrompt = 'Professional news photography of a modern technology office, cinematic lighting, 16:9 aspect ratio, high detail, editorial style';
  
  try {
    const base64Image = await comfyGenerate(testPrompt);
    console.log('✅ Test image generated successfully via ComfyUI!');
    console.log('📏 Image size:', base64Image.length, 'characters (base64)');
    console.log('\n🎉 ComfyUI is working correctly!');
  } catch (error) {
    console.error('❌ ComfyUI generation failed:', error.message);
    console.error('\n🔍 Possible issues:');
    console.error('1. SDXL model not found in ComfyUI/models/checkpoints/');
    console.error('2. Workflow JSON format mismatch');
    console.error('3. ComfyUI server error (check server logs)');
    process.exit(1);
  }
}

testComfyUI();
