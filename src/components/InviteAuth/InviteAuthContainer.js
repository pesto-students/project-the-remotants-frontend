import { connect } from 'react-redux';

import InviteAuth from './InviteAuth';
import { inviteAuth } from '../../actions/inviteAuth';


const mapDispatchToProps = {
  inviteAuth,
};

export default connect(null, mapDispatchToProps)(InviteAuth);
