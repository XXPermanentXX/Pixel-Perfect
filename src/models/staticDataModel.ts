
import { AspectRatio, Prompt, StyleItem } from "./types";
import { feature01, feature02, feature03, feature04, feature05, fathaah, image1, image2, image3, image4, image5, image6, image7, image8, realisticStyle, cartoonStyle, cinematicStyle, zake } from "../assets";


// List of images for the carousel
const carouselImages = [image1, image2, image3, image4, image5, image6, image7, image8];

// Data for the feature cards and video card
const featureCards = [
  {
    type: "card",
    imageUrl: feature01,
    title: "Product scene change",
    description: "PixelPerfect automatically detects the objects in the photo, plus it's 2x more accurate than similar tools.",
    imageOnLeft: true,
  },
  {
    type: "card",
    imageUrl: feature02,
    title: "Realistic fashion models & poses",
    description: "Besides generated models and environments, our solution produces consistent results with perfect lighting.",
    imageOnLeft: false,
  },
  {
    type: "card",
    imageUrl: feature03,
    title: "Adjust object to any position",
    description: "Move object to any position within the frame, and generate images for multiple use scenarios.",
    imageOnLeft: true,
  },
  {
    type: "card",
    imageUrl: feature04,
    title: "Refine details with a brush",
    description: "Instantly adjust background and product details. With a swipe of your fingertip, you have total control of the results.",
    imageOnLeft: false,
  },
  {
    type: "video",
    videoUrl: feature05,
    title: "Upscale your work",
    description: "When you are satisfied with the results, upscale the images up to 8K to maintain the sharp details.",
    videoOnLeft: true,
  },
];


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

export { STYLE_LIST, ASPECT_RATIO_LIST, INITIAL_PROMPT, carouselImages,featureCards };