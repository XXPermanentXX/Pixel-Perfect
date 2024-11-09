import { AspectRatio, Prompt, StyleItem } from "./types";
import { realisticStyle, cartoonStyle, cinematicStyle } from "@/assets";

const STYLE_LIST: StyleItem[] = [
  {
    id: "realistic",
    name: "Realistic",
    thumbnail: realisticStyle,
    keywords: "4k, hdr, realistic, high resolution, <lora:MG52:0.8>",
  },
  {
    id: "cartoon",
    name: "Cartoon",
    thumbnail: cartoonStyle,
    keywords: "(Pixar:1.3), 4k, disney, animation, whimsical, 3D, (disney pixar:1.3), high details, cartoon",
  },
  {
    id: "cinematic",
    name: "Cinematic",
    thumbnail: cinematicStyle,
    keywords: "good lighting, studio, (photoshoot:1.4), professional, 4k",
  },
];

const ASPECT_RATIO_LIST: AspectRatio[] = [
  {
    id: "1:1",
    title: "1:1",
  },
  {
    id: "4:3",
    title: "4:3",
  },
  {
    id: "16:9",
    title: "16:9",
  },
];

const INITIAL_PROMPT: Prompt = {
  prompt: "",
  keywords: ["4k", " hdr", " realistic", " high resolution", " <lora:MG52:0.8>"],
  aspectRatio: "",
  type: "lora",
  model: "",
  triggerWord: "",
  filename: "",
  influence: 0.5,
  generationSeed: "",
  diffusionSteps: 20,
  refine: true,
};

export { STYLE_LIST, ASPECT_RATIO_LIST, INITIAL_PROMPT };