export interface StyleItem {
  id: string;
  name: string;
  thumbnail: string;
  keywords: string;
}

export interface ModelItem {
  id: string;
  name: string;
  thumbnail: string;
  lora_model_name: string;
  product_type: string; 
  trigger_word: string;
  user_id: string;
}

export interface AspectRatio {
  id: string;
  title: string;
}

export interface Prompt {
  prompt: string;
  keywords: string[];
  aspectRatio: string;
  type: string;
  model: string;
  triggerWord: string;
  filename: string;
  influence: number;
  generationSeed: string;
  diffusionSteps: number;
  refine: boolean;
}

export type Status = "idle" | "loading" | "succeeded" | "failed";