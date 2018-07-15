import { connect } from 'react-redux';
import get from 'lodash/get';

import Login from './Login';
import { loginUser } from '../../actions/auth';


const mapStateToProps = state => ({
  currentUser: get(state, 'currentUser', {}),
});

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
