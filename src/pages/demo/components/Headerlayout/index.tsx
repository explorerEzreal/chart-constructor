import React from 'react';
import './index.less';

type SettingProps = {
  [key: string]: string;
};
export const Header: React.FC<SettingProps> = () => {
  return <div className='hearder_layout'>header</div>;
};
