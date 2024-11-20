import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './route';
import PageLayout from './Layout';
import {  Spin } from 'antd';
import { textAlign } from 'html2canvas/dist/types/css/property-descriptors/text-align';

export function Routers() {
  const modules = import.meta.glob('/src/pages/**');

  const RenderRoutes = (item) => {
    const path = `/src/pages${item.path}/index.tsx`;

    const Element =
      item.element === 'Layout' ? PageLayout : lazy(modules[path]);

    return (
      <Route key={item.path} path={item.path || ''} element={<Element />}>
        {item.children &&
          item.children.map((child) => {
            return RenderRoutes(child);
          })}
      </Route>
    );
  };

  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <Suspense fallback={<div style={{width:'100vw',height:'100vh',backgroundColor:'#fff',fontSize:30,color:'black',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Spin tip="Loading" size="large"></Spin>
      <span style={{padding:'0 20px'}}>加载中...</span>
      </div>}>
      <Routes>
        <Route key='redirect' path='/' element={<Navigate to='/home' />} />
        {routes.map((item) => {
          return RenderRoutes(item);
        })}
      </Routes>
    </Suspense>
  );
}
