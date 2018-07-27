import { connect } from 'react-redux';

import { ifWakatimeTokenExists, ifGithubTokenExists } from '../../../actions/authToken';
import { viewCurrentUserWakatimeDetails, viewCurrentUserGithubDetails } from '../../../actions/userDetails';
import Settings from './Settings';


const mapStateToProps = state => ({
  userDetails: state.userDetails,
});

const mapDispatchToProps = {
  viewCurrentUserWakatimeDetails,
  ifWakatimeTokenExists,
  ifGithubTokenExists,
  viewCurrentUserGithubDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
