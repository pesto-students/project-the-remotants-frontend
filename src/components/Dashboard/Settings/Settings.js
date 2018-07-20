import React, { Component, Fragment } from 'react';
import {
  Layout,
  Breadcrumb,
  Row,
  Col,
  Badge,
  Tooltip,
} from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import './Settings.css';

import { errorNotify } from '../../../helpers/messageNotify';


const { Content } = Layout;

const StyledAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const RowWithMargin = styled(Row)`
  margin-top: 20px;
`;

class Settings extends Component {
  componentDidMount = async () => {
    const { success, errors } = await this.props.viewCurrentUserWakatimeDetails();
    if (success === false) {
      errorNotify(errors.name);
    }
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
          Settings
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
                            <Badge status="success" />
                          </Tooltip>
                        ) :
                        (
                          <Tooltip title="away">
                            <Badge status="error" />
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
};

export default Settings;

