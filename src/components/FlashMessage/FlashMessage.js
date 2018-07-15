import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import { Alert } from 'antd';

const CenteredDiv = styled.div`
  text-align: center;
`;

const FlashMessage = ({ flashMessage }) => (
  <CenteredDiv>
    {
      (isEmpty(flashMessage) !== true) &&
      (
        <Alert
          message={flashMessage.text}
          key={flashMessage.id}
          type={flashMessage.type}
          closable
        />
      )
    }
  </CenteredDiv>
);

FlashMessage.propTypes = {
  flashMessage: PropTypes.shape({
    text: PropTypes.string,
  }).isRequired,
};

export default FlashMessage;
