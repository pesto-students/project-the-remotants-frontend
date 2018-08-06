import React from 'react';
import { Row, Col } from 'antd';

import Signup from '../Signup';
import Login from '../Login';


const Auth = ({ ...rest }) => (
  <div data-test="registerAndLoginPage">
    <Row style={{ paddingTop: '50px' }}>
      <h1 style={{ textAlign: 'center' }}>The Remotants</h1>
    </Row>
    <Row style={{ paddingTop: '20px', paddingBottom: '50px' }}>
      <Col span={12} style={{ borderRight: '1px solid #ccc' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Register here</h2>
          <Signup {...rest} />
        </div>
      </Col>
      <Col span={12} style={{ borderLeft: '1px solid #ccc' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Login here</h2>
          <Login {...rest} />
        </div>
      </Col>
    </Row>
  </div>
);

export default Auth;

