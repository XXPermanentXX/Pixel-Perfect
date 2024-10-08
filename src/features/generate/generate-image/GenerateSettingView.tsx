import { Button, Tab, Tabs, Textarea } from "@nextui-org/react";
import  { SetStateAction, useRef } from "react";
import ImageSelect from "@/ui/ImageSelect";
import { AspectRatio, Status, ModelItem, Prompt, StyleItem } from "@/models/types";


interface GenerateSettingViewProps {
  productList: ModelItem[];
  styleList: StyleItem[];
  aspectRatioList: AspectRatio[];
  promptRequest: Prompt;
  setPromptRequest: (request: SetStateAction<Prompt>) => void;
  handleGenerate: () => void;
  generateStatus: Status;
}

const GenerateSettingView = ({ productList, styleList, aspectRatioList, promptRequest,setPromptRequest, handleGenerate, generateStatus }:GenerateSettingViewProps) => {
  const aspectRatioRender = aspectRatioList.map((aspectRatio) => {
    return <Tab key={aspectRatio.id} title={aspectRatio.title} />;
  });

  const scrollContainerRef = useRef(null);
  const productModel=productList[0].name
  const imageStyle=styleList[0].name
  const aspectRatio=aspectRatioList[0].title

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-1 flex-col gap-[15px] overflow-auto pr-[40px]" ref={scrollContainerRef}>
        <div>
          <p className="pb-3.5 font-bold after:text-red-500 after:content-['*']">Product Model</p>
          <ImageSelect items={productList} initialProduct={productModel} initialStyle={imageStyle} setPromptRequest={setPromptRequest} />
        </div>
        <div>
          <p className="pb-3.5 font-bold after:text-red-500 after:content-['*']">Text Prompt</p>
          <Textarea
            placeholder="How do you imagine your product being used?"
            variant="bordered"
            disableAutosize
            value={promptRequest.prompt}
            onValueChange={(val) => {
              setPromptRequest((prev)=>({...prev, prompt: val }));
            }}
            classNames={{
              input: "resize-y min-h-[178px] group-data-[has-value=true]:text-white text-[18px]",
              inputWrapper: ["border-default-400 data-[hover=true]:border-default-500"],
            }}
          />
        </div>
        <div>
          <p className="pb-3.5 font-bold after:text-red-500 after:content-['*']">Image Styles</p>
          <ImageSelect items={styleList} initialProduct={productModel} initialStyle={imageStyle} setPromptRequest={setPromptRequest} />
        </div>
        <div>
          <p className="pb-3.5 font-bold after:text-red-500 after:content-['*']">Aspect Ratio</p>
          <Tabs
            variant="light"
            color="primary"
            size="lg"
            aria-label="Tabs variants"
            selectedKey={aspectRatio}
            onSelectionChange={(key) => {
              setPromptRequest((prev)=>({...prev, aspectRatio: key as string }));
            }}
          >
            {aspectRatioRender}
          </Tabs>
        </div>
      </div>
      <div className="flex w-full flex-none pr-[40px]">
        <Button className="button-gradient h-[60px] w-full text-[20px] font-semibold" radius="full" variant="solid" isLoading={generateStatus === "loading"} onClick={handleGenerate}>
          🚀 GENERATE
        </Button>
      </div>
    </div>
  );
};

export default GenerateSettingView;
