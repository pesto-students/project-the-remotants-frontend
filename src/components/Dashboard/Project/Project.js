import React, { Component, Fragment } from 'react';
import {
  Layout,
  Breadcrumb,
  Tree,
  Row,
  Col,
} from 'antd';
import PropTypes from 'prop-types';

import { errorNotify, loadingNotify } from '../../../helpers/messageNotify';
import LoadingCard from '../../LoadingCard';
import changeDateFormat from '../../../helpers/changeDateFormat';
import { DATE_FORMAT_CONSTANTS } from '../../../config/constants';


const { Content } = Layout;
const { TreeNode } = Tree;

class Project extends Component {
  state = {
    isPageLoading: true,
  }
  componentDidMount = async () => {
    const { success, errors } = await this.props.viewCurrentUserProjects();
    this.setState({
      isPageLoading: false,
    });
    if (success === false) {
      errorNotify(errors.name);
    }
  }

  onLoadCommits = async (treeNode) => {
    if (treeNode.props.children) {
      return;
    }

    loadingNotify('Loading Commits...', 3000);
    const selectedProjectID = treeNode.props.dataRef.id;
    const { success, errors } = await this.props.viewProjectCommits(selectedProjectID);
    if (success === false) {
      errorNotify(errors.name);
    }
  }

  renderTreeNodes = (data = []) => {
    return data.map((item) => {
      if (item.commits) {
        return (
          <TreeNode title={item.name} key={item.id} dataRef={{ ...item, commits: [] }}>
            {
              item.commits.map((commit) => {
                return (
                  <TreeNode
                    title={`${commit.message} by ${commit.committer_name} at ${changeDateFormat(commit.committer_date, DATE_FORMAT_CONSTANTS.HUMAN_READABLE_DATE_TIME_FORMAT)} `}
                    key={commit.hash}
                    isLeaf
                  />
                );
              })
            }
          </TreeNode>
        );
      }
      return <TreeNode title={item.name} key={item.id} dataRef={item} />;
    });
  }

  render() {
    const { isPageLoading } = this.state;
    const { projects } = this.props;
    return (
      <Fragment>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Projects</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 480,
          }}
        >
          <LoadingCard loading={isPageLoading}>
            { projects &&
              (
                <Fragment>
                  <Row style={{ marginBottom: '20px' }}>
                    <Col span={24}>
                      <h2 style={{ marginBottom: '0px' }}>Projects</h2>
                    </Col>
                    <Col span={24}>
                      <small style={{ color: '#ff5454' }}>(Click on the projects to view the commits)</small>
                    </Col>
                  </Row>
                  <Row>
                    <Tree showLine loadData={this.onLoadCommits}>
                      {this.renderTreeNodes(projects)}
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

Project.propTypes = {
  viewCurrentUserProjects: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  viewProjectCommits: PropTypes.func.isRequired,
};

export default Project;

