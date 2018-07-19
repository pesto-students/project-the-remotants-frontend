import { connect } from 'react-redux';

import { viewCurrentUserProjects, viewProjectCommits } from '../../../actions/projects';
import Project from './Project';


const mapStateToProps = state => ({
  projects: state.projects,
});

const mapDispatchToProps = {
  viewCurrentUserProjects,
  viewProjectCommits,
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
