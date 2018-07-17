import { message } from 'antd';

export const successNotify = (text) => {
  message.success(text);
};

export const errorNotify = (text) => {
  message.error(text);
};

export const warningNotify = (text) => {
  message.warning(text);
};
