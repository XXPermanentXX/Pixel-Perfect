import React from "react";
import { Card } from "@nextui-org/react";

interface FeatureVideoCardProps {
  videoUrl: string | undefined;
  title: string;
  description: string;
  videoOnLeft?: boolean; 
}

const FeatureVideoCard: React.FC<FeatureVideoCardProps> = ({ videoUrl, title, description, videoOnLeft = true }) => {
  return (
    <Card className={`flex bg-transparent ${videoOnLeft ? "flex-row" : "flex-row-reverse"} max-w-5xl gap-x-24 shadow-none`}>
      {/* Video ccontent */}
      <div className="flex w-1/2 justify-center">
        <div className="h-[320px] w-[460px] overflow-hidden rounded-[30px]">
          <video
            loop
            muted
            autoPlay
            className="h-full w-full"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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

export default FeatureVideoCard;
