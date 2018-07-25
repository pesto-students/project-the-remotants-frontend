import React, { Component, Fragment } from 'react';
import { Layout, Breadcrumb } from 'antd';
import PropTypes from 'prop-types';

import { errorNotify } from '../../../helpers/messageNotify';


const { Content } = Layout;

class Repos extends Component {
  componentDidMount = async () => {
    const { success, errors } = await this.props.viewCurrentUserRepos();
    if (success === false) {
      errorNotify(errors.name);
    }
  }

  viewPullRequestsHandler = async (owner, repoName) => {
    const { success, errors } = await this.props.viewRepoPullRequests(owner, repoName);
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
          <Breadcrumb.Item>Repos</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{
          background: '#fff',
          padding: 24,
          margin: 0,
          minHeight: 480,
        }}
        >
        Repos
          <ul>
            {
              this.props.repos.map(repo => (
                <li key={repo.id} id={repo.id}>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                  <button
                    style={{ marginLeft: 20 }}
                    onClick={() => this.viewPullRequestsHandler(
                      repo.owner.login,
                      repo.name,
                    )}
                  >
                    View Pull Requests
                  </button>
                  {
                  repo.pullRequests !== undefined &&
                  <ul>
                    {
                      repo.pullRequests.map(pullRequest => (
                        <li key={pullRequest.id}>
                          <a href={pullRequest.html_url} target="_blank" rel="noopener noreferrer">
                            Pull Request Title: {pullRequest.title}
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

Repos.propTypes = {
  viewCurrentUserRepos: PropTypes.func.isRequired,
  viewRepoPullRequests: PropTypes.func.isRequired,
  repos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Repos;
