import { connect } from 'react-redux';
import get from 'lodash/get';

import FlashMessage from './FlashMessage';

const mapStateToProps = state => ({
  flashMessage: get(state, 'flashMessage', {}),
});

export default connect(mapStateToProps)(FlashMessage);
