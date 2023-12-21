import moment from "moment-timezone";

export function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function updateClock(timeObject) {
  const localTime = moment.tz(timeObject?.datetime, timeObject?.timezone); // Convert seconds to milliseconds

  const hrs = localTime.hours();
  const minutes = localTime.minutes();
  const seconds = localTime.seconds();

  return { hrs, minutes, seconds };
}
