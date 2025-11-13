import { Button, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import homeLogo from '@/assets/homeLogo.svg';
import './index.less';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="page_home">
      <div className="home_content">
        <h1>Chart Constructor</h1>
        <p>一个基于 React 与 ECharts 的图表构造器组件</p>
        <Flex gap="large">
          <Button className="home_btn" type="primary" onClick={() => navigate('/demo')}>
            立即体验
          </Button>
          <Button className="home_btn" onClick={() => navigate('/demo')}>
            使用案例
          </Button>
        </Flex>
        <img className="home_logo" src={homeLogo} alt="chart-constructor" />
      </div>
    </div>
  );
};

export default Index;
