import { useCallback, useMemo, useState } from 'react';
import type { FC } from 'react';
import type { ECharts } from 'echarts';
import { ChartView } from '../ChartView';
import { EditDrawer } from '../EditDrawer';
import { Toolbar } from '../Toolbar';
import { resolveTools } from '../Toolbar/tools';
import { useChartConfig } from './useChartConfig';
import { getChartMeta } from '../../metas';
import { buildOption } from '../../utils/buildOption';
import {
  copyConfigToClipboard,
  copyOptionToClipboard,
  downloadChartPng,
  shareChartScreenshot,
} from '../../utils/actions';
import type { CEchartProps, ToolContext } from '../../types';

/** 图表构造器：配置项驱动渲染 + 操作栏 + 配置编辑抽屉 */
export const CEchart: FC<CEchartProps> = ({
  value,
  defaultValue,
  onChange,
  onSave,
  showToolbar = true,
  tools,
  editable = true,
  width = '100%',
  height = '100%',
  theme,
  className,
  style,
  onReady,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [instance, setInstance] = useState<ECharts | null>(null);
  const { config, changeSetting, reset, takeSnapshot, rollback } = useChartConfig({
    value,
    defaultValue,
    onChange,
  });

  const option = useMemo(() => buildOption(config), [config]);
  const meta = getChartMeta(config.type);

  // 保存：输出最新配置项
  const handleSave = useCallback(() => {
    setDrawerOpen(false);
    onSave?.(config);
  }, [config, onSave]);

  // 打开抽屉前记录快照，取消时回滚
  const handleOpenEdit = useCallback(() => {
    takeSnapshot();
    setDrawerOpen(true);
  }, [takeSnapshot]);

  const handleCancel = useCallback(() => {
    rollback();
    setDrawerOpen(false);
  }, [rollback]);

  const handleReady = useCallback(
    (chart: ECharts | null) => {
      setInstance(chart);
      if (chart) {
        onReady?.(chart);
      }
    },
    [onReady]
  );

  const toolContext: ToolContext = useMemo(
    () => ({
      config,
      option,
      instance,
      openEdit: handleOpenEdit,
      closeEdit: handleCancel,
      reset,
      copyConfig: () => {
        void copyConfigToClipboard(config);
      },
      copyOption: () => {
        void copyOptionToClipboard(option);
      },
      downloadPng: () => downloadChartPng(instance),
      screenshot: () => {
        void shareChartScreenshot(instance);
      },
    }),
    [config, option, instance, handleOpenEdit, handleCancel, reset]
  );

  const toolbarItems = useMemo(() => {
    if (!showToolbar) {
      return [];
    }
    const list = resolveTools(tools, toolContext);
    return editable ? list : list.filter((item) => item.key !== 'edit');
  }, [showToolbar, tools, toolContext, editable]);

  return (
    <div
      className={['cc-echart', className].filter(Boolean).join(' ')}
      style={{ width, height, ...style }}
    >
      {showToolbar ? <Toolbar items={toolbarItems} /> : null}
      <div className="cc-echart__body">
        <ChartView option={option} theme={theme} onReady={handleReady} />
      </div>
      <EditDrawer
        open={drawerOpen}
        config={config}
        settingKeys={meta.settingKeys}
        onChange={changeSetting}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};
