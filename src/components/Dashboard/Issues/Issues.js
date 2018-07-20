import React, { Component, Fragment } from 'react';
import { Layout, Breadcrumb } from 'antd';
import PropTypes from 'prop-types';

import { errorNotify } from '../../../helpers/messageNotify';


const { Content } = Layout;

class Issues extends Component {
  componentDidMount = async () => {
    const { success, errors } = await this.props.viewCurrentUserIssues();
    if (success === false) {
      errorNotify(errors.name);
    }
  }

  render() {
    return (
      <Fragment>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Issues</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{
          background: '#fff',
          padding: 24,
          margin: 0,
          minHeight: 480,
        }}
        >
        Issues
          <ul>
            {
              this.props.issues.map(issues => (
                <li key={issues.id} id={issues.id}>
                  {issues.title}
                </li>
              ))
            }
          </ul>
        </Content>
      </Fragment>
    );
  }
}

Issues.propTypes = {
  viewCurrentUserIssues: PropTypes.func.isRequired,
  issues: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Issues;
