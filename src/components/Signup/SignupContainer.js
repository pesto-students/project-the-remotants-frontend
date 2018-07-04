import { connect } from 'react-redux';

import Signup from './Signup';
import { registerUser } from '../../actions/auth';


const mapStateToProps = state => ({
  auth: state.auth,
  currentUser: state.currentUser,
});

const mapDispatchToProps = {
  registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
