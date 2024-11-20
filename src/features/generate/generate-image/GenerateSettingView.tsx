import { Button, Tab, Tabs, Textarea } from "@nextui-org/react";
import  { SetStateAction, useRef } from "react";
import ImageSelect from "@/ui/ImageSelect";
import { AspectRatio, Status, ProductsItem, Prompt, StyleItem } from "@/models/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/provider";


interface GenerateSettingViewProps {
  productList: ProductsItem[];
  styleList: StyleItem[];
  aspectRatioList: AspectRatio[];
  promptRequest: Prompt;
  setPromptRequest: (request: Partial<Prompt>) => void;
  handleGenerate: () => void;
  generateStatus: Status;
}

const GenerateSettingView = ({ productList, styleList, aspectRatioList, promptRequest,setPromptRequest, handleGenerate, generateStatus }:GenerateSettingViewProps) => {
  const aspectRatioRender = aspectRatioList.map((aspectRatio) => {
    return <Tab key={aspectRatio.id} title={aspectRatio.title} />;
  });
  const { productModel, promptText, imageStyle, aspectRatio } = useSelector((state:RootState) => state.generate.generateSettings);
  const scrollContainerRef = useRef(null);


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
            value={promptText}
            onValueChange={(val) => {
              setPromptRequest({...promptRequest,prompt:val});
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
              if (key !== aspectRatio) {  
                setPromptRequest({ ...promptRequest, aspectRatio: key as string });
              }
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
