import React, { useEffect, useState } from "react";
import ProjectHistoryView from "./ProjectHistoryView";
import { useDisclosure } from "@nextui-org/react";
import ImageModal from "../../ui/ImageModal";
import { deleteHistoryImageDataByURL, getHistoryImageData } from "../../models/firebaseModel";

const ProjectHistory: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageList, setImageList] = useState<any[]>([]); // 使用 `any[]` 类型保持最初的灵活性

  const handleDelete = () => {
    if (selectedImage) {
      deleteHistoryImageDataByURL(selectedImage);
      setSelectedImage(null);
      onClose();
    }
  };

  const openModal = (imageSrc: string) => {
    console.log("Open modal with image: ", imageSrc);
    setSelectedImage(imageSrc);
    onOpen();
  };

  useEffect(() => {
    getHistoryImageData(setImageList);
    console.log(imageList);
  }, []);

  return (
    <div className="h-full overflow-auto">
      <ProjectHistoryView imageList={imageList} openModal={openModal} />
      <ImageModal isOpen={isOpen} onClose={onClose} imageSrc={selectedImage} onDelete={handleDelete} showDeleteButton={true} />
    </div>
  );
};

export default ProjectHistory;
