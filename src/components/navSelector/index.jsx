import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountrySelector from "../countrySelector";
import "./navSelector.scss";
import { debounce, updateClock } from "../../helper/common";
const NavSelector = () => {
  const [pausePlay, setPausePlay] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Africa/Abidjan");
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);

  const handlePlay = () => {
    setPausePlay(!pausePlay);
  };

  const getTimeZone = async () => {
    const res = await fetch(
      `https://worldtimeapi.org/api/timezone/${selectedCountry}`
    );
    const body = await res.json();

    const { hrs, minutes, seconds } = updateClock(body);

    setHours(hrs);
    setMins(minutes);
    setSecs(seconds);
  };

  const debounceTimeZone = debounce(() => getTimeZone(), 5);

  useEffect(() => {
    debounceTimeZone();
  }, [selectedCountry]);

  useEffect(() => {
    let timer = setInterval(() => {
      if (secs < 59) {
        setSecs(secs + 1);
      } else {
        setSecs(0);
        if (mins < 59) {
          setMins(mins + 1);
        } else {
          setMins(0);
          if (hours < 23) {
            setHours(hours + 1);
          } else {
            setHours(0);
          }
        }
      }
    }, 1000);

    if (pausePlay) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [secs, pausePlay]);

  return (
    <div className="topNav">
      <Link to={"/"}>Back</Link>
      <div className="rightContent">
        <CountrySelector setSelectedCountry={setSelectedCountry} />
        <p>
          {hours > 9 ? hours : "0" + hours}:{mins > 9 ? mins : "0" + mins}:
          {secs > 9 ? secs : "0" + secs}
        </p>
        <button className={pausePlay ? "pause" : "play"} onClick={handlePlay}>
          Pause/Start
        </button>
      </div>
    </div>
  );
};

export default NavSelector;
