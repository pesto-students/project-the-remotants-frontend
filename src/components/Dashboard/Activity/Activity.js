import React, { Component, Fragment } from 'react';
import { Layout, Breadcrumb, Calendar } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

import getFormattedTimeFromSeconds from '../../../helpers/getFormattedTimeFromSeconds';


const { Content } = Layout;

class Activity extends Component {
  state = {
    value: moment(),
  }

  onSelect = (value) => {
    this.setState({
      value,
    });

    const date = value.format('YYYY-MM-DD');
    // make the request
    this.props.viewCurrentUserDurations(date);
  }
  render() {
    const { value } = this.state;
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
          <div>
            Activity
          </div>
          <h3>Selected Date: {value.format('DD MMM, YYYY')}</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
              <Calendar
                value={value}
                fullscreen={false}
                onSelect={this.onSelect}
              />
            </div>
          </div>
          <div>
            {
              this.props.durations.map(duration => (
                <li key={duration.project}>
                  <h4>
                    {duration.project}
                  </h4>
                  <h3>
                    {getFormattedTimeFromSeconds(duration.duration)}
                  </h3>
                </li>
              ))
            }
          </div>

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

