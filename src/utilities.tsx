/**
 * 下载图片并保存为指定文件名
 * @param src 图片的 URL
 * @param filename 下载时保存的文件名（可选，默认值为 "generated_image.png"）
 */
const downloadImage = (src: string, filename: string = "generated_image.png"): void => {
  // 创建一个 <a> 元素
  const link = document.createElement("a");
  link.href = src; // 设置图片的 URL
  link.download = filename; // 设置下载的文件名

  // 将链接元素添加到页面中
  document.body.appendChild(link);
  link.click(); // 触发点击事件

  // 下载后立即移除元素
  document.body.removeChild(link);
};

export { downloadImage };
