import { Layout } from 'antd';
import Header from './Header';
import Footer from './Footer';

const { Content } = Layout;

interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Content
        style={{
          padding: '24px',
          background: '#f6ffed',
          flex: 1,
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', minHeight: 'calc(100vh - 180px)' }}>
          {children}
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default AppLayout;
