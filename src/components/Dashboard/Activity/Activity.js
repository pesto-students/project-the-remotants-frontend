import React, { Component, Fragment } from 'react';
import {
  Layout,
  Breadcrumb,
  Calendar,
  Card,
  Row,
  Col,
  List,
} from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

import getFormattedTimeFromSeconds from '../../../helpers/getFormattedTimeFromSeconds';
import { loadingNotify, errorNotify } from '../../../helpers/messageNotify';
import VisualizationComponents from '../../VisualizationComponents';


const { Content } = Layout;
const { CustomPie } = VisualizationComponents;

const filterDurationsData = (data, totalDuration, threshold) => {
  const info = data.filter((d) => {
    const percent = ((Number(d.total_seconds) / totalDuration) * 100);
    if (percent > threshold) {
      return true;
    }
    return false;
  });
  return info;
};

const calcTotalDuration = (durations) => {
  return durations.reduce((total, data) => {
    return total + data.total_seconds;
  }, 0);
};

class Activity extends Component {
  constructor(props) {
    super(props);

    loadingNotify('Fetching Activity data...', 3000);
    const { selectedDate } = this.state;
    const date = selectedDate.format('YYYY-MM-DD');
    this.props.viewCurrentUserDurations(date);
  }

  state = {
    selectedDate: moment(),
  }

  onSelect = async (selectedDate) => {
    loadingNotify('Fetching Activity data...', 3000);

    this.setState({
      selectedDate,
    });

    const date = selectedDate.format('YYYY-MM-DD');
    const { success, errors } = await this.props.viewCurrentUserDurations(date);
    if (success !== true) {
      errorNotify(errors.name);
    }
  }

  render() {
    const { selectedDate } = this.state;
    const { durations } = this.props;

    let durationsInfo = [];
    if (durations.length > 0) {
      const threshold = '5';
      const totalDuration = calcTotalDuration(durations);
      durationsInfo = filterDurationsData(durations, totalDuration, threshold);
    }


    return (
      <Fragment>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Activity</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 480,
            textAlign: 'center',
          }}
        >
          <Card>
            <Row type="flex" style={{ justifyContent: 'space-around', alignItems: 'center' }}>
              <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
                <div>
                  <h3>Selected Date: {selectedDate.format('DD MMM, YYYY')}</h3>
                  <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                    <Calendar
                      fullscreen={false}
                      onSelect={this.onSelect}
                    />
                  </div>
                </div>
              </div>
              <div style={{ flex: '1' }}>
                {
                  (durationsInfo.length > 0) ? (
                    <Row>
                      <Col span={24}>
                        <CustomPie data={durationsInfo} width="400" height="340" />
                      </Col>
                    </Row>
                  ) : (
                    <p> Nothing found for {selectedDate.format('DD MMM, YYYY')} </p>
                  )
                }
              </div>
              <div style={{ flex: '1' }}>
                {
                  (durations.length > 0) ? (
                    <List
                      itemLayout="horizontal"
                      dataSource={durationsInfo}
                      bordered
                      renderItem={item => (
                        <List.Item>
                          <List.Item.Meta
                            title={item.name}
                            description={getFormattedTimeFromSeconds(item.total_seconds)}
                          />
                        </List.Item>
                      )}
                    />
                  ) : (
                    <p> Nothing found for {selectedDate.format('DD MMM, YYYY')} </p>
                  )
                }
              </div>
            </Row>
          </Card>

        </Content>
      </Fragment>
    );
  }
}

Activity.propTypes = {
  viewCurrentUserDurations: PropTypes.func.isRequired,
  durations: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Activity;

