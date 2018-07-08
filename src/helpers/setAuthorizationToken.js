import axios from 'axios';

const setAuthorizationToken = (token) => {
  if (token === '') {
    delete axios.defaults.headers.common.Authorization;
  } else {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

export default setAuthorizationToken;
