import { connect } from 'react-redux';
import get from 'lodash/get';

import DashboardRoute from './DashboardRoute';


const mapStateToProps = state => ({
  isAuthenticated: get(state, 'currentUser.isAuthenticated', {}),
});

export default connect(mapStateToProps)(DashboardRoute);
