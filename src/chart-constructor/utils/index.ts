import html2canvas from 'html2canvas';

/**
 * 捕获给定 HTML 元素的截图并触发图像下载。
 * 
 * @param {HTMLElement} element - 要捕获的 HTML 元素。
 * @param {string} fileName - 下载的文件名。
 * @returns {Promise<void>} - 当截图成功拍摄并下载时，返回一个 Promise。
 */
export const captureScreenshot = async (element: HTMLElement, fileName: string = 'screenshot.png'): Promise<void> => {
  if (!(element instanceof HTMLElement)) {
    console.error('提供的元素无效，无法进行截图。');
    return;
  }

  try {
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imgData;
    link.download = fileName;
    link.click();
  } catch (error) {
    console.error('截图失败:', error);
  }
};

/**
 * 复制 到粘贴板
 *  @param string text - 要捕获的 HTML 元素。
 */

export const copyToClipboard = (text:string) => {
  return navigator.clipboard
    .writeText(text)
    .then(() => {
      alert('已复制到剪贴板');
    })
    .catch((err) => {
      console.error('复制到剪贴板时出错', err);
    });
};

