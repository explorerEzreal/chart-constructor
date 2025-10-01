import { BrowserRouter } from 'react-router-dom';
import { Routers } from './router';
import './App.less';

/** 应用根组件：挂载路由 */
const App = () => (
  <BrowserRouter>
    <Routers />
  </BrowserRouter>
);

export default App;
