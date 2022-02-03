<template>
  <div class="home-page">
    <form @submit.prevent="submitForm">
      <label for="searchCity">Search City</label>
      <input type="text" v-model="searchCityVal" />
      <button type="submit">Search</button>
      <p class="error-msg" v-if="errorMsg">
        {{ errorMsg }}
        <span class="close-error" @click="closeErrorMsg">x</span>
      </p>
    </form>
    <hr>
    <temp-converter />
    <city-card 
      v-for="city in cities"
      :key="city.id"
      :data="city"
      @remove-city="removeCity"
    />
  </div>
</template>

<script>
import CityCard from './CityCard.vue';
import TempConverter from '../UI/TempConverter.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'HomePage',
  components: {
    CityCard,
    TempConverter
  },
  data: () => ({
    searchCityVal: '',
  }),
  computed: {
    ...mapGetters(['cities', 'errorMsg', 'findCity']),
  },
  methods: {
    ...mapActions(['clearError', 'setError', 'fetchWeather', 'deleteCity']),
    closeErrorMsg() {
      this.searchCityVal = '';
      this.clearError();
    },
    removeCity(cityName) {
      this.deleteCity(cityName);
    },
    submitForm() {
      if (!this.searchCityVal) return;
      if (this.findCity(this.searchCityVal)) {
        this.setError(`${this.searchCityVal} is already in the list`);
        return;
      }
      this.fetchWeather(this.searchCityVal);
    }
  },
  created() {
    // prepopulate with hardcoded default city if list is empty
    if (this.cities.length) return;

    const defaultCity = 'new york';
    this.fetchWeather(defaultCity);
  }
}
</script>

<style scoped lang="scss">
.home-page {
  width: 60%;
  margin: 30px auto;

  @media (max-width: $breakpoint-tablet) {
    width: 90%;
  }
}
form {
  margin-bottom: 10px;

  label {
    font-weight: bold;
  }

  input {
    margin: 0 10px;
    padding: 7px 7px;
    font-size: 16px;
    background: $light-purple;
    border: 1px solid $purple;

    &:focus {
      outline: none;
    }
  }

  button {
    padding: 9px 25px;
    border: 1px solid $purple;
    background: $light-grey;
    font-weight: bold;

    &:hover {
      background: darken($light-grey, 5%);
    }
  }

  .error-msg {
    color: $red;
    text-align: center;
    text-transform: capitalize;

    .close-error {
      display: inline-block;
      margin-left: 10px;
      color: $base-font-color;
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>
