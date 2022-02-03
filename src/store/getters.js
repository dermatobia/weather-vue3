export default {
  isFahrenheit(state) {
    return state.tempUnit === 'F';
  },
  tempUnit(state) {
    return state.tempUnit;
  },
  isLoading(state) {
    return state.isLoading;
  },
  cities(state) {
    return state.cities;
  },
  findCity(state) {
    return function(cityName) {
      const name = cityName.toLowerCase();
      return state.cities.find(city => city.name.toLowerCase() === name);
    }
  },
  errorMsg(state) {
    return state.errorMsg;
  }
}