import React, { Component, Fragment } from 'react';
import {
  Layout,
  Breadcrumb,
  Calendar,
  Row,
  Col,
  List,
  Card,
  DatePicker,
} from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { AxisBottom } from '@vx/axis';
import { RadialGradient } from '@vx/gradient';
import { scaleBand, scaleLinear } from '@vx/scale';
import { max } from 'd3-array';

import getFormattedTimeFromSeconds from '../../../helpers/getFormattedTimeFromSeconds';
import { loadingNotify, errorNotify, infoNotify } from '../../../helpers/messageNotify';
import VisualizationComponents from '../../VisualizationComponents';
import LoadingCard from '../../LoadingCard';


const { Content } = Layout;
const { CustomPie } = VisualizationComponents;
const { RangePicker } = DatePicker;

const dateFormat = 'DD MMM, YYYY';
const requestDateFormat = 'YYYY-MM-DD';

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

const filterByCategoryName = categories => (
  categories.filter(category => category.name === 'Coding')
);

const sanitizeArray = array => (
  array.filter(item => !!item)
);

const disabledDate = current => (
  current && current > moment().endOf('day')
);

const x = d => moment(d.date, 'YYYY-MM-DD').format('DD MMM, YYYY');
const y = d => +d.hours * 100;

const CustomActivityBar = ({
  width,
  height,
  data,
}) => {
  if (width < 10) return null;

  // bounds
  const xMax = width;
  const yMax = height - 120;

  const x0Scale = scaleBand({
    rangeRound: [0, xMax],
    domain: data.map(x),
    padding: 0.8,
    tickFormat: () => val => (val),
  });

  // scales
  const xScale = scaleBand({
    rangeRound: [0, xMax],
    domain: data.map(x),
    padding: 0.8,
  });
  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, max(data, y)],
  });

  return (
    <svg width={width} height={height}>
      <RadialGradient from="#55bdd5" to="#4f3681" id="gradients" r="80%" />
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="#fff"
        rx={14}
      />
      <Group top={40}>
        {data.map((d) => {
          const barHeight = yMax - yScale(y(d));
          return (
            <Group key={`bar-${x(d)}`}>
              <Bar
                width={xScale.bandwidth()}
                height={barHeight}
                x={xScale(x(d))}
                y={yMax - barHeight}
                fill="url('#gradients')"
                data={{ x: x(d), y: y(d) }}
                onClick={info => () => {
                  const language = JSON.stringify(info.x);
                  infoNotify(`This is ${language}`);
                }}
              />
              <AxisBottom
                scale={x0Scale}
                top={yMax}
                stroke="#496D9F"
                tickStroke="#496D9F"
                tickLabelProps={() => ({
                  fill: '#383838',
                  fontSize: 12,
                  textAnchor: 'middle',
                })}
              />
            </Group>
          );
        })}
      </Group>
    </svg>
  );
};

CustomActivityBar.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

class Activity extends Component {
  state = {
    isPageLoading: true,
    selectedDate: moment(),
  }

  componentDidMount = async () => {
    const { selectedDate } = this.state;
    const date = selectedDate.format(requestDateFormat);

    const durationsResponse = await this.props.viewCurrentUserDurations(date);
    this.setState({
      isPageLoading: false,
    });
    if (durationsResponse.success !== true) {
      errorNotify(durationsResponse.errors.name);
    }
  }

  onSelect = async (selectedDate) => {
    loadingNotify('Fetching Activity data...', 3000);

    this.setState({
      selectedDate,
    });

    const date = selectedDate.format(requestDateFormat);
    const durationsResponse = await this.props.viewCurrentUserDurations(date);
    if (durationsResponse.success !== true) {
      errorNotify(durationsResponse.errors.name);
    }
  }

  onDateRangeChangeHandler = async (dateRange) => {
    loadingNotify('Fetching Activity data...', 3000);

    const [start, end] = dateRange;
    const formattedStartDate = moment(start).format(requestDateFormat);
    const formattedEndDate = moment(end).format(requestDateFormat);
    const durationsResponse =
      await this.props.viewCurrentUserDateRangeDurations(formattedStartDate, formattedEndDate);
    if (durationsResponse.success !== true) {
      errorNotify(durationsResponse.errors.name);
    }
  }

  render() {
    const { selectedDate, isPageLoading } = this.state;
    const { durationsStore: { durations, dateRangeDurations } } = this.props;
    let durationsInfo = [];
    if (durations.length > 0) {
      const threshold = '10';
      const totalDuration = calcTotalDuration(durations);
      durationsInfo = filterDurationsData(durations, totalDuration, threshold);
    }

    // combine categories and range
    const summarisedCategories = dateRangeDurations.map((info) => {
      const filteredCategory = filterByCategoryName(info.categories)[0];

      if (filteredCategory !== undefined) {
        return {
          ...filteredCategory,
          date: info.range.date,
        };
      }
      return null;
    });

    const sanitizedCategories = sanitizeArray(summarisedCategories);

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
          <LoadingCard loading={isPageLoading}>
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
            <Card style={{ marginTop: '20px' }}>
              <Row type="flex" style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                <div>
                  <h2>Select a Range</h2>
                  <RangePicker
                    defaultValue={[moment(moment(), dateFormat), moment(moment(), dateFormat)]}
                    format={dateFormat}
                    onChange={this.onDateRangeChangeHandler}
                    disabledDate={disabledDate}
                  />
                </div>
                <div>
                  <CustomActivityBar data={sanitizedCategories} width="700" height="400" />
                </div>
              </Row>
            </Card>
          </LoadingCard>
        </Content>
      </Fragment>
    );
  }
}

Activity.propTypes = {
  viewCurrentUserDurations: PropTypes.func.isRequired,
  viewCurrentUserDateRangeDurations: PropTypes.func.isRequired,
  durationsStore: PropTypes.shape({
    durations: PropTypes.arrayOf(PropTypes.shape({})),
    lastWeekDurations: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

export default Activity;

