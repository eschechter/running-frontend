import haversine from "haversine-distance";

export default function haversineSum(markers) {
  let sum = 0;
  for (let i = 0; i < markers.length - 1; i++) {
    sum += haversine(
      { lat: markers[i][0], lng: markers[i][1] },
      { lat: markers[i + 1][0], lng: markers[i + 1][1] }
    );
  }
  return Math.round(sum / 16.09) / 100;
}
