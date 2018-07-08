import { connect } from 'react-redux';
import get from 'lodash/get';

import Navbar from './Navbar';
import { logoutUser } from '../../actions/auth';


const mapStateToProps = state => ({
  currentUser: get(state, 'currentUser', {}),
});

const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
