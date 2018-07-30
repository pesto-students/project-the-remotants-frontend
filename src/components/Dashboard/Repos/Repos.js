import React, { Component, Fragment } from 'react';
import { Layout, Breadcrumb, Tree, Row, Col } from 'antd';
import PropTypes from 'prop-types';

import { errorNotify, loadingNotify } from '../../../helpers/messageNotify';
import LoadingCard from '../../LoadingCard';


const { Content } = Layout;
const { TreeNode } = Tree;

class Repos extends Component {
  state = {
    isPageLoading: true,
  }
  componentDidMount = async () => {
    const { success, errors } = await this.props.viewCurrentUserRepos();
    this.setState({
      isPageLoading: false,
    });
    if (success === false) {
      errorNotify(errors.name);
    }
  }

  onLoadPullRequests = async (treeNode) => {
    if (treeNode.props.children) {
      return;
    }
    loadingNotify('Loading Pull Requests...', 3000);
    const { owner: { login }, name } = treeNode.props.dataRef;
    const { success, errors } = await this.props.viewRepoPullRequests(login, name);
    if (success === false) {
      errorNotify(errors.name);
    }
  }

  onSelectPullRequests = ([location]) => {
    if (location && location.includes('https')) {
      window.open(location, '_blank');
    }
  }

  renderTreeNodes = (data = []) => {
    return data.map((item) => {
      if (item.pullRequests) {
        return (
          <TreeNode title={item.name} key={item.html_url} dataRef={{ ...item, pullRequests: [] }}>
            {
              item.pullRequests.map((pull) => {
                return (
                  <TreeNode
                    title={`${pull.title}`}
                    key={pull.html_url}
                    isLeaf
                  />
                );
              })
            }
          </TreeNode>
        );
      }
      return <TreeNode title={item.name} key={item.html_url} dataRef={item} />;
    });
  }

  render() {
    const { isPageLoading } = this.state;
    const { repos } = this.props;
    return (
      <Fragment>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Repos</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{
          background: '#fff',
          padding: 24,
          margin: 0,
          minHeight: 480,
        }}
        >
          <LoadingCard loading={isPageLoading}>
            { repos &&
              (
                <Fragment>
                  <Row style={{ marginBottom: '20px' }}>
                    <Col span={24}>
                      <h2 style={{ marginBottom: '0px' }}>Repos</h2>
                    </Col>
                    <Col span={24}>
                      <small style={{ color: '#ff5454' }}>(Click on the repos to view the pull requests)</small>
                    </Col>
                  </Row>
                  <Row>
                    <Tree
                      showLine
                      loadData={this.onLoadPullRequests}
                      onSelect={this.onSelectPullRequests}
                    >
                      {this.renderTreeNodes(repos)}
                    </Tree>
                  </Row>
                </Fragment>
              )
              }
          </LoadingCard>
        </Content>
      </Fragment>
    );
  }
}

Repos.propTypes = {
  viewCurrentUserRepos: PropTypes.func.isRequired,
  viewRepoPullRequests: PropTypes.func.isRequired,
  repos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Repos;
