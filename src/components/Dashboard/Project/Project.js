import React, { Component, Fragment } from 'react';
import { Layout, Breadcrumb } from 'antd';
import PropTypes from 'prop-types';


import { errorNotify } from '../../../helpers/messageNotify';


const { Content } = Layout;

class Project extends Component {
  componentDidMount = async () => {
    const { success, errors } = await this.props.viewCurrentUserProjects();
    if (success === false) {
      errorNotify(errors.name);
    }
  }

  viewCommitsHandler = async (projectId) => {
    const { success, errors } = await this.props.viewProjectCommits(projectId);
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
          <Breadcrumb.Item>Projects</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 480,
          }}
        >
          Projects
          <ul>
            {
              this.props.projects.map(project => (
                <li key={project.id} id={project.id}>
                  {project.name}
                  <button onClick={() => this.viewCommitsHandler(project.id)}>View Commits</button>

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

