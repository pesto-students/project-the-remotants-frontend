import jwtDecode from 'jwt-decode';

const decodeToken = (token) => {
  if (token === '') {
    return '';
  }
  return jwtDecode(token).email;
};

export default decodeToken;
