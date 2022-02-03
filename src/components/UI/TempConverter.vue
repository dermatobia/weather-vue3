<template>
  <p class="temp-converter">
    <span @click="setFahrenheit" :class="{ selected: isFahrenheit }">Fahrenheit</span> /
    <span @click="setCelsius" :class="{ selected: !isFahrenheit }">Celsius</span>
  </p>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'TempConverter',
  computed: {
    ...mapGetters(['isFahrenheit'])
  },
  methods: {
    ...mapActions(['setFahrenheit', 'setCelsius'])
  }
}
</script>

<style scoped lang="scss">
.temp-converter {
  cursor: pointer;
}
.selected {
  border-bottom: 1px solid grey;
  font-weight: bold;
}
</style>