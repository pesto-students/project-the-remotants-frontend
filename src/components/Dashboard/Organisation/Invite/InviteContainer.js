import { connect } from 'react-redux';

import Invite from './Invite';
import { viewCurrentUserOrganisations } from '../../../../actions/organisations';


const mapStateToProps = state => ({
  organisations: state.organisations,
});

const mapDispatchToProps = {
  viewCurrentUserOrganisations,
};

export default connect(mapStateToProps, mapDispatchToProps)(Invite);
