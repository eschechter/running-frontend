import moment from "moment";

export default function parseTime(timeInSeconds) {
  const duration = moment.duration(timeInSeconds * 1000);

  const hours = duration.hours();
  const minutes =
    duration.minutes() >= 10 ? duration.minutes() : `0${duration.minutes()}`;
  const seconds =
    duration.seconds() >= 10 ? duration.seconds() : `0${duration.seconds()}`;

  return `${hours}:${minutes}:${seconds}`;
}
