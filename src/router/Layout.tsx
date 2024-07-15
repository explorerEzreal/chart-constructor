import { useState } from 'react';
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { layoutRoute } from './route';
import './index.less';

const items = layoutRoute.children.map((item) => ({
  key: item.path,
  label: item.name,
}));

const PageLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const hanldeNav = ({ key }) => {
    navigate(key);
  };

  const [defSelectKeys] = useState([pathname]);

  return (
    <Layout className='app_layout'>
      <Header
        style={{
          position: 'sticky',
          display: 'flex',
          top: 0,
          zIndex: 1,
          width: '100%',
          alignItems: 'center',
          background: '#fff',
        }}
      >
        <img
          className='app_logo'
          src='https://echarts.apache.org/zh/images/logo.png?_v_=20240226'
        />
        <Menu
          defaultSelectedKeys={defSelectKeys}
          onClick={hanldeNav}
          theme='light'
          mode='horizontal'
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content>
        <div
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        This is a constructor of Echarts
      </Footer>
    </Layout>
  );
};
export default PageLayout;
