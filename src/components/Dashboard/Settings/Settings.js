import React, { Component, Fragment } from 'react';
import {
  Layout,
  Breadcrumb,
  Row,
  Col,
  Tooltip,
} from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { errorNotify } from '../../../helpers/messageNotify';
import StyledComponents from '../../StyledComponents';
import LoadingCard from '../../LoadingCard';
import routes from '../../../config/routes';


const { Content } = Layout;

const StyledAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const RowWithMargin = styled(Row)`
  margin-top: 20px;
`;

const { LargeBadge, OAuthButton } = StyledComponents;

class Settings extends Component {
  state = {
    isPageLoading: true,
  }
  componentDidMount = async () => {
    const wakatimeResponse = await this.props.ifWakatimeTokenExists();
    if (wakatimeResponse.exists === false) {
      errorNotify('Please link your WakaTime account!');
      this.props.history.push(routes.OAuthSetup);
      return;
    } else if (wakatimeResponse.exists === true) {
      const responseWakatimeDetails = await this.props.viewCurrentUserWakatimeDetails();
      if (responseWakatimeDetails.success === false) {
        errorNotify(responseWakatimeDetails.errors.name);
        return;
      }
    } else {
      errorNotify(wakatimeResponse.errors.name);
      return;
    }

    const githubResponse = await this.props.ifGithubTokenExists();
    if (githubResponse.exists === false) {
      errorNotify('Please link your GitHub account!');
      this.props.history.push(routes.OAuthSetup);
      return;
    } else if (githubResponse.exists !== true) {
      errorNotify(wakatimeResponse.errors.name);
      return;
    }

    this.setState({
      isPageLoading: false,
    });
  }
  render() {
    const { wakatime } = this.props.userDetails;

    const lastHeartbeat = wakatime.last_heartbeat;

    const now = moment();
    const momentLastHeartbeat = moment(lastHeartbeat);

    const diffInMinutes = now.diff(momentLastHeartbeat, 'minutes');

    let activeStatus = false;
    if (diffInMinutes <= 2) {
      activeStatus = true;
    } else {
      activeStatus = false;
    }

    const { isPageLoading } = this.state;

    return (
      <Fragment>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Settings</Breadcrumb.Item>
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
              <Row type="flex" justify="center" style={{ padding: '10px 0', textAlign: 'center' }}>
                <Col span={12}>
                  <OAuthButton>
                    <Link to="/setup-2">Connect WakaTime/GitHub accounts</Link>
                  </OAuthButton>
                </Col>
              </Row>
              <Row style={{ textAlign: 'center', marginTop: '50px' }}>
                <Col span={12}>
                  <h2>WakaTime User Details</h2>
                  <Row style={{ display: 'flex', justifyContent: 'center' }}>
                    <Col span={18}>
                      <Row>
                        <div style={{ position: 'relative' }}>
                          <StyledAvatar src={wakatime.photo} alt={wakatime.display_name} />
                        </div>
                      </Row>
                      <RowWithMargin>
                        <h4>Display Name:</h4>
                        { wakatime.display_name }
                      </RowWithMargin>
                      <RowWithMargin>
                        <h4>Email:</h4>
                        { wakatime.email }
                      </RowWithMargin>
                      <RowWithMargin>
                        <h4>Last Active:</h4>
                        { moment(wakatime.last_heartbeat).format('DD MMM, YYYY HH:mm A') }
                      </RowWithMargin>
                      <RowWithMargin>
                        <h4>Last Active On:</h4>
                        { wakatime.last_plugin_name }
                      </RowWithMargin>
                      <RowWithMargin>
                        <h4>Last Project:</h4>
                        { wakatime.last_project }
                      </RowWithMargin>
                      <RowWithMargin>
                        <h4>Location:</h4>
                        { wakatime.location }
                      </RowWithMargin>
                      <RowWithMargin>
                        <h4>Status:</h4>
                        {
                          activeStatus ?
                            (
                              <Tooltip title="active">
                                <LargeBadge status="success" />
                              </Tooltip>
                            ) :
                            (
                              <Tooltip title="away">
                                <LargeBadge status="error" />
                              </Tooltip>
                            )
                        }
                      </RowWithMargin>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <h2>GitHub User Details</h2>
                </Col>
              </Row>
            </Fragment>
          </LoadingCard>
        </Content>
      </Fragment>
    );
  }
}

Settings.propTypes = {
  userDetails: PropTypes.shape({
    wakatime: PropTypes.shape({}).isRequired,
  }).isRequired,
  viewCurrentUserWakatimeDetails: PropTypes.func.isRequired,
  ifWakatimeTokenExists: PropTypes.func.isRequired,
  ifGithubTokenExists: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Settings;

