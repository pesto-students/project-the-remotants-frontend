import moment from 'moment';

import { DATE_FORMAT_CONSTANTS } from '../config/constants';


const changeDateFormat = (date, type) => {
  switch (type) {
    case DATE_FORMAT_CONSTANTS.HUMAN_READABLE_DATE_FORMAT:
      return moment(date, 'MM/DD/YYYY').format('DD MMM, YYYY');
    case DATE_FORMAT_CONSTANTS.HUMAN_READABLE_DATE_TIME_FORMAT:
      return moment(date).format('DD MMM, YYYY HH:mm A');
    default:
      return date;
  }
};

export default changeDateFormat;
