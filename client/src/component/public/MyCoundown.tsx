import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyCountdown = (props: any) => {
  const navigate = useNavigate();

  const { user } = props;
  if (JSON.parse(localStorage.getItem(twoHours) as string) === 7200000) {
    var twoHours = JSON.parse(localStorage.getItem("twoHours") as string);
  } else {
    twoHours = JSON.parse(localStorage.getItem("twoHours") as string);
  }

  const [theTime, setTheTime] = useState({
    hours: Math.floor((twoHours / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((twoHours / 1000 / 60) % 60),
    seconds: Math.floor((twoHours / 1000) % 60),
  });

  useEffect(() => {
    let theInterval = setInterval(() => {
      if (twoHours < 1000) {
        localStorage.removeItem("twoHours");
        navigate("/timeUp");
      }
      twoHours = JSON.parse(localStorage.getItem("twoHours") as string) - 1000;
      localStorage.setItem("twoHours", twoHours);

      setTheTime({
        hours: Math.floor((twoHours / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((twoHours / 1000 / 60) % 60),
        seconds: Math.floor((twoHours / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(theInterval);
  }, []);

  return (
    <div className="rounded-lg mx-10 p-5 flex flex-col justify-center shadow-md shadow-gray-600 fixed right-0">
      <p className="text-xl text-center font-mono text-gray-500">
        {theTime.hours < 10 ? "0" + theTime.hours : theTime.hours}:
        {theTime.minutes < 10 ? "0" + theTime.minutes : theTime.minutes}:
        {theTime.seconds < 10 ? "0" + theTime.seconds : theTime.seconds}
      </p>
      <p className="font-bold">Your Time Remain</p>
    </div>
  );
};

export default MyCountdown;
