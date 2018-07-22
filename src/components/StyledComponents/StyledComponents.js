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

const StyledComponents = {
  LargeFormItem,
  LargeButton,
  LargeBadge,
};

export default StyledComponents;
