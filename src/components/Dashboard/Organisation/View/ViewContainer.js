import { connect } from 'react-redux';

import View from './View';
import { viewCurrentUserOrganisations } from '../../../../actions/organisations';

const mapStateToProps = state => ({
  organisations: state.organisations,
});

const mapDispatchToProps = {
  viewCurrentUserOrganisations,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
