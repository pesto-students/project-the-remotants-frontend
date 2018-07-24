import React, { Component, Fragment } from 'react';
import { Layout, Breadcrumb } from 'antd';
import PropTypes from 'prop-types';

import { errorNotify } from '../../../helpers/messageNotify';
import LoadingCard from '../../LoadingCard';


const { Content } = Layout;

class Issues extends Component {
  state = {
    isPageLoading: true,
  }
  componentDidMount = async () => {
    const { success, errors } = await this.props.viewCurrentUserIssues();
    this.setState({
      isPageLoading: false,
    });
    if (success === false) {
      errorNotify(errors.name);
    }
  }

  render() {
    const { isPageLoading } = this.state;
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
          <LoadingCard loading={isPageLoading}>
            <ul>
              {
                this.props.issues.map(issue => (
                  <li key={issue.id} id={issue.id}>
                    <a href={issue.html_url} target="_blank" rel="noopener noreferrer">{issue.title}</a>
                  </li>
                ))
              }
            </ul>
          </LoadingCard>
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
