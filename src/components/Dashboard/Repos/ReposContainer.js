import { connect } from 'react-redux';

import { viewCurrentUserRepos, viewRepoPullRequests } from '../../../actions/repos';
import Repos from './Repos';

const mapStateToProps = state => ({
  repos: state.repos,
});

const mapDispatchToProps = {
  viewCurrentUserRepos,
  viewRepoPullRequests,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Repos);
