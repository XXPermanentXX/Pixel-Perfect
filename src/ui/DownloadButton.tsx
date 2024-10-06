import React from "react";
import { Button, Link } from "@nextui-org/react";
import { downloadIcon } from "../assets";  // 确保下载图标路径正确

// 定义组件 Props 的类型
interface DownloadButtonProps {
  imageUrl: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ imageUrl }) => {
  console.log("Download button imageUrl: ", imageUrl);

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
