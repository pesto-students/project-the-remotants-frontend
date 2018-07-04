import jwtDecode from 'jwt-decode';

const decodeToken = (token) => {
  if (token !== '') {
    return jwtDecode(token).email;
  }
  return '';
};

export default decodeToken;
