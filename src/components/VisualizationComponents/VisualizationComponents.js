import React from 'react';
import PropTypes from 'prop-types';
import { Pie, Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { AxisBottom } from '@vx/axis';
import { RadialGradient } from '@vx/gradient';
import { scaleBand, scaleLinear } from '@vx/scale';
import { max } from 'd3-array';

import { infoNotify } from '../../helpers/messageNotify';


const Label = ({ x, y, children }) => {
  return (
    <text
      fill="white"
      textAnchor="middle"
      x={x}
      y={y}
      dy="1em"
      fontSize={15}
    >
      {children}
    </text>
  );
};

Label.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  children: PropTypes.string.isRequired,
};

const pieValue = (d) => {
  if (d.total_seconds) {
    return d.total_seconds;
  }
  return 0;
};

const fillOpacity = (d) => {
  return (1 / (d.index + 1));
};

const CustomPie = ({
  width,
  height,
  data,
  thresholdVal,
  margin = {
    top: 30,
    left: 20,
    right: 20,
    bottom: 110,
  },
}) => {
  if (width < 10) return null;
  const radius = Math.min(width, height);
  return (
    <svg width={width} height={height}>
      <RadialGradient from="#55bdd5" to="#4f3681" id="gradients" r="80%" />
      <rect
        x={0}
        y={0}
        rx={14}
        width={width}
        height={height}
        fill="#fff"
      />
      <Group top={(height / 2) - (margin.top / 2)} left={width / 2}>
        <Pie
          data={data}
          pieValue={d => pieValue(d)}
          outerRadius={radius - 225}
          fill="url('#gradients')"
          fillOpacity={fillOpacity}
          centroid={(centroid, arc) => {
            const [x, y] = centroid;
            if (arc.data.total_seconds > thresholdVal) {
              return (<Label x={x} y={y}>{arc.data.name}</Label>);
            }
              return null;
          }}
        />
      </Group>
    </svg>
  );
};

CustomPie.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  thresholdVal: PropTypes.number.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
  }),
};

CustomPie.defaultProps = {
  margin: {
    top: 30,
    left: 20,
    right: 20,
    bottom: 110,
  },
};


const x = d => d.name;
const y = d => +d.total_seconds * 100;


const CustomBar = ({
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
                hideAxisLine
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

CustomBar.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const VisualizationComponents = {
  Label,
  CustomPie,
  CustomBar,
};

export default VisualizationComponents;

