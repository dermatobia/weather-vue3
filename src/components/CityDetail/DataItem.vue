<template>
  <div class="data-item">
    <p class="title">{{ title }}</p>
    <p class="data">{{ data }}</p>
  </div>
</template>

<script>
export default {
  name: 'DataItem',
  props: ['title', 'data']
}
</script>

<style scoped lang="scss">
.data-item {
  display: inline-block;
  width: 200px;

  .title {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
    margin: 2px 0;
  }
  .data {
    font-size: 20px;
    font-weight: bold;
    margin: 3px 0 5px;
  }
}
</style>
