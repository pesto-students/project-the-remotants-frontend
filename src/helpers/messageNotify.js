import { message } from 'antd';

export const successNotify = (text) => {
  message.success(text);
};

export const errorNotify = (text) => {
  message.error(text);
};
