import { connect } from 'react-redux';

import { viewCurrentUserDurations } from '../../../actions/durations';
import Activity from './Activity';


const mapStateToProps = state => ({
  durations: state.durations,
});

const mapDispatchToProps = {
  viewCurrentUserDurations,
};

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
