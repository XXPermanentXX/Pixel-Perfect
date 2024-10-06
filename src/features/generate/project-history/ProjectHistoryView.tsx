import React from "react";
import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import DownloadButton from "@/ui/DownloadButton";

type ImageType = {
  src: string;
  id: string;
};

type ProjectHistoryViewProps = {
  imageList: ImageType[];
  openModal: (imageUrl: string) => void;
};

const mockData: ImageType[] = [
  { src: "https://via.placeholder.com/200", id: "1" },
  { src: "https://via.placeholder.com/201", id: "2" },
  { src: "https://via.placeholder.com/202", id: "3" },
];

const ProjectHistoryView: React.FC<ProjectHistoryViewProps> = ({ imageList = mockData, openModal }) => {
  return (
    <div className="ml-20">
      <h2 className="mb-8 mt-24 text-6xl text-white">My photos</h2>
      {imageList && imageList.length > 0 ? (
        <div className="mr-20 flex flex-wrap gap-[15px]">
          {imageList.map((image) => (
            <Card
              key={image.id}
              isPressable
              onPress={() => openModal(image.src)}
              isHoverable
              className="group h-[200px] w-[200px] justify-center bg-transparent shadow-none"
            >
              <Image
                isZoomed
                src={image.src}
                alt={"history generated photo"}
                className="h-[200px] w-[200px] object-cover"
              />
              <DownloadButton imageUrl={image.src} />
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-white">No photos available</p>
      )}
    </div>
  );
};

export default ProjectHistoryView;
