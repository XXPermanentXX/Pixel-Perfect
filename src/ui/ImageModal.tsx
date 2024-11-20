import React, { useState, useEffect } from "react";
import { Button, Image, Link, Modal, ModalContent, ModalFooter } from "@nextui-org/react";
import { downloadIcon, deleteIcon } from "../assets";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  onDelete?: () => void;
  showDeleteButton?: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageSrc, onDelete = () => {}, showDeleteButton }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<"lg" | "5xl" | "4xl" | "3xl" | "2xl" | "xl" | "xs" | "sm" | "md" | "full" | undefined>("lg");

  useEffect(() => {
    const updateModalSize = () => {
      const width = window.innerWidth;
      if (width > 2500) {
        setModalSize("5xl");
      } else if (width > 2300) {
        setModalSize("4xl");
      } else if (width > 2100) {
        setModalSize("3xl");
      } else if (width > 1900) {
        setModalSize("2xl");
      } else if (width > 1700) {
        setModalSize("xl");
      } else {
        setModalSize("lg");
      }
    };

    updateModalSize(); // Set initial size
    window.addEventListener("resize", updateModalSize); // Add event listener for resize

    return () => {
      window.removeEventListener("resize", updateModalSize); // Cleanup event listener on unmount
    };
  }, []);

  const handleDelete = () => {
    // Add your delete logic here
    onDelete();
    setDeleteModalOpen(false);
    onClose();
  };

  return (
    <>
      <Modal
        size={modalSize}
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          backdrop: ["bg-black bg-opacity-80 backdrop-blur-md"],
        }}
      >
        <ModalContent className="flex items-center justify-center bg-transparent shadow-none">
          <Image src={imageSrc} alt="Selected" />
          <div className="flex items-center justify-center gap-8 pt-4">
            <Button variant="bordered" as={Link} href={imageSrc} download={"generated_image"} startContent={<img src={downloadIcon} alt="Download" className="h-6 w-6" />} className="text-white">
              Download
            </Button>
            {showDeleteButton && (
              <Button variant="bordered" onPress={() => setDeleteModalOpen(true)} startContent={<img src={deleteIcon} alt="Delete" className="h-6 w-6" />} className="text-white">
                Delete
              </Button>
            )}
          </div>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        hideCloseButton={true}
        classNames={{
          backdrop: ["bg-black bg-opacity-80 backdrop-blur-md"],
        }}
      >
        <ModalContent className="bg-dark-bg p-6 text-center">
          <p>Are you sure to delete this image?</p>
          <ModalFooter className="flex justify-center gap-6 pt-6">
            <Button variant="bordered" color="danger" onClick={handleDelete} className="text-white">
              Delete
            </Button>
            <Button variant="bordered" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageModal;
