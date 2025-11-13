import { Layout, Menu } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { menuRoutes } from './route';
import './index.less';

const { Header, Content, Footer } = Layout;

const menuItems = menuRoutes.map((item) => ({
  key: item.path,
  label: item.name,
}));

const PageLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Layout className="app_layout">
      <Header className="app_header">
        <span className="app_logo">Chart Constructor</span>
        <Menu
          className="app_menu"
          mode="horizontal"
          theme="light"
          selectedKeys={[pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Header>
      <Content className="app_content">
        <Outlet />
      </Content>
      <Footer className="app_footer">基于 React 与 ECharts 的图表构造器</Footer>
    </Layout>
  );
};

export default PageLayout;
