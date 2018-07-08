import { connect } from 'react-redux';
import get from 'lodash/get';

import Auth from './Auth';


const mapStateToProps = state => ({
  auth: get(state, 'auth', {}),
});

export default connect(mapStateToProps)(Auth);
