import React from 'react';
import {
  Row,
  Col,
  Card,
} from 'antd';

import Signup from '../Signup';
import Login from '../Login';
import StyledComponents from '../StyledComponents';


const { UppercaseH1, UppercaseH2 } = StyledComponents;

const Auth = ({ ...rest }) => (
  <div data-test="registerAndLoginPage">
    <Row style={{ paddingTop: '50px' }}>
      <UppercaseH1 style={{ textAlign: 'center' }}>
        The Remotants
      </UppercaseH1>
    </Row>
    <Row style={{ paddingTop: '20px', paddingBottom: '50px', marginTop: '30px' }} gutter={24}>
      <Col md={24} lg={12}>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <UppercaseH2>
              Register
            </UppercaseH2>
            <br />
            <Signup {...rest} />
          </div>
        </Card>
      </Col>
      <Col md={24} lg={12}>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <UppercaseH2>
              Login
            </UppercaseH2>
            <br />
            <Login {...rest} />
          </div>
        </Card>
      </Col>
    </Row>
  </div>
);

export default Auth;

