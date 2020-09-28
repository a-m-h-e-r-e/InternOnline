import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";

export default function CountdownTimer(props) {
  const { toDate, onFinish } = props;
  const calculateTimeLeft = () => {
    const difference = +toDate - +new Date();
    //  console.log(difference + new Date());
    let timeLeft = { value: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(<span>{timeLeft[interval]}:</span>);
  });

  const getRemainingTime = () => {
    // let remaining = getDateTimeDifference(new Date(start), new Date(end));
    if (timeLeft.value === 0) return onFinish;
    let days = timeLeft.days ? `${timeLeft.days} days` : "";
    let hours = timeLeft.hours;
    let minutes = timeLeft.minutes;
    let seconds = timeLeft.seconds;

    let result = days ? days : `${hours}:${minutes}:${seconds}`;
    return result ? result : "Contest Started";
    //  return `${days} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <React.Fragment>
      {getRemainingTime()}
      {/* {timerComponents.length ? timerComponents : <span>Time's up!</span>} */}
    </React.Fragment>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<CountdownTimer />, rootElement);
