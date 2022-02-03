import { stringifyQuery } from '../utils/utils';
import { GEO_CODING_URL, WEATHER_URL, APP_KEY } from '../utils/constants';

export default {
  setFahrenheit(context) {
    context.commit('setUnit', 'F');
  },
  setCelsius(context) {
    context.commit('setUnit', 'C');
  },
  setError(context, msg) {
    context.commit('setError', msg);
  },
  clearError(context) {
    context.commit('setError', '');
  },
  deleteCity(context, cityName) {
    context.commit('deleteCity', cityName);
  },
  fetchWeather(context, city) {
    // fetch GeoCode first to get lat+lon info given a city name
    // then fetch weather info with the geo coordinates
    let geoData = {};
    const geoParams = stringifyQuery({ appid: APP_KEY, limit: 1, q: city });
    
    context.commit('setLoading', true);
    
    fetch(`${GEO_CODING_URL}?${geoParams}`)
      .then(res => res.json())
      .then(geo => {
        if (!geo.length) throw 'City not found';
        geoData = geo[0];
        const weatherParams = stringifyQuery({
          appid: APP_KEY,
          lat: geoData.lat,
          lon: geoData.lon,
          units: 'imperial',
          exclude: 'alerts'
        });
        return fetch(`${WEATHER_URL}?${weatherParams}`);
      })
      .then(res => res.json())
      .then(weatherData => { 
        const data = {
          ...weatherData,
          name: geoData.name,
          countryCode: geoData.country
        }
        context.commit('addCity', data);
      })
      .catch(error => context.commit('setError', error))
      .finally(() => context.commit('setLoading', false));
  }
}