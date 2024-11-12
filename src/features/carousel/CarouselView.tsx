import {motion} from "framer-motion"

const CarouselView({ images, animationDuration, carouselIndex, positions, imageVariants, onImageClick }) => {
  return (
    <div className="relativee flex h-full items-center justify-center">
      {images.map((image,imageIndex) => {
        const index = (carouselIndex + image + 3) % image.length;

        const initialPosition = index <= positions.length -1 ? "center" : "leftHidden";
        const animatePosition = index <= positions.length -1 ? positions[index] : positions[0];

        return (
          <motion.img
            key={`image-${imageIndex}`}
            src={image}
            alt={`carousel-image-${imageIndex}`}
            className="absolute h-full cursor-pointer rounded-[20px object-cover"
            initial={initialPosition}
            animate={imageVariants}
            transition={{ duration: animationDuration / 1000}}
            onClick={()=> onImageClick(imageIndex)}
          />
        )
      })}
    </div>
  );
}

export default CarouselView
