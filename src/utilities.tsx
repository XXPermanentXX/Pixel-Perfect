/**
 * download the image and save as the given filename
 * @param src image URL
 * @param filename （optional, default: "generated_image.png"）
 */
const downloadImage = (src: string, filename: string = "generated_image.png"): void => {
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

export { downloadImage };
