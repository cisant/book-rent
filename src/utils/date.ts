import moment = require('moment');

export const isValid = (date) => {
  return moment(date, 'DD/MM/YYYY', true).isValid();
};
