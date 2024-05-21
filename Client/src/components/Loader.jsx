import { Spin } from 'antd';

const Loader = ({ loading }) => {
  return <Spin size="large" fullscreen tip="Loading..." spinning={loading} />;
};

export default Loader;
