// GenereteImagePresenter.tsx
import React, { useEffect, useState } from "react";
import GenerateSettingView from "@features/generate/generate-image/GenerateSettingView";
import GenerateResultsView from "@features/generate/generate-image/GenerateResultsView";
import { Button, Divider, useDisclosure } from "@nextui-org/react";
import { backIcon } from "@/assets";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { aspectRatioList, initialPrompt, styleList } from "@/models/staticDataModel";
import {
  generateImage,
  setSidebarExpended,
  setPromptRequest,
  uploadPromptRequest,
  deleteReferImageSrc,
} from "@/models/generateSlice";
import ImageModal from "@/ui/ImageModal";

//define the interface type
interface RootState {
    generate: {
      productsData: any[];
      generateStatus: string;
      generatedImages: string[];
      loaderText: string;
      promptRequest: any;
    };
}

const GeneratePicture: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [progressText, setProgressText] = useState<{ value: number; text: string }>({
    value: 0,
    text: "",
  });

  const productList = useSelector((state: RootState) => state.generate.productsData);
  const generateStatus = useSelector((state: RootState) => state.generate.generateStatus);
  const generatedImages = useSelector((state: RootState) => state.generate.generatedImages);
  const loaderText = useSelector((state: RootState) => state.generate.loaderText);
  const promptRequest = useSelector((state: RootState) => state.generate.promptRequest);

  const setPrompt = (value: Partial<typeof promptRequest>) => {
    dispatch(setPromptRequest(value));
    dispatch(uploadPromptRequest({ ...promptRequest, ...value }));
  };

  const handleGenerate = () => {
    dispatch(generateImage());
    console.log("Generate Picture");
  };

  const handleBack = () => {
    setPrompt(initialPrompt);
    dispatch(setSidebarExpended(true));
    dispatch(deleteReferImageSrc());
    navigate("/generate/model");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (imageSrc: string) => {
    console.log("Open modal with image: ", imageSrc);
    setSelectedImage(imageSrc);
    onOpen();
  };

  // loaderText and progressText are used to show the progress of image generation
  useEffect(() => {
    if (loaderText === "Connecting to the GPU...") {
      setProgressText({
        value: 0,
        text: "Connecting to the GPU...",
      });
    } else if (loaderText.startsWith("Image generation at")) {
      // regex to extract the percentage from the loaderText, same for the following conditions
      const match = loaderText.match(/(\d+\.\d+)%/);
      const percentage = match ? parseFloat(match[1]) / 100 : 0;
      setProgressText({
        value: percentage,
        text: "Generating based on your requirements...",
      });
    } else if (loaderText.startsWith("Refining the image")) {
      const match = loaderText.match(/(\d+\.\d+)%/);
      const percentage = match ? parseFloat(match[1]) / 100 : 0;
      setProgressText({
        value: percentage,
        text: "Refining the image...",
      });
    } else if (loaderText.startsWith("Images are ready")) {
      setProgressText({
        value: 1,
        text: "Images are ready, uploading to the cloud...",
      });
    }
  }, [loaderText]);

  return (
    <div className="h-full w-full flex-col pb-[60px]">
      <div className="flex h-[100px] items-center pl-[50px]">
        <Button
          variant="light"
          size="lg"
          startContent={<img src={backIcon} alt="back" />}
          onClick={handleBack}
        >
          BACK
        </Button>
      </div>
      <div className="flex h-[calc(100%-100px)] w-full">
        <div className="flex w-1/3 min-w-[420px] max-w-[600px] pl-[50px] pr-[10px]">
          <GenerateSettingView
            productList={productList}
            styleList={styleList}
            aspectRatioList={aspectRatioList}
            setPromptRequest={setPrompt}
            handleGenerate={handleGenerate}
            generateStatus={generateStatus}
          />
        </div>
        <Divider orientation="vertical" className="h-auto bg-default-500" />
        <div className="flex w-2/3 items-center justify-center px-[50px]">
          <GenerateResultsView
            generateStatus={generateStatus}
            progressText={progressText}
            imageList={generatedImages}
            openModal={openModal}
          />
          <ImageModal
            isOpen={isOpen}
            onClose={onClose}
            imageSrc={selectedImage}
            showDeleteButton={false}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneratePicture;
