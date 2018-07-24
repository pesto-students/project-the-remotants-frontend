import { connect } from 'react-redux';

import Track from './Track';
import { viewCurrentUserOrganisations, viewCurrentOrganisation } from '../../../../actions/organisations';


const mapStateToProps = state => ({
  organisations: state.organisations,
});

const mapDispatchToProps = {
  viewCurrentUserOrganisations,
  viewCurrentOrganisation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Track);
