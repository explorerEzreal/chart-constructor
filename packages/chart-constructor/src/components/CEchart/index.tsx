import { useCallback, useEffect, useMemo, useState } from 'react';
import { Spin } from 'antd';
import type { ECharts } from 'echarts';
import { ChartView } from '../ChartView';
import { EditDrawer } from '../EditDrawer';
import { Toolbar } from '../Toolbar';
import { resolveTools } from '../Toolbar/tools';
import { useChartConfig } from './useChartConfig';
import { useChartData } from './useChartData';
import { getChartMeta } from '../../metas';
import { buildOption } from '../../utils/buildOption';
import {
  copyConfigToClipboard,
  copyOptionToClipboard,
  downloadChartPng,
  shareChartScreenshot,
} from '../../utils/actions';
import type { CEchartProps, ChartConfig, ChartData, ToolContext } from '../../types';

/** 图表构造器：配置项驱动渲染 + 操作栏 + 配置编辑抽屉 + 数据源取数 */
export function CEchart<C extends ChartConfig = ChartConfig>(props: CEchartProps<C>) {
  // 泛型只在 props 层收敛数据源与图表类型的对应关系，内部统一按配置联合类型处理
  const {
    value,
    defaultValue,
    data,
    defaultData,
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
  } = props as unknown as CEchartProps<ChartConfig>;

  const [instance, setInstance] = useState<ECharts | null>(null);
  // 取数函数需要加载态与刷新入口，静态数据块不需要
  const isAsyncData = typeof data === 'function';
  const staticData = data !== undefined && !isAsyncData ? (data as ChartData) : undefined;

  const {
    committedConfig,
    draftConfig,
    editing,
    beginEdit,
    changeSetting,
    commitEdit,
    cancelEdit,
    reset,
    setData,
  } = useChartConfig({
    value,
    defaultValue,
    onChange,
    defaultData,
    // 静态数据作为初始化层，避免首帧先用默认数据渲染
    initialData: staticData,
    dataManaged: isAsyncData,
  });

  const { loading, reload } = useChartData({
    data: isAsyncData ? data : undefined,
    config: committedConfig,
    onData: setData,
  });

  // 静态数据源引用变化时写回数据块，与取数结果共用同一条写回通道
  useEffect(() => {
    if (staticData !== undefined) {
      setData(staticData);
    }
  }, [staticData, setData]);

  // 主图取已提交配置，编辑期间不随草稿变化
  const option = useMemo(() => buildOption(committedConfig), [committedConfig]);
  // 抽屉预览取草稿，编辑时实时刷新
  const draftOption = useMemo(() => buildOption(draftConfig), [draftConfig]);
  const meta = getChartMeta(committedConfig.type);

  const handleSave = useCallback(() => {
    const next = commitEdit();
    onSave?.(next);
  }, [commitEdit, onSave]);

  const handleOpenEdit = useCallback(() => {
    beginEdit();
  }, [beginEdit]);

  const handleCancel = useCallback(() => {
    cancelEdit();
  }, [cancelEdit]);

  const handleRefreshData = useCallback(() => {
    void reload();
  }, [reload]);

  // 重置：回到该类型默认配置，数据源为函数时再取一次数据
  const handleReset = useCallback(() => {
    reset();
    if (isAsyncData) {
      void reload();
    }
  }, [reset, reload, isAsyncData]);

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
      canRefreshData: isAsyncData,
      refreshData: handleRefreshData,
      openEdit: handleOpenEdit,
      closeEdit: handleCancel,
      reset: handleReset,
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
    [
      committedConfig,
      option,
      instance,
      isAsyncData,
      handleRefreshData,
      handleOpenEdit,
      handleCancel,
      handleReset,
    ]
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
        {/* 取数期间盖半透明遮罩，图表保留上一次数据不闪烁 */}
        {loading ? (
          <div className="cc-echart__loading">
            <Spin />
          </div>
        ) : null}
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
}
