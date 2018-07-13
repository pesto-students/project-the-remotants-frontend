import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

import Signup from '../Signup';
import Login from '../Login';


const Auth = ({ auth: { errors }, ...rest }) => (
  <Fragment>
    {
      errors &&
      <div>
        {
          Object.values(errors).map(error => (
            <p key={error.replace(/ /g, '').toLowerCase()}>{error}</p>
          ))
        }
      </div>
    }
    <Row>
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
  </Fragment>
);

Auth.propTypes = {
  auth: PropTypes.shape({
    errors: PropTypes.shape({}),
  }).isRequired,
};

export default Auth;

