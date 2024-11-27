import { AspectRatio, ProductsItem, Prompt, StyleItem } from "./types";

// Predefined company sizes for dropdowns or select input in forms.
const companySizes = ["Self employed", "2-10 employees", "11-50 employees", "51-200 employees", "201-500 employees", "500+ employees"];

// Predefined industries for dropdowns or select input in forms.
const industries = [
  "Accommodation",
  "Administrative",
  "Construction",
  "Consumer Services",
  "Education",
  "Entertainment",
  "Financial",
  "Government",
  "Holding Companies",
  "Health Care",
  "Manufacturing",
  "Media",
  "Real Estate",
  "Retail",
  "Technology",
  "Transportation",
  "Utilities",
  "Wholesale",
  "Other",
];

import {
  feature01,
  feature02,
  feature03,
  feature04,
  feature05,
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  realisticStyle,
  cartoonStyle,
  cinematicStyle,
  shiqi,
  yizhang,
  changrong,
} from "../assets";

// List of images for the carousel
const carouselImages = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
];

// Data for the feature cards and video card
const featureCards = [
  {
    type: "card",
    imageUrl: feature01,
    title: "Product scene change",
    description:
      "PixelPerfect automatically detects the objects in the photo, plus it's 2x more accurate than similar tools.",
    imageOnLeft: true,
  },
  {
    type: "card",
    imageUrl: feature02,
    title: "Realistic fashion models & poses",
    description:
      "Besides generated models and environments, our solution produces consistent results with perfect lighting.",
    imageOnLeft: false,
  },
  {
    type: "card",
    imageUrl: feature03,
    title: "Adjust object to any position",
    description:
      "Move object to any position within the frame, and generate images for multiple use scenarios.",
    imageOnLeft: true,
  },
  {
    type: "card",
    imageUrl: feature04,
    title: "Refine details with a brush",
    description:
      "Instantly adjust background and product details. With a swipe of your fingertip, you have total control of the results.",
    imageOnLeft: false,
  },
  {
    type: "video",
    videoUrl: feature05,
    title: "Upscale your work",
    description:
      "When you are satisfied with the results, upscale the images up to 8K to maintain the sharp details.",
    videoOnLeft: true,
  },
];

// Data for the team members
const teamMembers = [
  {
    name: "Shiqi Gong",
    role: "Co-founder",
    image: shiqi,
    alt: "Shiqi Gong",
  },
  {
    name: "Yizhang Tan",
    role: "Co-founder",
    image: yizhang,
    alt: "Yizhang Tan",
  },
  {
    name: "Changrong Li",
    role: "Co-founder",
    image: changrong,
    alt: "Changrong Li",
  },
];
  // Mocking productList for demonstration purpose
  const PRODUCT_LIST: ProductsItem[] = [
    {
      id: "7b89ed7d-129b-4d35-a845-be0f2b08782f",
      lora_model_name: "lv-000009.safetensors",
      name: "Louis Vuitton Bag",
      product_type: "Ladies Bag",
      thumbnail:
        "https://pixelperfectstorage.blob.core.windows.net/thumbnails/lv_bag.png",
      trigger_word: "black lv bag",
      user_id: "admin",
    },
    {
      id: "7b89ed7d-129b-4d35-a745-be0ffb08582f",
      lora_model_name: "cro-000012.safetensors",
      name: "Croissant",
      product_type: "Croissant",
      thumbnail:
        "https://pixelperfectstorage.blob.core.windows.net/thumbnails/croissant.jpeg",
      trigger_word: "cro croissant",
      user_id: "admin",
    },
    {
      id: "7b89gf7d-129b-4d35-a745-be0ffb05682d",
      lora_model_name: "avr-000015.safetensors",
      name: "Apple Vision Pro",
      product_type: "VR Headset",
      thumbnail:
        "https://pixelperfectstorage.blob.core.windows.net/thumbnails/vison_pro.png",
      trigger_word: "avr Virtual Reality Headset",
      user_id: "admin",
    },
    {
      id: "7b89gf7d-129b-476y-a734-be0ffb051dl8",
      lora_model_name: "tbl-000042.safetensors",
      name: "Timberland Shoes",
      product_type: "Shoes",
      thumbnail:
        "https://pixelperfectstorage.blob.core.windows.net/thumbnails/timberland.png",
      trigger_word: "tbl Timberland boots",
      user_id: "admin",
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
    keywords:
      "(Pixar:1.3), 4k, disney, animation, whimsical, 3D, (disney pixar:1.3), high details, cartoon",
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
  keywords: [
    "4k",
    " hdr",
    " realistic",
    " high resolution",
    " <lora:MG52:0.8>",
  ],
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

const AVATAR_URLS = [
  "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  "https://i.pravatar.cc/150?u=a04258a2462d826712d",
  "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  "https://i.pravatar.cc/150?u=a04258114e29026302d",
  "https://i.pravatar.cc/150?u=a04258114e29026702d",
  "https://i.pravatar.cc/150?u=a04258114e29026708c"
];

const ADJECTIVES = [
  'Happy', 'Fast', 'Creative', 'Brave', 'Silent', 'Clever', 'Bright', 'Mighty', 'Gentle',
  'Fierce', 'Quiet', 'Curious', 'Loyal', 'Bold', 'Fearless', 'Friendly', 'Graceful',
  'Swift', 'Shiny', 'Wild', 'Playful', 'Calm', 'Daring', 'Dreamy'
];

const ANIMALS = [
  'Tiger', 'Whale', 'Eagle', 'Lion', 'Bear', 'Fox', 'Wolf', 'Hawk', 'Falcon', 'Panda',
  'Dragon', 'Shark', 'Dolphin', 'Phoenix', 'Leopard', 'Falcon', 'Elephant', 'Cheetah',
  'Otter', 'Koala', 'Giraffe', 'Penguin', 'Zebra', 'Panther'
];

const RESET_MESSAGES = {
  succeeded: "Password reset email sent",
  failed: "Invalid email",
  wait: "Please wait a minute for another reset.",
  loading: "",
  idle: "",
  default: ""
};

export {
  AVATAR_URLS, ADJECTIVES, ANIMALS, RESET_MESSAGES,
  PRODUCT_LIST, 
  STYLE_LIST,
  ASPECT_RATIO_LIST,
  INITIAL_PROMPT,
  carouselImages,
  featureCards,
  teamMembers,
  companySizes,
  industries,
};
