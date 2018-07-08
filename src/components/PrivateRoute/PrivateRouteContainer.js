import { connect } from 'react-redux';
import get from 'lodash/get';

import PrivateRoute from './PrivateRoute';


const mapStateToProps = state => ({
  isAuthenticated: get(state, 'currentUser.isAuthenticated', {}),
});

export default connect(mapStateToProps)(PrivateRoute);
