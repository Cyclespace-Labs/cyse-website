import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const COMFYUI_URL = process.env.COMFYUI_URL || 'http://127.0.0.1:8000';

async function checkModels() {
  console.log('🔍 Checking available models in ComfyUI...\n');
  
  try {
    // Get object info to see available nodes and their inputs
    const objectInfo = await axios.get(`${COMFYUI_URL}/object_info`);
    const checkpointLoader = objectInfo.data.CheckpointLoaderSimple;
    
    if (checkpointLoader && checkpointLoader.input.required && checkpointLoader.input.required.ckpt_name) {
      const availableModels = checkpointLoader.input.required.ckpt_name[0];
      console.log('✅ Available checkpoint models:');
      availableModels.forEach(model => console.log(`   - ${model}`));
    } else {
      console.log('❌ Could not retrieve model list');
    }
  } catch (error) {
    console.error('❌ Error checking models:', error.message);
  }
}

checkModels();
