// export function getDistance(coordinate1, coordinate2) {
//   const EARTH_RADIUS = 6371; // km
  
//   const toRadians = (degree) => degree * Math.PI / 180;
  
//   const latitude1 = toRadians(coordinate1[0]);
//   const longitude1 = toRadians(coordinate1[1]);
//   const latitude2 = toRadians(coordinate2[0]);
//   const longitude2 = toRadians(coordinate2[1]);
  
//   const deltaLatitude = latitude2 - latitude1;
//   const deltaLongitude = longitude2 - longitude1;
  
//   const a = Math.sin(deltaLatitude / 2) ** 2 + 
//             Math.cos(latitude1) * Math.cos(latitude2) * 
//             Math.sin(deltaLongitude / 2) ** 2;
  
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
//   const distance = EARTH_RADIUS * c;
//   return distance;
// }

export function getDistance([lat1, lon1], [lat2, lon2]) 
{
  var R = 6371; // km
  var dLat = toRad(lat2-lat1);
  var dLon = toRad(lon2-lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) 
{
    return Value * Math.PI / 180;
}