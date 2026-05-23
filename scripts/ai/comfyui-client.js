import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMFYUI_URL = process.env.COMFYUI_URL || 'http://127.0.0.1:8188';

/**
 * Loads the Ernie Image Turbo workflow template and injects the prompt.
 * The workflow JSON is stored as a constant (you can also read from file).
 */
const getWorkflowTemplate = () => {
  const workflowPath = path.join(__dirname, 'ernie-image-turbo-workflow.json');
  const workflowData = fs.readFileSync(workflowPath, 'utf-8');
  return JSON.parse(workflowData);
};

/**
 * Updates the prompt text in the workflow.
 * Finds the first CLIPTextEncode node (node 1) and updates its prompt.
 */
function setPrompt(workflow, promptText) {
  // Node 108 is the positive CLIPTextEncode in your specific workflow
  if (workflow["108"]) {
    workflow["108"].inputs.text = promptText;
  } else {
    throw new Error('CLIPTextEncode node (108) not found in workflow');
  }
  return workflow;
}

/**
 * Submit workflow to ComfyUI and wait for result.
 * Returns the generated image as a Buffer.
 */
async function generateWithComfyUI(prompt, options = {}) {
  const { width = 1376, height = 768, steps = 8, seed = Math.floor(Math.random() * 1000000000) } = options;

// 1. Load & prepare workflow
  let workflow = getWorkflowTemplate();
  workflow = setPrompt(workflow, prompt);

// 2. Override dimensions in EmptyFlux2LatentImage (Node 104)
  if (workflow["104"]) {
    workflow["104"].inputs.width = width;
    workflow["104"].inputs.height = height;
  }

// 3. Override seed and steps in KSampler (Node 107)
  if (workflow["107"]) {
    workflow["107"].inputs.seed = seed;
    workflow["107"].inputs.steps = steps;
  }

// 4. Submit
  let promptId;
  try {
    const submitRes = await axios.post(`${COMFYUI_URL}/prompt`, { prompt: workflow });
    promptId = submitRes.data.prompt_id;
    console.log('✅ Workflow submitted, prompt ID:', promptId);
  } catch (error) {
    console.error('❌ Error submitting workflow to ComfyUI:', error.message);
    if (error.response) {
      console.error('ComfyUI Response:', error.response.data);
    }
    throw error;
  }

// 5. Poll for completion
  let imageData = null;
  let attempts = 0;
  const maxAttempts = 60; // 60 seconds timeout
  
  while (attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const historyRes = await axios.get(`${COMFYUI_URL}/history/${promptId}`);
    const history = historyRes.data;
    
    if (history[promptId] && history[promptId].outputs) {
      // Find the SaveImage node output (Node 73 dynamically)
      const outputs = history[promptId].outputs;
      for (const nodeId in outputs) {
        if (outputs[nodeId].images) {
          const image = outputs[nodeId].images[0];
          // Fetch the actual image file
          const imgRes = await axios.get(
            `${COMFYUI_URL}/view?filename=${image.filename}&subfolder=${image.subfolder}&type=${image.type}`,
            { responseType: 'arraybuffer' }
          );
          imageData = Buffer.from(imgRes.data, 'binary');
          break;
        }
      }
      if (imageData) break;
    }
    attempts++;
  }

  if (!imageData) throw new Error('ComfyUI generation timed out');
  return imageData;
}

/**
 * Exported function that matches the existing `generateImage` signature:
 * returns base64 string (data:image/png;base64,...)
 */
export async function generateImage(prompt, options = {}) {
  console.log('🎨 Generating image with local ComfyUI (Ernie Image Turbo)...');
  const imageBuffer = await generateWithComfyUI(prompt, options);
  const base64 = imageBuffer.toString('base64');
  console.log('✅ Image generated via ComfyUI');
  return `data:image/png;base64,${base64}`;
}

export async function checkConnection() {
  // Check if ComfyUI is reachable
  try {
    await axios.get(`${COMFYUI_URL}/system_stats`);
    return true;
  } catch {
    return false;
  }
}