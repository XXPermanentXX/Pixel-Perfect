import React from "react";
import { Card, Image } from "@nextui-org/react";

interface FeatureCardProps {
  imageUrl: string | undefined;
  title: string;
  description: string;
  imageOnLeft?: boolean; 
}

const FeatureCard: React.FC<FeatureCardProps> = ({ imageUrl, title, description, imageOnLeft = true }) => {
  return (
    <Card className={`flex bg-transparent ${imageOnLeft ? "flex-row" : "flex-row-reverse"} max-w-5xl gap-x-24 shadow-none`}>
      {/* Images content */}
      <div className="flex w-1/2 justify-center">
        <div className="h-[320px] w-[460px] overflow-hidden rounded-[30px]">
          <Image src={imageUrl} alt={title} className="h-full w-full object-cover object-center" />
        </div>
      </div>
      
      {/* Text content */}
      <div className="flex w-1/2 flex-col justify-center text-left">
        <h3 className="pb-8">{title}</h3>
        <h5 className="max-w-sm">{description}</h5>
      </div>
    </Card>
  );
};

export default FeatureCard;
