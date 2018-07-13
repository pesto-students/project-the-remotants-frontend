import React from 'react';
import styled from 'styled-components';
import { Row } from 'antd';

const StyledRow = styled(Row)`
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100vw;
`;

const FooterComponent = () => {
  return (
    <StyledRow>
      <div>
        &copy; The Remotants
      </div>
    </StyledRow>
  );
};

export default FooterComponent;
