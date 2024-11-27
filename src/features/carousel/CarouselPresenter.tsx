import CarouselView from "./CarouselView"
import { useEffect, useState } from "react";

// Function to calculate the steps needed to move from current index to target index

const calculateSteps = (currentIndex: number,targetIndex :number, carouselImagesLength:number) => {
  const stepsRight = (targetIndex - currentIndex + carouselImagesLength) % carouselImagesLength;
  const stepsLeft = (currentIndex - targetIndex + carouselImagesLength) % carouselImagesLength;
  return stepsRight <= stepsLeft ? 1 : -1;
}

// Custom hook to manage carousel index and automatic cycling
const useCarouselIndex = (length: number,delay: number,animationDuration:number) => {
  // State to track current index of the visible image
  const [index,setIndex] = useState(0);
  // State to store the index of the clicked image
  const [targetIndex,setTargetIndex] = useState<number | null>(null);
  // State to control automatic cycling
  const [autoCycle,setAutoCycle] = useState(true);

  // Function to update the current index based on the step
  const updateIndex = (step:number) => {
    setIndex((prevIndex) => {
      const newIndex = (prevIndex + step + length) % length;
      return newIndex;
    })
  }

  // Effect to handle automatic cycling and image click events

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined ;
    if (autoCycle) {
      // Automatically cycle to the next image
      interval = setInterval(() => updateIndex(1), delay);
    } else if (targetIndex !== null && index !== targetIndex) {
      // Move towards the clicked image
      interval = setInterval(() => {
        updateIndex(calculateSteps(index, targetIndex, length));
      }, animationDuration * 0.7);
    }

    // Reset states when the target index is reached
    if(index === targetIndex) {
      setAutoCycle(true);
      setTargetIndex(null)
    }
    return () => clearInterval(interval)
  },[autoCycle,targetIndex,index,length,delay,animationDuration,updateIndex])

  //Function to handle image click event 
  const handleImageClick = (clickedIndex: number) => {
    if (index !== clickedIndex) {
      // Set the clicked index as the target index and stop automatic cycling
      setTargetIndex(clickedIndex);
      setAutoCycle(false);
      updateIndex(calculateSteps(index,clickedIndex,length))
    }
  };
  return {index, handleImageClick};
}


/**
 * A Carousel component that cycles through images with animations.
 * @param {Array} carouselImages - An array of image URLs to display in the carousel.
 * @param {number} animationDuration - Duration of the animation between slides in milliseconds.
 * @param {number} delay - Delay between automatically cycling to the next image in milliseconds.
 */
interface CarouselProps {
  carouselImages: string[];
  animationDuration: number;
  delay: number;
}


const Carousel = ({ carouselImages, animationDuration, delay }: CarouselProps) => {
  // Define the positions of the images in the carousel.
  const positions = ["leftHidden", "leftFar", "leftNear", "center", "rightNear", "rightFar", "rightHidden"];

  // Define the variants for animating images based on their position.
  const imageVariants = {
    leftHidden: { x: "-95%", scale: 0.3, zIndex: 1, opacity: "0%" },
    leftFar: { x: "-163%", scale: 0.5, zIndex: 2, opacity: "62%" },
    leftNear: { x: "-95%", scale: 0.7, zIndex: 3, opacity: "86%" },
    center: { x: "0%", scale: 1, zIndex: 4, opacity: "100%" },
    rightNear: { x: "95%", scale: 0.7, zIndex: 3, opacity: "86%" },
    rightFar: { x: "163%", scale: 0.5, zIndex: 2, opacity: "62%" },
    rightHidden: { x: "95%", scale: 0.3, zIndex: 1, opacity: "0%" },
  };
  const {handleImageClick,index} = useCarouselIndex(carouselImages.length,delay,animationDuration)
  // Render the CarouselView component, passing all necessary props.
  return <CarouselView images={carouselImages} animationDuration={animationDuration} carouselIndex={(carouselImages.length - index) % carouselImages.length} positions={positions} imageVariants={imageVariants} onImageClick={handleImageClick} />;
}
export default Carousel