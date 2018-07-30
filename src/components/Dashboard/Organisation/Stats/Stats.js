import React, { Component, Fragment } from 'react';
import {
  Layout,
  Breadcrumb,
  Button,
  Icon,
  List,
  Card,
  Row,
  Col,
} from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';


import { errorNotify } from '../../../../helpers/messageNotify';
import apiRoutes from '../../../../config/apiRoutes';
import VisualizationComponents from '../../../VisualizationComponents';
import LoadingCard from '../../../LoadingCard';
import getFormattedTimeFromSeconds from '../../../../helpers/getFormattedTimeFromSeconds';
import { STATS_CONSTANTS, DATE_FORMAT_CONSTANTS } from '../../../../config/constants';
import changeDateFormat from '../../../../helpers/changeDateFormat';


const { Content } = Layout;
const { CustomPie, CustomBar } = VisualizationComponents;


const listData = [
  {
    title: STATS_CONSTANTS.USER,
    description: '',
  },
  {
    title: STATS_CONSTANTS.DURATION,
    description: '',
  },
  {
    title: STATS_CONSTANTS.TIMEOUT,
    description: '',
  },
  {
    title: STATS_CONSTANTS.TOTAL,
    description: '',
  },
  {
    title: STATS_CONSTANTS.DAILY_AVERAGE,
    description: '',
  },
  {
    title: STATS_CONSTANTS.BEST_DAY,
    description: '',
  },
];

const filterImportantData = (data, threshold) => {
  const info = data.filter((d) => {
    if (d.percent > threshold) {
      return true;
    }
    return false;
  });
  return info;
};

const capitalizeString = str => (str.charAt(0).toUpperCase() + str.slice(1).split('_').join(' '));

const filterOtherImportantData = ({
  username,
  range,
  timeout,
  total,
  dailyAverage,
  bestDay,
}) => (
  listData.map((info) => {
    switch (info.title) {
      case STATS_CONSTANTS.USER:
        return {
          ...info,
          description: username,
        };
      case STATS_CONSTANTS.DURATION:
        return {
          ...info,
          description: capitalizeString(range),
        };
      case STATS_CONSTANTS.TIMEOUT:
        return {
          ...info,
          description: `${timeout} mins`,
        };
      case STATS_CONSTANTS.TOTAL:
        return {
          ...info,
          description: total,
        };
      case STATS_CONSTANTS.DAILY_AVERAGE:
        return {
          ...info,
          description: dailyAverage,
        };
      case STATS_CONSTANTS.BEST_DAY:
        return {
          ...info,
          description:
            `
              ${changeDateFormat(bestDay.date, DATE_FORMAT_CONSTANTS.HUMAN_READABLE_DATE_FORMAT)}:
              ${getFormattedTimeFromSeconds(bestDay.total_seconds)}
            `,
        };
      default:
        return info;
    }
  })
);


class Stats extends Component {
  state = {
    isPageLoading: true,
    categories: [],
    languages: [],
    projects: [],
    other: listData,
  }
  componentDidMount = async () => {
    const { userID } = this.props.match.params;
    try {
      const config = {
        method: 'GET',
      };
      const res = await axios(`${apiRoutes.Wakatime.OrganisationMemberStats}/${userID}`, config);
      const { success, data, errors } = res.data;

      // threshold is in percent
      const threshold = '10';

      const categoriesInfo = filterImportantData(data.editors, threshold);
      const languagesInfo = filterImportantData(data.languages, threshold);
      const projectsInfo = filterImportantData(data.projects, threshold);
      const otherInfo = filterOtherImportantData({
        username: data.username,
        range: data.range,
        timeout: data.timeout,
        total: data.human_readable_total,
        dailyAverage: data.human_readable_daily_average,
        bestDay: data.best_day,
      });

      this.setState({
        isPageLoading: false,
      });

      if (success === true) {
        this.setState({
          categories: categoriesInfo,
          languages: languagesInfo,
          projects: projectsInfo,
          other: otherInfo,
        });
      } else {
        errorNotify(errors.name);
      }
    } catch (e) {
      errorNotify('Caught errors while fetching user details from WakaTime');
    }
  }

  onGoBack = () => {
    this.props.history.goBack();
  }

  render() {
    const {
      isPageLoading,
      other,
      categories,
      languages,
      projects,
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
              <Button onClick={this.onGoBack} style={{ marginBottom: '20px' }}>
                <Icon type="left" />Go Back
              </Button>
              <List
                itemLayout="horizontal"
                dataSource={other}
                bordered
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
              {
                (projects.length > 0) && (
                  <Card style={{ marginTop: '30px', textAlign: 'center' }}>
                    <Row>
                      <Col>
                        <h2>Projects</h2>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <CustomBar data={projects} width="500" height="400" />
                      </Col>
                      <Col span={12}>
                        <CustomPie data={projects} width="500" height="400" />
                      </Col>
                    </Row>
                  </Card>
                )
              }
              {
                (languages.length > 0) && (
                  <Card style={{ marginTop: '30px', textAlign: 'center' }}>
                    <Row>
                      <Col>
                        <h2>Languages</h2>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <CustomBar data={languages} width="500" height="400" />
                      </Col>
                      <Col span={12}>
                        <CustomPie data={languages} width="500" height="400" />
                      </Col>
                    </Row>
                  </Card>
                )
              }
              {
                (categories.length > 0) && (
                  <Card style={{ marginTop: '30px', textAlign: 'center' }}>
                    <Row>
                      <Col>
                        <h2>Categories</h2>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <CustomBar data={categories} width="500" height="400" />
                      </Col>
                      <Col span={12}>
                        <CustomPie data={categories} width="500" height="400" />
                      </Col>
                    </Row>
                  </Card>
                )
              }
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

