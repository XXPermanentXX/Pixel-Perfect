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
import { WS_URL } from "@/models/apiConfig";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/provider";
import { setPromptRequest } from "@/models/generateSlice";
import { updateUserData } from "@/models/user/authSlice";
import { setSidebarExpanded } from "@/models/AppSlice";
import { setHistoryImageData } from "@/models/history/historyData";
import { backIcon } from "../../../assets";

const GenerateImage: React.FC = () => {
  const promptRequestSlice = useSelector((state:RootState) => state.auth.user?.promptRequest || INITIAL_PROMPT)
  const [generatedImages, setGeneratedImages] = useState<
    { imageUrl: string }[]
  >([]);
  const [generateStatus, setGenerateStatus] = useState<
    "idle" | "loading" | "succeeded" | "failed"
  >("idle");
  const [eventText,setEventText]=useState<string>("")
  const [progressText, setProgressText] = useState<{
    value: number;
    text: string;
  }>({
    value: 0,
    text: "",
  });

  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state:RootState) => state.auth.user)

  useEffect(() => {
            dispatch(setSidebarExpanded(false));
  },[])
  const handleBack = () => {
    // back的逻辑写在这里
  };

  const handlePromptRequestChange = (newPromptRequest: Partial<Prompt>) => {
    const _promptRequest = {...promptRequestSlice,...newPromptRequest}
    if(_promptRequest.model && newPromptRequest.model) {
      dispatch(setPromptRequest(_promptRequest));
      dispatch(updateUserData({promptRequest:_promptRequest}));
    }
  };
  const handleGenerate = () => {
    setGenerateStatus("loading");
    setProgressText({ value: 0, text: "Connecting to the GPU..." });

    const generationSeed = Math.floor(Math.random() * 0xffffffffffffffff);
    const sendPrompt = {
      ...promptRequestSlice,
      generationSeed,
    };

    const ws = new WebSocket(WS_URL);
    console.log("Connecting to websocket server...");

    ws.onerror = (error) => {
      console.error("Error connecting to websocket server", error);
      setGenerateStatus("failed");
    };

    ws.onopen = () => {
      console.log("Connected to websocket server");
      ws.send(JSON.stringify(sendPrompt));
    };

    ws.onmessage = (event) => {
      try {
        console.log(`Message received: ${event.data}`);
        const response = JSON.parse(event.data);
        const imageUrls = response.map((image: string) => ({
          imageUrl: image,
        }));
        console.log(response);
        setHistoryImageData(response, user?.userId!)
        setGeneratedImages(imageUrls);
        setGenerateStatus("succeeded");
      } catch (e) {
        setGenerateStatus("loading");
        setEventText(event.data);
      }
    };
  };

  useEffect(() => {
    if (eventText === "Connecting to the GPU...") {
      setProgressText({
        value: 0,
        text: "Connecting to the GPU...",
      });
    } else if (eventText.startsWith("Image generation at")) {
      const matchResult = eventText.match(/(\d+\.\d+)%/);
      const percentage = matchResult ? parseFloat(matchResult[1]) / 100 : 0;
      setProgressText({
        value: percentage,
        text: "Generating based on your requirements...",
      });
    } else if (eventText.startsWith("Refining the image")) {
      const matchResult = eventText.match(/(\d+\.\d+)%/);
      const percentage = matchResult ? parseFloat(matchResult[1]) / 100 : 0;
      setProgressText({
        value: percentage,
        text: "Refining the image...",
      });
    } else if (eventText.startsWith("Images are ready")) {
      setProgressText({
        value: 1,
        text: "Images are ready, uploading to the cloud...",
      });
    }
  }, [generateStatus,eventText]);

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
