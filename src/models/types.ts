export interface StyleItem {
  id: string;
  name: string;
  thumbnail: string;
  keywords: string;
}

export interface ProductsItem {
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

export interface GeneratedImage {
  id: string;
  date: Date;
  url: string;
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

export interface formState {
  username: string;
  password: string;
}

export interface AuthState {
  adminKey: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null | undefined;
}

export interface FormInputProps {
  type?: string,
  label:string,
  value:string,
  onValueChange: any;
  [key: string]: any;
  errorMessage: string;
  items: string[];
}


export type Status = "idle" | "loading" | "succeeded" | "failed";