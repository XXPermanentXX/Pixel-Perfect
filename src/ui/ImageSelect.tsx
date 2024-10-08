import { SetStateAction, useState } from "react";
import { Image, Select, SelectItem } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Prompt } from "@/models/types";

interface ModelItem {
  id: string;
  name: string;
  thumbnail: string;
  lora_model_name: string; 
  trigger_word: string;
}

interface StyleItem {
  id: string;
  name: string;
  thumbnail: string;
  keywords: string;
}

interface ImageSelectProps {
  items: ModelItem[] | StyleItem[];
  initialProduct: string;
  initialStyle: string;
  setPromptRequest: (request: SetStateAction<Prompt>) => void;
}
function ImageSelect({ items, initialProduct, initialStyle, setPromptRequest }:ImageSelectProps) {
  // State to track the selected item
  const [selectedName, setSelectedName] = useState<string>(() => {
    if ("lora_model_name" in items[0]) {
      return items.length > 0 ? initialProduct : items[0].name;
    } else if ("keywords" in items[0]) {
      return items.length > 0 ? initialStyle : items[0].name;
    }
    return "";
  });

  // const navigate = useNavigate();

  return (
    <div className="flex items-center gap-5">
      <div className="flex h-[70px] w-[70px] flex-shrink-0 items-center justify-center">
        <Image src={(items.find((item) => item.name === selectedName) || items[0]).thumbnail} radius="sm" alt="Selected Item" />
      </div>
      <Select
        selectedKeys={[selectedName]}
        isRequired={true}
        onSelectionChange={(val) => {
          const newSelectedName = Array.from(val)[0] || items[0].name;
          setSelectedName(newSelectedName as string);
          // Find the new selected item based on newSelectedId
          const newSelectedItem = items.find((item) => item.name === newSelectedName);
          if ( newSelectedItem && "lora_model_name" in newSelectedItem) {
            setPromptRequest((prev)=>({...prev, model: newSelectedItem.lora_model_name, triggerWord: newSelectedItem.trigger_word }));
            // navigate(`/generate/model/${newSelectedName}`);
          } else if (newSelectedItem) {
            setPromptRequest((prev)=>({...prev, keywords: newSelectedItem.keywords.split(",") }));
          }
        }}
        aria-label="Select an item"
        radius="sm"
        variant="bordered"
        classNames={{
          value: ["group-data-[has-value=true]:text-white text-[18px] p-4"],
          selectorIcon: ["text-foreground-400"],
          trigger: ["h-[75px] border-default-400 data-[hover=true]:border-default-500"],
        }}
      >
        {items.map((item) => (
          <SelectItem key={item.name} value={item.name}>
            {item.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

export default ImageSelect;
