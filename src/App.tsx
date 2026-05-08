import { Outlet } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import AppLayout from './components/Layout';
import './assets/styles/global.css';

function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#722ED1',
          borderRadius: 8,
        },
        algorithm: theme.darkAlgorithm,
      }}
    >
      <AppLayout>
        <Outlet />
      </AppLayout>
    </ConfigProvider>
  );
}

export default App;
