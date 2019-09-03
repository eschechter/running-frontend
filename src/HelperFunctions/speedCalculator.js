import moment from "moment";

export default function speedCalculator(distanceInMiles, timeInSeconds) {
  const timeInHours = moment.duration(timeInSeconds * 1000).asHours();
  const unroundedSpeed = distanceInMiles / timeInHours;
  return Math.round(unroundedSpeed * 100) / 100;
}
