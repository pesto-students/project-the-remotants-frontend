import jwtDecode from 'jwt-decode';

const decodeInviteToken = (token) => {
  if (token === '') {
    return '';
  }
  return jwtDecode(token);
};

export default decodeInviteToken;
