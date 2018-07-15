import { connect } from 'react-redux';

import { logoutUser } from '../../../actions/auth';
import Logout from './Logout';

const mapDispatchToProps = {
  logoutUser,
};

export default connect(null, mapDispatchToProps)(Logout);
