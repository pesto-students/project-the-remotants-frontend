import { connect } from 'react-redux';
import get from 'lodash/get';

import Signup from './Signup';
import { registerUser } from '../../actions/auth';


const mapStateToProps = state => ({
  currentUser: get(state, 'currentUser', {}),
});

const mapDispatchToProps = {
  registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
