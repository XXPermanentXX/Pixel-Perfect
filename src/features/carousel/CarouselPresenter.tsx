import { carouselImages } from "@/models/staticDataModel"
import CarouselView from "./CarouselView"
import { useEffect, useState } from "react";

// Function to calculate the steps needed to move from current index to target index

const calculatesteps = (currentIndex,targetIndex, carouselImagesLength) => {
  const stepsRight = (targetIndex - currentIndex + carouselImagesLength) % carouselImagesLength;
  const setpsLigth = (currentIndex - targetIndex + carouselImagesLength) % carouselImagesLength;
  return stepsRight <= setpsLigth ? 1 : -1;
}

// Custom hook to manage carousel index and automatic cycling
const useCarouselIndex = (length,delay,animationDuration) => {
  // State to track current index of the visible image
  const [index,setIndex] = useState(0);
  // State to store the index of the clicked image
  const [targetIndex,setTargetIndex] = useState(null);
  // State to control automatic cycling
  const [autoCycle,setAutoCyle] = useState(true);

  // Function to update the current index based on the step
  const updateIndex = (step) => {
    setIndex((prevIndex) => {
      const newIndex = (prevIndex + step + length) % length;
      console.log(`Updating index from ${prevIndex} to ${newIndex}`);
      return newIndex;
    })
  }

  // Effect to handle automatic cycling and image click events

  useEffect(() => {
    let interval;
    if (autoCycle) {
      console.log("useEffect is running", {autoCycle,index,targetIndex});
      //Automatically cycle to the next image
      interval = setInterval(() => {
        updateIndex(calculatesteps(index,targetIndex,length));
      }, animationDuration * 0.7)
    }

    // Reset states when the target index is reached
    if(index === targetIndex) {
      setAutoCyle(true);
      setTargetIndex(null)
    }
    return () => clearInterval(interval)
  },[autoCycle,targetIndex,index,length,animationDuration])

  //Function to handle image click event 
  const handleImageClick = (clickedIndex) => {
    if (index !== clickedIndex) {
      // Set the clicked index as the target index and stop automatic cycling
      setTargetIndex(clickedIndex);
      setAutoCyle(false);
      updateIndex(calculatesteps(index,clickedIndex,length))
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
const Carousel = () => {
  // Define the positions of the images in the carousel.
  const positions = ["lefthidden","leftFar","leftNear","center","rightNear","rightFar","rightHidden"];

  // Define the variants for animating images based on their position.
  const imageVariants = {
    leftHiddent: {x: '-95%',scale:0.3,zIndex:1,opacity:"0%"},
    leftFar: {x:'-163%',scale:0.5,zIndex: 2,opcity: "62%"},
    
  }
  // Render the CarouselView component, passing all necessary props.
  return <CarouselView images={carouselImages} animationDuration={animationDuration} carouselIndex={(carouselImages.length - index) % carouselImages.length} positions={positions} imageVariants={imageVariants} onImageClick={handleImageClick}/>
}
export default Carousel
