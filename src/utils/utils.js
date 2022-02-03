// ---- HELPER METHODS ----

// To get date object in local time at target city
const getTargetCityTime = (targetOffset, date) => {  
  // date's time in milliseconds
  const localTime = date.getTime();
  // date's offset time in milliseconds
  const localOffset = date.getTimezoneOffset() * 60000;
  const utc = localTime + localOffset;
  const targetTime = utc + targetOffset*1000;
  return new Date(targetTime);
}

// To get formatted string of `current` time at local time of target city
//   example: `Saturday 2:50 PM`
export const getCurrentLocalTime = (targetOffset) => {
  const now = new Date();
  const local = getTargetCityTime(targetOffset, now);
  const options = {
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric'
  };
  return local.toLocaleTimeString([], options);
}

// To get formatted string at `given` unix time at local time of target city
//   example: `10:30 PM`
export const getLocalTime = (targetOffset, unixTime) => {
  const dateObj = new Date(unixTime * 1000);
  const local = getTargetCityTime(targetOffset, dateObj);
  const options = {
    hour: 'numeric',
    minute: 'numeric'
  };
  return local.toLocaleTimeString([], options);
}

export const getCorrectTemp = (unit, tempF) => {
  if (unit === 'F') return tempF.toFixed(0);

  return ((tempF - 32) / 1.8).toFixed(0);
}

export const getCorrectPressure = (unit, hPa) => {
  // metric: Hectopascal (hpa)
  // imperial: Inches in Mercury (inHg)
  if (unit === 'F')
    return (hPa * 0.029529983071445).toFixed(2) + ' inHg';

  return hPa + ' hPa';
}

export const getCorrectSpeed = (unit, mph) => {
  // metric: km/h, imperial: mph
  if (unit === 'F') return mph + ' mph';
  return (mph * 1.609344).toFixed(0) + ' km/h';
}

export const getCorrectVisibility = (unit, meter) => {
  // metric: km, imperial: mile
  if (unit === 'F') return (meter / 1600).toFixed(1) + ' mi';
  return (meter / 1000).toFixed(1) + ' km'
}

// converts object into stringified query params to send along in URL request
export const stringifyQuery = (obj) => {
  return (new URLSearchParams(obj)).toString();
}