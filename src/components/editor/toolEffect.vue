<template>
  <div>
    <div class="controls-title">
      Наложение цвета
      <span>1</span>
    </div>
    <div class="slider-wrap">
      <vue-slider
        :min="0"
        :max="100"
        :interval="1"
        tooltip="none"
      >
      </vue-slider>
    </div>
    <div class="controls-title">
      Фильтры
    </div>
    <div>
      Фильтр 1
    </div>
    <div class="controls-title">
      Размытие
    </div>
    <div class="slider-wrap">
      <vue-slider
              :min="0"
              :max="100"
              :interval="1"
              tooltip="none"
      >
      </vue-slider>
    </div>
    <div class="controls-title">
      Затемнение
    </div>
    <div class="slider-wrap">
      <vue-slider
              :min="0"
              :max="100"
              :interval="1"
              tooltip="none"
      >
      </vue-slider>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>

</style>