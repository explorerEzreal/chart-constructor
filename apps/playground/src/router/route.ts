import { lazy } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';

export type AppRoute = {
  path: string;
  name: string;
  component: LazyExoticComponent<ComponentType>;
};

const PageHome = lazy(() => import('@/pages/home'));
const PageGuide = lazy(() => import('@/pages/guide'));
const PageDemo = lazy(() => import('@/pages/demo'));

/** 渲染在 Layout 内的业务路由 */
export const menuRoutes: AppRoute[] = [
  {
    path: '/home',
    name: '首页',
    component: PageHome,
  },
  {
    path: '/guide',
    name: '指南',
    component: PageGuide,
  },
  {
    path: '/demo',
    name: '示例',
    component: PageDemo,
  },
];
