import { connect } from 'react-redux';

import { viewCurrentUserWakatimeDetails } from '../../../actions/userDetails';
import Settings from './Settings';


const mapStateToProps = state => ({
  userDetails: state.userDetails,
});

const mapDispatchToProps = {
  viewCurrentUserWakatimeDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
