import { Form, Button, Badge } from 'antd';
import styled from 'styled-components';


const FormItem = Form.Item;

const CenteredForm = styled(Form)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const LargeFormItem = styled(FormItem)`
  min-width: 75%;
`;

const LargeButton = styled(Button)`
  width: 100%;
`;

const LargeBadge = styled(Badge)`
  .ant-badge-status-dot {
    width: 10px;
    height: 10px;
  }

  .ant-badge-status-text {
    margin-left: 0;
  }
`;
const OAuthAnchor = styled.a`
  display: flex;
  align-items: center;
  &:hover, &:active, &:focus, &:visited {
    color: black !important;
    text-decoration: none;
  }
`;

const OAuthButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: #fff;
  color: #000;
  padding: 0.3em 2em !important;
  height: auto;
  font-size: 1.1em;

  @media (max-width: 480px) {
    min-width: 100%;
  }

  @media (min-width: 480px) {
    min-width: 250px;
  }

  &:hover, &:active, &:focus, &:visited {
    a {
      color: black !important;
    }
    color: #000;
    background: #eee;
    text-shadow: none;
    border: 1px solid transparent;
  }
`;

const OAuthSuccessButton = styled(Button)`
  color: #aaa;
  border: 1px solid #aaa;
  pointer-events: none;

  @media (max-width: 480px) {
    min-width: 100%;
  }

  @media (min-width: 480px) {
    min-width: 250px;
  }

  &:hover, &:active, &:focus, &:visited {
    color: #aaa;
  }
`;

const UppercaseH1 = styled.h1`
  text-transform: uppercase;
`;
const UppercaseH2 = styled.h2`
  text-transform: uppercase;
`;
const UppercaseH3 = styled.h3`
  text-transform: uppercase;
`;
const UppercaseH4 = styled.h4`
  text-transform: uppercase;
`;

const StyledComponents = {
  CenteredForm,
  LargeFormItem,
  LargeButton,
  LargeBadge,
  OAuthAnchor,
  OAuthButton,
  OAuthSuccessButton,
  UppercaseH1,
  UppercaseH2,
  UppercaseH3,
  UppercaseH4,
};

export default StyledComponents;
