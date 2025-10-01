/** 通过 dataUrl 触发浏览器下载 */
export const downloadDataUrl = (dataUrl: string, fileName: string): void => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/** 生成 PNG 文件名 */
export const createPngFileName = (prefix = 'chart'): string => `${prefix}-${Date.now()}.png`;
