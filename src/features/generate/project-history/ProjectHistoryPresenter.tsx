import React, { useEffect, useState } from "react";
import ProjectHistoryView from "./ProjectHistoryView";
import { useDisclosure } from "@nextui-org/react";
import ImageModal from "../../ui/ImageModal";
import { deleteHistoryImageDataByURL, getHistoryImageData } from "../../models/firebaseModel";

// 定义接口类型
interface ImageType {
  src: string;
}

const ProjectHistory: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageList, setImageList] = useState<ImageType[]>([]);

  const handleDelete = () => {
    if (selectedImage) {
      deleteHistoryImageDataByURL(selectedImage)
        .then(() => {
          // 删除后更新列表
          setImageList((prevList) => prevList.filter((image) => image.src !== selectedImage));
          setSelectedImage(null);
          onClose();
        })
        .catch((error) => console.error("Failed to delete image:", error));
    }
  };

  const openModal = (imageSrc: string) => {
    console.log("Open modal with image: ", imageSrc);
    setSelectedImage(imageSrc);
    onOpen();
  };

  useEffect(() => {
    getHistoryImageData(setImageList);
  }, []);

  return (
    <div className="h-full overflow-auto">
      <ProjectHistoryView imageList={imageList} openModal={openModal} />
      <ImageModal
        isOpen={isOpen}
        onClose={onClose}
        imageSrc={selectedImage}
        onDelete={handleDelete}
        showDeleteButton={true}
      />
    </div>
  );
};

export default ProjectHistory;
