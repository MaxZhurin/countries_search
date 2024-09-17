export function getDistance(coordinate1, coordinate2) {
  const EARTH_RADIUS = 6371; // km
  
  const toRadians = (degree) => degree * Math.PI / 180;
  
  const latitude1 = toRadians(coordinate1[0]);
  const longitude1 = toRadians(coordinate1[1]);
  const latitude2 = toRadians(coordinate2[0]);
  const longitude2 = toRadians(coordinate2[1]);
  
  const deltaLatitude = latitude2 - latitude1;
  const deltaLongitude = longitude2 - longitude1;
  
  const a = Math.sin(deltaLatitude / 2) ** 2 + 
            Math.cos(latitude1) * Math.cos(latitude2) * 
            Math.sin(deltaLongitude / 2) ** 2;
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  const distance = EARTH_RADIUS * c;
  return distance;
}
