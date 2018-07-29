import { connect } from 'react-redux';

import { viewCurrentUserDurations, viewCurrentUserDateRangeDurations } from '../../../actions/durations';
import Activity from './Activity';


const mapStateToProps = state => ({
  durationsStore: state.durations,
});

const mapDispatchToProps = {
  viewCurrentUserDurations,
  viewCurrentUserDateRangeDurations,
};

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
