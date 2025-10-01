import { message } from 'antd';
import type { ECharts, EChartsOption } from 'echarts';
import type { ChartConfig } from '../types';
import { copyImage, copyText } from './clipboard';
import { createPngFileName, downloadDataUrl } from './download';

/** 导出图表为 PNG dataUrl */
export const getChartDataUrl = (instance: ECharts): string =>
  instance.getDataURL({ type: 'png', pixelRatio: 2, backgroundColor: '#ffffff' });

/** 复制配置项 JSON */
export const copyConfigToClipboard = async (config: ChartConfig): Promise<void> => {
  const success = await copyText(JSON.stringify(config, null, 2));
  if (success) {
    message.success('已复制配置项');
    return;
  }
  message.error('复制失败，请稍后重试');
};

/** 复制派生的 ECharts option */
export const copyOptionToClipboard = async (option: EChartsOption): Promise<void> => {
  const success = await copyText(JSON.stringify(option, null, 2));
  if (success) {
    message.success('已复制 Options');
    return;
  }
  message.error('复制失败，请稍后重试');
};

/** 下载图表 PNG */
export const downloadChartPng = (instance: ECharts | null): void => {
  if (!instance) {
    message.warning('图表尚未初始化，请稍后重试');
    return;
  }
  try {
    downloadDataUrl(getChartDataUrl(instance), createPngFileName('chart'));
    message.success('已开始下载图片');
  } catch {
    message.error('导出图片失败，请稍后重试');
  }
};

/** 截图分享：优先写入剪贴板，浏览器不支持时降级为下载 */
export const shareChartScreenshot = async (instance: ECharts | null): Promise<void> => {
  if (!instance) {
    message.warning('图表尚未初始化，请稍后重试');
    return;
  }
  try {
    const dataUrl = getChartDataUrl(instance);
    const success = await copyImage(dataUrl);
    if (success) {
      message.success('图片已复制，可直接分享');
      return;
    }
    downloadDataUrl(dataUrl, createPngFileName('chart-share'));
    message.warning('当前浏览器不支持复制图片，已改为下载图片');
  } catch {
    message.error('截图分享失败，请稍后重试');
  }
};
