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
  toolbarMode = 'static',
  tools,
  editable = true,
  width = '100%',
  height = '100%',
  theme,
  className,
  style,
  onReady,
}) => {
  const [instance, setInstance] = useState<ECharts | null>(null);
  const {
    committedConfig,
    draftConfig,
    editing,
    beginEdit,
    changeSetting,
    commitEdit,
    cancelEdit,
    reset,
  } = useChartConfig({ value, defaultValue, onChange });

  // 主图取已提交配置，编辑期间不随草稿变化
  const option = useMemo(() => buildOption(committedConfig), [committedConfig]);
  // 抽屉预览取草稿，编辑时实时刷新
  const draftOption = useMemo(() => buildOption(draftConfig), [draftConfig]);
  const meta = getChartMeta(committedConfig.type);

  // 保存：提交草稿并输出最新配置项
  const handleSave = useCallback(() => {
    const next = commitEdit();
    onSave?.(next);
  }, [commitEdit, onSave]);

  // 打开抽屉：以当前已提交配置取快照
  const handleOpenEdit = useCallback(() => {
    beginEdit();
  }, [beginEdit]);

  // 取消编辑：丢弃草稿回到快照
  const handleCancel = useCallback(() => {
    cancelEdit();
  }, [cancelEdit]);

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
      config: committedConfig,
      option,
      instance,
      openEdit: handleOpenEdit,
      closeEdit: handleCancel,
      reset,
      copyConfig: () => {
        void copyConfigToClipboard(committedConfig);
      },
      copyOption: () => {
        void copyOptionToClipboard(option);
      },
      downloadPng: () => downloadChartPng(instance),
      screenshot: () => {
        void shareChartScreenshot(instance);
      },
    }),
    [committedConfig, option, instance, handleOpenEdit, handleCancel, reset]
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
      {/* 悬浮形态贴右上角并脱离文档流，图表因此占满整个高度 */}
      {showToolbar ? (
        <Toolbar
          items={toolbarItems}
          className={toolbarMode === 'float' ? 'cc-toolbar--float' : undefined}
        />
      ) : null}
      <div className="cc-echart__body">
        <ChartView option={option} theme={theme} onReady={handleReady} />
      </div>
      <EditDrawer
        open={editing}
        config={draftConfig}
        option={draftOption}
        theme={theme}
        settingKeys={meta.settingKeys}
        onChange={changeSetting}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};
