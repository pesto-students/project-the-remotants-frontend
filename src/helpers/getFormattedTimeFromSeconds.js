const getFormattedTimeFromSeconds = (seconds) => {
  let secs = seconds;
  let minutes = Math.floor(secs / 60);
  secs %= 60;
  const hours = Math.floor(minutes / 60);
  minutes %= 60;
  secs = secs.toFixed(0);
  return `${hours} hours, ${minutes} minutes and ${secs} seconds`;
};

export default getFormattedTimeFromSeconds;
