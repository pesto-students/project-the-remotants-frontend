import { connect } from 'react-redux';
import PublicRoute from './PublicRoute';


const mapStateToProps = state => ({
  isAuthenticated: state.currentUser.isAuthenticated,
});

export default connect(mapStateToProps)(PublicRoute);
