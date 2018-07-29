import { connect } from 'react-redux';

import { logoutUser } from '../../../actions/auth';
import Sidebar from './Sidebar';

const mapDispatchToProps = {
  logoutUser,
};

export default connect(null, mapDispatchToProps)(Sidebar);
