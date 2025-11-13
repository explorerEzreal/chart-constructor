export const downloadDataUrl = (dataUrl: string, fileName: string): void => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const createPngFileName = (prefix = 'chart'): string => `${prefix}-${Date.now()}.png`;
