module.exports.getToday = function() {
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1;
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  return year + '/' + month + '/' + day;
};

module.exports.getSomeDayAgo = function(ago) {
  let dateObj = new Date();
  dateObj.setDate(dateObj.getUTCDate() - ago);
  let month = dateObj.getUTCMonth() + 1;
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  return year + '/' + month + '/' + day;
};

module.exports.getFormattedDateTime = function(dateTime) {

  if (dateTime.toString() === 'Invalid Date')
    return '';

  const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);

  return `${
    padL(dateTime.getMonth() + 1)}/${
    padL(dateTime.getDate())}/${
    dateTime.getFullYear()} ${
    padL(dateTime.getHours())}:${
    padL(dateTime.getMinutes())}:${
    padL(dateTime.getSeconds())}`;
};

module.exports.formatTimeFromSeconds = function(totalSeconds) {
  if (totalSeconds < 0)
    return 'Expired';

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
  const seconds = totalSeconds - (hours * 3600) - (minutes * 60);

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

module.exports.monthsToYearsAndMonths = function(months) {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const yearString = years > 1 ? years + ' yrs' : years === 1 ? '1 yr' : '';
  const monthString = remainingMonths > 1 ? remainingMonths + ' mos' : remainingMonths === 1 ? '1 mo' : '';
  const separator = yearString && monthString ? ' ' : ''; // Add separator only if both strings are present
  return yearString + separator + monthString;
};
