import { connect } from 'react-redux';
import get from 'lodash/get';

import Auth from './Auth';


const mapStateToProps = state => ({
  flashMessage: get(state, 'flashMessage', []),
});

export default connect(mapStateToProps)(Auth);
