import React, { Component } from 'react';
import { Button, Row, Col, Card, Icon } from 'antd';
import axios from 'axios';
import store from 'store';
import PropTypes from 'prop-types';

import authConfig from '../../config/authConfig';
import { LOCAL_STORAGE_GITHUB, LOCAL_STORAGE_WAKATIME } from '../../config/constants';
import {
  successNotify,
  errorNotify,
  warningNotify,
  loadingNotify,
} from '../../helpers/messageNotify';
import checkLocalStorage from '../../helpers/checkLocalStorageExists';
import routes from '../../config/routes';
import StyledComponents from '../StyledComponents';


const {
  UppercaseH1,
  UppercaseH3,
  OAuthAnchor,
  OAuthButton,
  OAuthSuccessButton,
} = StyledComponents;


class OAuthSetup extends Component {
  state = {
    isLoadingGithub: false,
    isLoadingWakatime: false,
    isGithubConnected: false,
    isWakatimeConnected: false,
  }
  async componentDidMount() {
    const isWakatimeConnected = checkLocalStorage(LOCAL_STORAGE_WAKATIME);
    const isGithubConnected = checkLocalStorage(LOCAL_STORAGE_GITHUB);

    if (isGithubConnected === true) {
      this.setState({
        isGithubConnected: true,
      });
      return;
    }

    if (isWakatimeConnected === true) {
      this.setState({
        isWakatimeConnected: true,
      });
      return;
    }

    const params = (new URL(document.location)).searchParams;
    const code = params.get('code');
    const auth = params.get('auth');

    if (code !== null) {
      if (auth === 'github') {
        loadingNotify('Authenticating GitHub...', 3000);
        const response = await axios.get(`${authConfig.GITHUB_BACKEND_AUTH_URL}/${code}`);
        const { success, errors, token } = response.data;

        this.setState({
          isLoadingGithub: false,
        });

        if (success === true) {
          successNotify('Your GitHub account is now connected!');
          store.set(LOCAL_STORAGE_GITHUB, token);
          this.setState({
            isGithubConnected: true,
          });
        } else {
          errorNotify(errors.name);
        }
      } else if (auth === 'wakatime') {
        loadingNotify('Authenticating WakaTime...', 3000);
        const response = await axios.get(`${authConfig.WAKATIME_BACKEND_AUTH_URL}/${code}`);
        const { success, errors, token } = response.data;

        this.setState({
          isLoadingWakatime: false,
        });

        if (success === true) {
          successNotify('Your WakaTime account is now connected!');
          store.set(LOCAL_STORAGE_WAKATIME, token);
          this.setState({
            isWakatimeConnected: true,
          });
        } else {
          errorNotify(errors.name);
        }
      }
    }
  }
  onContinueHandler = () => {
    this.props.history.push(routes.Dashboard);
  }
  githubClickHandler = (e) => {
    if (checkLocalStorage(LOCAL_STORAGE_GITHUB) === true) {
      e.preventDefault();
      warningNotify('Your GitHub account is already linked!');
    } else {
      loadingNotify('Connecting to GitHub...', 1000);
      this.setState({
        isLoadingGithub: true,
      });
    }
  }
  wakatimeClickHandler = (e) => {
    if (checkLocalStorage(LOCAL_STORAGE_WAKATIME) === true) {
      e.preventDefault();
      warningNotify('Your WakaTime account is already linked!');
    } else {
      loadingNotify('Connecting to WakaTime...', 1000);
      this.setState({
        isLoadingWakatime: true,
      });
    }
  }

  render() {
    const {
      isLoadingGithub,
      isLoadingWakatime,
      isGithubConnected,
      isWakatimeConnected,
    } = this.state;
    return (
      <Row type="flex" justify="center" style={{ textAlign: 'center' }}>
        <Col xs={24} sm={24} lg={12}>
          <UppercaseH1>On Boarding: Step 2</UppercaseH1>
          <Card style={{ marginTop: '50px' }}>
            <UppercaseH3 style={{ marginBottom: '50px' }}>Connect your GitHub and WakaTime accounts</UppercaseH3>
            <div style={{ padding: '10px 0' }}>
              <Row style={{ marginBottom: '10px' }}>
                <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                  {
                    isGithubConnected ?
                    (
                      <OAuthSuccessButton>
                        <Icon style={{ height: '14px', color: '#aaa' }} type="check" />
                        GitHub
                      </OAuthSuccessButton>
                    ) :
                    (
                      <OAuthButton loading={isLoadingGithub}>
                        <OAuthAnchor
                          onClick={this.githubClickHandler}
                          href={authConfig.GITHUB_OAUTH_URI}
                        >
                          <Icon style={{ height: '14px' }} type="github" />&nbsp;GitHub
                        </OAuthAnchor>
                      </OAuthButton>
                    )
                  }
                </Col>
              </Row>
              <Row style={{ marginTop: '10px' }}>
                <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                  {
                    isWakatimeConnected ?
                    (
                      <OAuthSuccessButton>
                        <Icon style={{ height: '14px', color: '#aaa' }} type="check" />
                        WakaTime
                      </OAuthSuccessButton>
                    ) :
                    (
                      <OAuthButton loading={isLoadingWakatime}>
                        <OAuthAnchor
                          onClick={this.wakatimeClickHandler}
                          href={authConfig.WAKATIME_OAUTH_URI}
                        >
                          <img style={{ height: '14px' }} alt="wakatime" src="/public/images/wakatime.svg" />&nbsp;WakaTime
                        </OAuthAnchor>
                      </OAuthButton>
                    )
                  }
                </Col>
              </Row>
            </div>
            <Row style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3em' }}>
              <Button type="danger" onClick={this.onContinueHandler}>
                Continue<Icon type="right" />
              </Button>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}

OAuthSetup.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};


export default OAuthSetup;
