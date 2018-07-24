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

export const infoNotify = (text) => {
  message.info(text);
};

export const loadingNotify = (text, timeoutInms) => {
  const hide = message.loading(text, 0);
  setTimeout(hide, timeoutInms);
};
