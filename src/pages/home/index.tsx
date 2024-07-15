import React from 'react';
import { Button, Flex } from 'antd';
import homeLogo from '@/assets/homeLogo.svg';

import './index.less';

const Index = () => {
  return (
    <div className='page_home'>
      <div className='home_content'>
        <h1>Chart Constructor</h1>
        <p>一个基于React的图表构造器</p>
        <Flex gap='large'>
          <Button className='home_btn' type='primary'>
            立即体验
          </Button>
          <Button className='home_btn'>使用案例</Button>
        </Flex>
        <img className='home_logo' src={homeLogo} />
      </div>
    </div>
  );
};
export default Index;
