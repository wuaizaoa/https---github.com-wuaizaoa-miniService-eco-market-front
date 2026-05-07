import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loading: React.FC = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '200px' 
    }>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </div>
  );
};

export default Loading;
