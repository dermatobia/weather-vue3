<template>
  <div class="day-forecast">
    <span class="day-name">
      {{ (new Date(day.dt*1000)).toLocaleDateString(_, {weekday: 'long'}) }}
    </span>
    <span class="icon">
      <img :src="iconImg" alt="Daily Forecast Icon">
      {{ precipitation }}
    </span>
    <span class="max">{{ temp(day.temp.max) }} {{ tempUnit }}</span>
    <span class="min">{{ temp(day.temp.min) }} {{ tempUnit }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { ICON_URL } from '../../utils/constants';
import { getCorrectTemp } from '../../utils/utils';

export default {
  name: 'DayForecast',
  props: ['day'],
  computed: {
    ...mapGetters(['isFahrenheit', 'tempUnit']),
    iconImg() {
      return `${ICON_URL}${this.day.weather[0].icon}.png`;
    },
    precipitation() {
      const prob = Math.ceil(this.day.pop*100);
      return prob <= 20 ? '' : `${prob}%`;
    },
    temp() {
      return function(tempF) {
        return getCorrectTemp(this.tempUnit, tempF);
      }
    },
  },
}
</script>

<style scoped lang="scss">
.day-forecast {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;

  .day-name { 
    width: 100px;
    font-weight: bold;
    text-align: left;
  }
  .icon {
    min-width: 80px;
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: bold;
    color: darken($purple, 25%);
  }
  .max, .min {
    width: 50px;
    font-weight: bold;;
    text-align: right;
  }
  .min {
    color: lighten(grey, 10%);
  }
}
</style>