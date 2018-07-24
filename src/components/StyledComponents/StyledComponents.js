import { Form, Button, Badge } from 'antd';
import styled from 'styled-components';


const FormItem = Form.Item;

const LargeFormItem = styled(FormItem)`
  width: 400px;
  margin-left: auto;
  margin-right: auto;
`;
const LargeButton = styled(Button)`
  width: 400px;
  margin-left: auto;
  margin-right: auto;
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
  &:hover, &:active, &:focus {
    text-decoration: none;
  }
`;

const OAuthButton = styled(Button)`
  background: #fff;
  color: #000;
  padding: 5px 15px;
  height: auto;
  font-size: 1.1em;

  &:hover, &:active, &:focus {
    a {
      color: black !important;
    }
    color: black !important;
    background: #eee;
    text-shadow: none;
    border: 1px solid transparent;
  }
`;

const StyledComponents = {
  LargeFormItem,
  LargeButton,
  LargeBadge,
  OAuthAnchor,
  OAuthButton,
};

export default StyledComponents;
