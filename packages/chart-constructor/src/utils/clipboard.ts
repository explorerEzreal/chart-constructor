/** 兼容旧浏览器的文本复制 */
const legacyCopyText = (text: string): boolean => {
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const result = document.execCommand('copy');
    document.body.removeChild(textarea);
    return result;
  } catch {
    return false;
  }
};

/** 复制文本，优先使用 Clipboard API，失败时回退到临时输入框 */
export const copyText = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    return legacyCopyText(text);
  } catch {
    return legacyCopyText(text);
  }
};

/** 复制图片到剪贴板，浏览器不支持时返回 false 由调用方降级 */
export const copyImage = async (dataUrl: string): Promise<boolean> => {
  try {
    if (!navigator.clipboard?.write || typeof ClipboardItem === 'undefined') {
      return false;
    }
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    await navigator.clipboard.write([new ClipboardItem({ [blob.type || 'image/png']: blob })]);
    return true;
  } catch {
    return false;
  }
};
