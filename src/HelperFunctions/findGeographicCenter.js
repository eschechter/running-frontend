export default function findGeographicCenter(longLatArray) {
  const n = longLatArray.length;

  let sumLongs = 0;
  let sumLats = 0;

  longLatArray.forEach(longLat => {
    sumLongs += longLat[0];
    sumLats += longLat[1];
  });

  return [sumLongs / n, sumLats / n];
}
