import React, { Component, Fragment } from 'react';
import { Button, Icon } from 'antd';
import PropTypes from 'prop-types';

import routes from '../../config/routes';


class Home extends Component {
  getStarted = () => {
    this.props.history.push(routes.Auth);
  }
  render() {
    return (
      <Fragment>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{ marginBottom: '0' }}>
            The Remotants
          </h1>
          <h4 style={{ color: '#777' }}>
            Transforming the way you perceive remote work
          </h4>
        </div>
        <h3 style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={this.getStarted}>
            Get Started<Icon type="right" />
          </Button>
        </h3>
      </Fragment>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
