<template>
<div class="city-detail-page" v-if="!isLoading">
  <router-link class="home-btn" :to="'/'">Back to Main Page</router-link>
  <temp-converter />
  <hr>
  <div class="main-info">
    <h1>{{ city.name }}</h1>
    <p>{{ time.current }}</p>
    <h2 class="condition">{{ city.current.weather[0].description }}</h2>
    <p class="current">{{ temp(city.current.temp) }}</p>
    <img :src="iconImg" alt="Weather Icon">
    <p><strong>
      <span>H: {{ temp(city.daily[0].temp.max) }}</span> /
      <span>L: {{ temp(city.daily[0].temp.min) }}</span>
    </strong></p>
  </div>
  <hr>
  <div class="daily-forecast">
    <day-forecast
      v-for="day in city.daily.slice(1)"
      :key="day.dt"
      :day="day">
    </day-forecast>
  </div>
  <hr>
  <div class="detail">
    <div>
      <div class="item-wrap">
        <data-item title="Sunrise" :data="time.sunrise" />
        <data-item title="Sunset" :data="time.sunset" />
      </div>
      <div class="item-wrap">
        <data-item title="Humidity" :data="city.current.humidity + '%'" />
        <data-item title="Pressure" :data="pressure(city.current.pressure)" />
      </div>
      <div class="item-wrap">
        <data-item title="Wind" :data="speed(city.current.wind_speed)" />
        <data-item title="Feels like" :data="temp(city.current.feels_like)" />
      </div>
      <div class="item-wrap">
        <data-item title="UV Index" :data="city.current.uvi" />
        <data-item title="Visibility" :data="visibility(city.current.visibility)" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import DayForecast from './DayForecast.vue';
import DataItem from './DataItem.vue';
import TempConverter from '../UI/TempConverter.vue';
import { ICON_URL } from '../../utils/constants';
import { mapGetters } from 'vuex';
import {
  getCorrectTemp,
  getCorrectPressure,
  getCorrectSpeed,
  getCorrectVisibility,
  getCurrentLocalTime,
  getLocalTime
} from '../../utils/utils';

export default {
  name: 'CityDetailPage',
  props: ['cityName'],
  components: {
    DayForecast,
    DataItem,
    TempConverter,
  },
  computed: {
    ...mapGetters(['isFahrenheit', 'isLoading', 'findCity', 'tempUnit']),
    city() {
      return this.findCity(this.cityName) || {};
    },
    iconImg() {
      return `${ICON_URL}${this.city.current.weather[0].icon}@2x.png`;
    },
    time() {
      const offset = this.city.timezone_offset;
      return {
        current: getCurrentLocalTime(offset),
        sunrise: getLocalTime(offset, this.city.current.sunrise),
        sunset: getLocalTime(offset, this.city.current.sunset)
      }
    },
    temp() {
      return function(tempF) {
        return getCorrectTemp(this.tempUnit, tempF) + ` ${this.tempUnit}`;
      }
    },
    pressure() {
      return function(hPa) {
        return getCorrectPressure(this.tempUnit, hPa);
      }
    },
    speed() {
      return function(mph) {
        return getCorrectSpeed(this.tempUnit, mph);
      }
    },
    visibility() {
      return function(meter) {
        return getCorrectVisibility(this.tempUnit, meter);
      }
    },
  },
  created() {
    if (!this.findCity(this.cityName)) {
      this.$store.dispatch('fetchWeather', this.cityName);
    }
  }
}
</script>

<style scoped lang="scss">
.city-detail-page {
  width: 50%;
  margin: auto;

  @media (max-width: $breakpoint-tablet) {
    width: 90%;
  }

  hr {
    margin: 0;
  }
  .home-btn {
    display: inline-block;
    padding: 7px 25px;
    background: $green;
    border-radius: 5px;
    color: $base-font-color;
    font-weight: bold;
    text-align: left;
    text-decoration: none;

    &:hover {
      background: lighten($green, 3%);
    }
  }
}
.main-info {
  margin: 0;
  padding: 20px 0;
  background: darken($light-blue, 8%);

  h1 {
    margin: 0;
  }
  p {
    margin: 0;
  }
  .condition {
    margin: 0;
    text-transform: capitalize;
  }
  .current {
    margin: 0;
    font-size: 36px;
    font-weight: bold;
  }
}
.daily-forecast {
  background: $light-green;
}
.detail {
  background: $light-purple;
  text-align: center;

  .item-wrap {
    display: flex;
    justify-content: space-evenly;
    border-bottom: 1px solid grey;
  }
}
</style>