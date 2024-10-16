import { ProductsItem, Prompt, StyleItem } from "./store/models/types";

/**
 * download the image and save as the given filename
 * @param src image URL
 * @param filename （optional, default: "downloaded-image.png"）
 */
const downloadImage = (
  src: string,
  filename: string = "downloaded-image.png"
): void => {
  // new an element <a>
  const link = document.createElement("a");
  link.href = src; // set image URL
  link.download = filename; // set download filename

  // append the link element to the document
  document.body.appendChild(link);
  link.click(); // simulate click to download

  // remove the link element from the document after download
  document.body.removeChild(link);
};

const mapPromptToSettings = (
  prompt: Prompt,
  productList: ProductsItem[],
  styleList: StyleItem[]
) => {
  const product = productList.find(
    (product) => product.lora_model_name === prompt.model
  );
  const keywords = prompt.keywords.join(",");
  const style = styleList.find((style) => style.keywords === keywords);
  return {
    productModel: product ? product.name : "",
    promptText: prompt.prompt,
    imageStyle: style ? style.name : "",
    aspectRatio: prompt.aspectRatio,
  };
};

export { mapPromptToSettings, downloadImage };
