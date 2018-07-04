import { connect } from 'react-redux';

import Navbar from './Navbar';
import { logoutUser } from '../../actions/auth';


const mapStateToProps = state => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
