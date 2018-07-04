import { connect } from 'react-redux';

import Login from './Login';
import { loginUser } from '../../actions/auth';


const mapStateToProps = state => ({
  auth: state.auth,
  currentUser: state.currentUser,
});

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
