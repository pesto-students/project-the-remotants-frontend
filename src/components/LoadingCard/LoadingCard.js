import React, { Fragment } from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';


const LoadingCard = ({ loading, children }) => (
  <Fragment>
    <Card loading={loading} style={{ border: '0' }}>
      { children }
    </Card>
    <Card loading={loading} style={{ border: '0' }} />
  </Fragment>
);

LoadingCard.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    PropTypes.shape({}).isRequired,
  ]).isRequired,
};

export default LoadingCard;

