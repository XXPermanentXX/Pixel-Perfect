/**
 * ����ͼƬ������Ϊָ���ļ���
 * @param src ͼƬ�� URL
 * @param filename ����ʱ������ļ�������ѡ��Ĭ��ֵΪ "generated_image.png"��
 */
const downloadImage = (src: string, filename: string = "generated_image.png"): void => {
  // ����һ�� <a> Ԫ��
  const link = document.createElement("a");
  link.href = src; // ����ͼƬ�� URL
  link.download = filename; // �������ص��ļ���

  // ������Ԫ����ӵ�ҳ����
  document.body.appendChild(link);
  link.click(); // ��������¼�

  // ���غ������Ƴ�Ԫ��
  document.body.removeChild(link);
};

export { downloadImage };
