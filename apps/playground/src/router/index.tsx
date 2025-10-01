import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageLayout from './Layout';
import { menuRoutes } from './route';

/** 应用路由：首页与示例页均渲染在 Layout 内 */
export const Routers = () => (
  <Suspense fallback={<div className="app_loading">加载中...</div>}>
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Navigate to="/home" replace />} />
        {menuRoutes.map((item) => (
          <Route key={item.path} path={item.path.slice(1)} element={<item.component />} />
        ))}
      </Route>
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  </Suspense>
);
