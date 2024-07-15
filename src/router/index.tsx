import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './route';
import PageLayout from './Layout';

const RenderRoutrs = (item) => {
  const path = `/src/pages${item.path}/index.tsx`;
  const Element =
    item.element === 'Layout' ? PageLayout : lazy(() => import(path));

  return (
    <Route key={item.path} path={item.path || ''} element={<Element />}>
      {item.children &&
        item.children.map((child) => {
          return RenderRoutrs(child);
        })}
    </Route>
  );
};

export function Routers() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route key='redirect' path='/' element={<Navigate to='/home' />} />
        {routes.map((item) => {
          return RenderRoutrs(item);
        })}
      </Routes>
    </Suspense>
  );
}
