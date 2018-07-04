import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';


const mapStateToProps = state => ({
  isAuthenticated: state.currentUser.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
