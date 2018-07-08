import { connect } from 'react-redux';
import get from 'lodash/get';

import PublicRoute from './PublicRoute';


const mapStateToProps = state => ({
  isAuthenticated: get(state, 'currentUser.isAuthenticated', {}),
});

export default connect(mapStateToProps)(PublicRoute);
