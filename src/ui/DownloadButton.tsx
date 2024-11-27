import React from "react";
import { Button, Link } from "@nextui-org/react";
import { downloadIcon } from "@/assets";  // ensure the path correct

// define interface type
interface DownloadButtonProps {
  imageUrl: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ imageUrl }) => {
  return (
    <Button
      className="absolute bottom-2 right-2 z-10 p-1 pr-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      isIconOnly
      as={Link}
      href={imageUrl}
      download={"generated_image"}
      variant="light"
      size="md"
      aria-label="Download"
    >
      <img src={downloadIcon} alt="Download" className="h-9 w-9" />
    </Button>
  );
};

export default DownloadButton;
