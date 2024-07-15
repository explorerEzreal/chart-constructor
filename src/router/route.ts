export const layoutRoute = {
  element: 'Layout',
  path: '/',
  children: [
    {
      element: '/home',
      path: '/home',
      name: '首页',
      icon: 'icon-form',
    },
    {
      element: '/demo',
      path: '/demo',
      name: '示例',
      icon: 'icon-form',
    },
    {
      element: '/apply',
      path: '/apply',
      name: '案例',
      icon: 'icon-form',
    },
  ],
};

export const routes = [
  {
    element: '/login',
    path: '/login',
    icon: 'icon-form',
  },
  layoutRoute,
];
