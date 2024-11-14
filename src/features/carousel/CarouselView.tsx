import { motion } from "framer-motion";

interface CarouselViewProps {
  images: string[];
  animationDuration: number;
  carouselIndex: number;
  positions: string[];
  imageVariants: any; 
  onImageClick: (index: number) => void;
}

const CarouselView: React.FC<CarouselViewProps> = ({ images, animationDuration, carouselIndex, positions, imageVariants, onImageClick }) => {
  return (
    <div className="relative flex h-full items-center justify-center">
      {images.map((image, imageIndex) => {
        const index = (carouselIndex + imageIndex + 3) % images.length;

        const initialPosition = index <= positions.length - 1 ? "center" : "leftHidden";
        const animatePosition = index <= positions.length - 1 ? positions[index] : positions[0];

        return (
          <motion.img
            key={`image-${imageIndex}`}
            src={image}
            alt={`carousel-image-${imageIndex}`}
            className="absolute h-full cursor-pointer rounded-[20px] object-cover"
            initial={initialPosition}
            animate={animatePosition}
            variants={imageVariants}
            transition={{ duration: animationDuration / 1000 }}
            onClick={() => onImageClick(imageIndex)}
          />
        );
      })}
    </div>
  );
};
export default CarouselView;
