<template>
  <div class="city-card">
    <div class="outer-wrap" @click="goToDetail()">
      <div class="weather-wrap">
        <img class="icon" :src="iconImg" alt="Weather Icon">
        <div class="temp-wrap">
          <span class="temp">{{ currTemp }}</span>
          <span class="unit"><strong>{{ tempUnit }}</strong></span>
        </div>
      </div>
      <div class="city-wrap">
        <p class="name">{{ data.name }}</p>
        <p>{{ localTime }}</p>
        <p class="status">{{ data.current.weather[0].description }}</p>
      </div>
    </div>
    <div class="remove-tab" @click="removeCity">Remove</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getCurrentLocalTime, getCorrectTemp } from '../../utils/utils';
import { ICON_URL } from '../../utils/constants';

export default {
  name: 'CityCard',
  props: ['data'],
  emits: ['remove-city'],
  computed: {
    ...mapGetters(['isFahrenheit', 'tempUnit']),
    iconImg() {
      return `${ICON_URL}${this.data.current.weather[0].icon}@2x.png`;
    },
    localTime() {
      return getCurrentLocalTime(this.data.timezone_offset);
    },
    currTemp() {
      return getCorrectTemp(this.tempUnit, this.data.current.temp);
    }
  },
  methods: {
    goToDetail() {
      this.$router.push(`/city/${this.data.name}`);
    },
    removeCity() {
      this.$emit('remove-city', this.data.name);
    }
  }
}
</script>

<style scoped lang="scss">
.city-card {
  position: relative;
  max-width: 500px;
  margin: auto;
}
.outer-wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  background: $light-green;
  border: 1px solid $purple;
  border-radius: 10px;
  margin: 40px 0 20px;
  cursor: pointer;

  &:hover {
    background: darken($light-green, 3%);
  }
}
.weather-wrap {
  display: flex;
  align-items: center;

  .icon {
    display: inline-block;
  }
}
.temp-wrap {
  display: inline-block;

  .temp {
    font-size: 48px;
  }
  .unit {
    vertical-align: top;
  }
}
.city-wrap {
  p {
    margin: 1px;
    font-size: 14px;
    text-align: right;
  }
  .name {
    font-size: 24px;
    font-weight: bold;
  }
  .status {
    text-transform: capitalize;
  }
}
.remove-tab {
  position: absolute;
  top: -20px;
  right: 13px;
  padding: 2px 18px;
  background: $purple;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: lighten($purple, 3%);
  }
}
</style>
