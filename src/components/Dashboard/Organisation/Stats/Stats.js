import React, { Component, Fragment } from 'react';
import {
  Layout,
  Breadcrumb,
  Button,
  Icon,
} from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';


import { errorNotify } from '../../../../helpers/messageNotify';
import apiRoutes from '../../../../config/apiRoutes';
import getFormattedTimeFromSeconds from '../../../../helpers/getFormattedTimeFromSeconds';
import VisualizationComponents from '../../../VisualizationComponents';
import StyledComponents from '../../../StyledComponents';
import LoadingCard from '../../../LoadingCard';


const { Content } = Layout;
const { CustomPie, CustomBar } = VisualizationComponents;
const { LargeBadge } = StyledComponents;


class Stats extends Component {
  state = {
    isPageLoading: true,
    bestDay: {},
    daysMinusHolidays: 0,
    editors: [],
    humanReadableDailyAverage: '',
    humanReadableTotal: '',
    isUpToDate: false,
    languages: [],
    projects: [],
    start: '',
    end: '',
    username: '',
    range: '',
    timeout: 0,
  }
  componentDidMount = async () => {
    const { userID } = this.props.match.params;
    try {
      const config = {
        method: 'GET',
      };
      const res = await axios(`${apiRoutes.Wakatime.OrganisationMemberStats}/${userID}`, config);
      const { success, data, errors } = res.data;

      this.setState({
        isPageLoading: false,
      });

      if (success === true) {
        this.setState({
          bestDay: data.best_day,
          daysMinusHolidays: data.days_minus_holidays,
          editors: data.editors,
          humanReadableDailyAverage: data.human_readable_daily_average,
          humanReadableTotal: data.human_readable_total,
          isUpToDate: data.is_up_to_date,
          languages: data.languages,
          projects: data.projects,
          start: data.start,
          end: data.end,
          username: data.username,
          range: data.range,
          timeout: data.timeout,
        });
      } else {
        errorNotify(errors.name);
      }
    } catch (e) {
      errorNotify('Caught errors while fetching user detailsd from WakaTime');
    }
  }

  onGoBack = () => {
    this.props.history.goBack();
  }

  render() {
    const {
      isPageLoading,
      bestDay,
      daysMinusHolidays,
      editors,
      humanReadableDailyAverage,
      humanReadableTotal,
      isUpToDate,
      languages,
      projects,
      start,
      end,
      username,
      range,
      timeout,
    } = this.state;
    return (
      <Fragment>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Organisation</Breadcrumb.Item>
          <Breadcrumb.Item>Track</Breadcrumb.Item>
          <Breadcrumb.Item>Stats</Breadcrumb.Item>
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
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>Tracking { range === 'last_7_days' ? 'Last 7 Days' : '' }</h1>
                <Button onClick={this.onGoBack}>
                  <Icon type="left" />Go Back
                </Button>
              </div>
              <h3>
                From: {start && moment(start).format('DD MMM, YYYY HH:mm A')}<br />
                To: {end && moment(end).format('DD MMM, YYYY HH:mm A')}
              </h3>
              <h3>
                User: {username}
              </h3>
              <h3>
                Timeout: {timeout} mins
              </h3>
              <h3>
                Daily Average: {humanReadableDailyAverage} <br />
                Total: {humanReadableTotal}
              </h3>
              <h3>
                Days minus Holidays: {daysMinusHolidays}
              </h3>
              <h4>
                { isUpToDate &&
                  (
                    <p> Is it upto date?
                      { isUpToDate ? <LargeBadge status="success" /> : <LargeBadge status="error" /> }
                    </p>
                  )
                }
              </h4>
              {
                projects && (
                  <Fragment>
                    <h2>Projects</h2>
                    <CustomBar data={projects} width="600" height="400" />
                  </Fragment>
                )
              }
              {
                projects && (
                  <CustomPie data={projects} width="400" height="400" thresholdVal={5000} />
                )
              }
              {
                languages && (
                  <Fragment>
                    <h2>Languages</h2>
                    <CustomBar data={languages} width="600" height="400" />
                  </Fragment>
                )
              }
              {
                languages && (
                  <CustomPie data={languages} width="400" height="400" thresholdVal={5000} />
                )
              }
              {
                editors && (
                  <Fragment>
                    <h2>Editors</h2>
                    <CustomBar data={editors} width="600" height="400" />
                  </Fragment>
                )
              }
              {
                editors && (
                  <CustomPie data={editors} width="400" height="400" thresholdVal={5000} />
                )
              }
              <h3>Best Day</h3>
              Date: { bestDay.date } <br />
              Total Time Spent:
              { bestDay.total_seconds && getFormattedTimeFromSeconds(bestDay.total_seconds) }
            </Fragment>
          </LoadingCard>
        </Content>
      </Fragment>
    );
  }
}

Stats.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userID: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};


export default Stats;

