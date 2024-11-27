import React, { useEffect, useState } from "react";
import GenerateSettingView from "./GenerateSettingView";
import GenerateResultsView from "./GenerateResultsView";
import { Button, Divider } from "@nextui-org/react";
import {
  ASPECT_RATIO_LIST,
  INITIAL_PROMPT,
  PRODUCT_LIST,
  STYLE_LIST ,
} from "@/models/staticDataModel";
import { Prompt } from "@/models/types"; 
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/provider";
import { generateImage, getProductData, setPromptRequest } from "@/models/generateSlice";
import { updateUserData } from "@/models/user/authSlice";
import { setSidebarExpanded } from "@/models/AppSlice";
import { backIcon } from "../../../assets";
import { useNavigate } from "react-router-dom";

const GenerateImage: React.FC = () => {
  const promptRequestSlice = useSelector((state:RootState) => state.auth.user?.promptRequest || INITIAL_PROMPT)
  const generateStatus = useSelector((state:RootState) => state.generate.generateStatus);
  const generatedImages = useSelector((state:RootState) => state.generate.generatedImages);
  const loaderText = useSelector((state:RootState) => state.generate.loaderText);
  const [progressText, setProgressText] = useState({
    value: 0,
    text: "",
  });

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const user = useSelector((state:RootState) => state.auth.user)
  const productList = useSelector((state: any) => state.generate.productsData);
  


  const sentPrompt = async (promptRequest:Prompt) => {
    dispatch(setPromptRequest(promptRequest));
    dispatch(updateUserData({promptRequest:promptRequest}));
  }
  
  useEffect(() => {
    console.log(user);
    if (productList.length > 0) {
      if(user){
        dispatch(setSidebarExpanded(false));
        
        dispatch(setPromptRequest(user.promptRequest));
      }
  } else {
    dispatch(getProductData());
  }
  },[dispatch,user?.userId])
  const handleBack = async () => {
    // back的逻辑写在这里
    sentPrompt(INITIAL_PROMPT)
    console.log('clearr');
    dispatch(setSidebarExpanded(true));
    navigate("/generate/model");
  };

  const handlePromptRequestChange = (newPromptRequest: Partial<Prompt>) => {
    const _promptRequest = {...promptRequestSlice,...newPromptRequest}
    if(_promptRequest.model && (newPromptRequest.model || newPromptRequest.keywords)) {
      sentPrompt(_promptRequest)
    }
  };
  const handleGenerate = () => {
    dispatch(generateImage())
        .unwrap() // 使用 unwrap() 来处理 fulfilled 和 rejected 状态
        .then(() => {
            console.log("Image generated successfully");
        })
        .catch((error) => {
            console.error("Failed to generate image:", error);
        });
    console.log("Generate Picture");
  };

  //Processing the loader text to show the progress bar
  useEffect(() => {
    if (loaderText === "Connecting to the GPU...") {
      setProgressText({
        value: 0,
        text: "Connecting to the GPU...",
      });
    } else if (loaderText.startsWith("Image generation at")) {
      const match = loaderText.match(/(\d+\.\d+)%/);
      if (match) {
        const percentage = parseFloat(match[1]) / 100;
        setProgressText({
          value: percentage,
          text: "Generating based on your requirements...",
        });
      }
    } else if (loaderText.startsWith("Refining the image")) {
      const match = loaderText.match(/(\d+\.\d+)%/);
      if (match) {
        const percentage = parseFloat(match[1]) / 100;
        setProgressText({
          value: percentage,
          text: "Refining the image...",
        });
      }
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
        <Button variant="light" size="lg" startContent={<img src={backIcon} alt="back" />} onClick={handleBack}>
          BACK
        </Button>
      </div>
      <div className="flex h-[calc(100%-100px)] w-full">
        <div className="flex w-1/3 min-w-[420px] max-w-[600px] pl-[50px] pr-[10px]">
          <GenerateSettingView
            productList={PRODUCT_LIST}
            styleList={STYLE_LIST}
            aspectRatioList={ASPECT_RATIO_LIST}
            promptRequest={promptRequestSlice}
            setPromptRequest={handlePromptRequestChange}
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
            openModal={(imageUrl: string) =>
              console.log("Open modal with image:", imageUrl)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default GenerateImage;
