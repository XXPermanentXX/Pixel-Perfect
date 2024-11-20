import React from "react";
import { Modal,ModalBody,ModalFooter, Button } from "@nextui-org/react";

// define the props type
interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string | null;
  onDelete: () => void;
  showDeleteButton: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageSrc, onDelete, showDeleteButton }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeButton>
      <ModalBody>
        {imageSrc ? (
          <img src={imageSrc} alt="Selected" className="w-full h-full object-cover" />
        ) : (
          <p>No image to display</p>
        )}
      </ModalBody>
      <ModalFooter>
        {showDeleteButton && (
          <Button color="danger" onClick={onDelete}>
            Delete
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default ImageModal;
