import { connect } from 'react-redux';

import { viewCurrentUserIssues } from '../../../actions/issues';
import Issues from './Issues';


const mapStateToProps = state => ({
  issues: state.issues,
});

const mapDispatchToProps = {
  viewCurrentUserIssues,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Issues);
