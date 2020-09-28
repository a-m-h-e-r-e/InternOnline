const getDateTimeDifference = (date_now, date_future) => {
  let delta = (date_future - date_now) / 1000;
  if (delta < 0)
    return {
      msg: ``,
      values: {},
    };
  let days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  let hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  let minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  let seconds = Math.floor(delta % 60); //

  let dayMsg = days ? `${days} days,` : "";
  let hourMsg = hours ? `${hours} hours,` : "";
  let minuteMsg = minutes ? `${minutes} minutes` : "";
  return {
    msg: `${dayMsg}${hourMsg}${minuteMsg}`,
    values: {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    },
  };
};

const calculateTimeLeft = (toDate) => {
  const difference = +toDate - +new Date();
  console.log(difference + "difference");
  let timeLeft = {
    over: false,
    values: {},
  };

  if (difference > 0) {
    timeLeft.values = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  } else timeLeft.over = true;

  return timeLeft;
};

const getRemainingTime = (start, end) => {
  let remaining = getDateTimeDifference(new Date(start), new Date(end));
  // let days = remaining.values.days ? `${remaining.values.days} days,` : "";
  let days = remaining.values.days
    ? remaining.values.days > 1
      ? `${remaining.values.days} days ago`
      : `${remaining.values.days} day ago`
    : "Today";
  let hours = remaining.values.hours;
  let minutes = remaining.values.minutes;
  let seconds = remaining.values.seconds;
  return `${days}`;
};

export { getDateTimeDifference, calculateTimeLeft, getRemainingTime };
