import React from "react";
import { Modal, Button } from "@nextui-org/react";

// 定义组件 Props 的类型
interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string | null;
  onDelete: () => void;
  showDeleteButton: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageSrc, onDelete, showDeleteButton }) => {
  return (
    <Modal open={isOpen} onClose={onClose} closeButton>
      <Modal.Body>
        {imageSrc ? (
          <img src={imageSrc} alt="Selected" className="w-full h-full object-cover" />
        ) : (
          <p>No image to display</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        {showDeleteButton && (
          <Button auto color="error" onClick={onDelete}>
            Delete
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ImageModal;
