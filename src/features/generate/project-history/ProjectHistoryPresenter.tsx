import React, { useEffect, useState } from "react";
import ProjectHistoryView from "@/features/generate/project-history/ProjectHistoryView";
import { useDisclosure } from "@nextui-org/react";
import ImageModal from "@/ui/ImageModal";
import { deleteHistoryImageDataByURL, getHistoryImageData } from "@/models/history/historyData";
import { useSelector } from "react-redux";
import { RootState } from "@/provider";


// define the interface type
interface ImageType {
  src: string;
  id: string;
}

const ProjectHistory: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [imageList, setImageList] = useState<ImageType[]>([]);
  const user = useSelector((state:RootState) => state.auth.user)

  const handleDelete = () => {
    if (selectedImage) {
      deleteHistoryImageDataByURL(selectedImage,user?.userId || "")
        .then(() => {
          // update the image list after deleting the image
          setImageList((prevList) => prevList.filter((image) => image.src !== selectedImage));
          setSelectedImage('');
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
    getHistoryImageData(setImageList,user?.userId || '');
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
