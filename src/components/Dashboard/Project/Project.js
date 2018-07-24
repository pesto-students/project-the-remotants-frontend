import React, { Component, Fragment } from 'react';
import { Layout, Breadcrumb } from 'antd';
import PropTypes from 'prop-types';


import { errorNotify, loadingNotify } from '../../../helpers/messageNotify';
import LoadingCard from '../../LoadingCard';


const { Content } = Layout;

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

  viewCommitsHandler = async (projectId) => {
    loadingNotify('Loading Commits...', 3000);
    const { success, errors } = await this.props.viewProjectCommits(projectId);
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
            <ul>
              {
                this.props.projects.map(project => (
                  <li key={project.id} id={project.id}>
                    {project.name}
                    <button
                      onClick={() => this.viewCommitsHandler(project.id)}
                    >
                        View Commits
                    </button>

                    {
                      project.commits !== undefined &&
                      <ul>
                        {
                          project.commits.map(commit => (
                            <li key={commit.hash}>
                              <a href={commit.html_url}>
                                Commit Message: {commit.message}
                                <br />
                                {commit.committer_name} ({commit.committer_username})
                                <img src={commit.committer_avatar_url} alt={commit.committer_name} style={{ width: '50px' }} />
                              </a>
                            </li>
                          ))
                        }
                      </ul>
                    }
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

Project.propTypes = {
  viewCurrentUserProjects: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  viewProjectCommits: PropTypes.func.isRequired,
};

export default Project;

