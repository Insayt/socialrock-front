<template>
  <div>
    <div class="controls-title">
      Фильтры
    </div>
    <div class="filters">
      <div class="filters__item"
           v-for="filter in filters"
           @click="applyFilter(filter)"
           :style="{ backgroundImage: `url(./filters/${filter.value}.png)`  }"
      >
        <span>{{ filter.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      filters: [
        {name: 'None', value: 'none'},
        // { name: 'Brightness', value: 'Brightness' },
        {name: 'Convolute', value: 'Convolute', args: {matrix: [ 1,   1,  1,  1, 0.7, -1, -1,  -1, -1 ]}},
        {name: 'Grayscale', value: 'Grayscale'},
        {name: 'Invert', value: 'Invert'},
        {name: 'Noise', value: 'Noise', args: {noise: 80}},
        {name: 'Pixelate', value: 'Pixelate', args: {blocksize: 8}},
        {name: 'Brownie', value: 'Brownie'},
        {name: 'Technicolor', value: 'Technicolor'},
        {name: 'Polaroid', value: 'Polaroid'},
        {name: 'Sepia', value: 'Sepia'},
        {name: 'Black White', value: 'BlackWhite'},
        {name: 'Contrast', value: 'Contrast', args: {contrast: 0.5}},
        {name: 'Saturation', value: 'Saturation', args: {saturation: 1}},
        {name: 'Blur', value: 'Blur', args: {blur: 0.3}},
        // { name: 'Gamma', value: 'Gamma' },
        // { name: 'Composed', value: 'Composed' },
        // { name: 'Hue Rotation', value: 'HueRotation' },
      ],
    }),
    methods: {
      applyFilter(filter) {
        this.$bus.$emit('editor:applyFilter', filter.value, filter.args);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../variables";

  .controls-title {
    text-align: left;
    color: $color-font-gray;
    font-size: 16px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
  }

  .filters {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 30px;

    &__item {
      width: 125px;
      height: 125px;
      border-radius: 2px;
      cursor: pointer;
      margin-right: 10px;
      margin-bottom: 10px;
      background-color: $color-bg-1;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      position: relative;

      &:nth-child(2n) {
        margin-right: 0;
      }

      span {
        display: block;
        text-align: center;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
</style>