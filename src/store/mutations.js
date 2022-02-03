export default {
  setUnit(state, val) {
    state.tempUnit = val;
  },
  setLoading(state, val) {
    state.isLoading = val;
  },
  addCity(state, data) {
    state.cities.push(data);
  },
  deleteCity(state, name) {
    state.cities = state.cities.filter(city => city.name !== name);
  },
  setError(state, data) {
    state.errorMsg = data;
  }
};