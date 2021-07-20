import React from 'react'
import { Spin } from 'antd'

const RouterLoading = ({text}) => (
  <div style={{ padding: '100px 0', textAlign: 'center' }}>
    <Spin size="large" tip={text}/>
  </div>
);

RouterLoading.defaultProps = {
  text: '',
};

export default RouterLoading
