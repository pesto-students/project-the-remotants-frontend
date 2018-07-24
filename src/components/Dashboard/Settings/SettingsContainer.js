import { connect } from 'react-redux';

import { viewCurrentUserWakatimeDetails } from '../../../actions/userDetails';
import { ifWakatimeTokenExists, ifGithubTokenExists } from '../../../actions/authToken';

import Settings from './Settings';


const mapStateToProps = state => ({
  userDetails: state.userDetails,
});

const mapDispatchToProps = {
  viewCurrentUserWakatimeDetails,
  ifWakatimeTokenExists,
  ifGithubTokenExists,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
