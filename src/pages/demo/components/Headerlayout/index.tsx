import React from 'react';
import './index.less';

type SettingProps = {
  children: React.ReactNode;
};
export const Header: React.FC<SettingProps> = ({ children }) => {
  return <div className='hearder_layout'>{children}</div>;
};
