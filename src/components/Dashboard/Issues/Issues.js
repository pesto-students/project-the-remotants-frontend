import React, { Component, Fragment } from 'react';
import {
  Layout,
  Breadcrumb,
  Tree,
  Row,
  Col,
} from 'antd';
import PropTypes from 'prop-types';

import { errorNotify } from '../../../helpers/messageNotify';
import LoadingCard from '../../LoadingCard';


const { Content } = Layout;
const { TreeNode } = Tree;

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

  clickIssueHandler = ([issueLocation]) => {
    window.open(issueLocation, '_blank');
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
            <Fragment>
              <Row style={{ marginBottom: '20px' }}>
                <Col span={24}>
                  <h2 style={{ marginBottom: '0px' }}>Issues</h2>
                </Col>
              </Row>
              <Row>
                <Tree showLine onSelect={this.clickIssueHandler}>
                  {
                    this.props.issues.map(issue => (
                      <TreeNode
                        title={issue.title}
                        key={issue.html_url}
                        selectable
                        isLeaf
                      />
                    ))
                  }
                </Tree>
              </Row>
            </Fragment>
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
