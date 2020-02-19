<template>
  <div>
    <div class="controls-tabs">
      <div class="controls-tabs__item" :class="{ _active: activeTab === 'color' }" @click="activeTab = 'color'">
        <span>Иконка</span>
      </div>
      <div class="controls-tabs__item" :class="{ _active: activeTab === 'gradient' }" @click="activeTab = 'gradient'">
        <span>Стикер</span>
      </div>
      <div class="controls-tabs__item" :class="{ _active: activeTab === 'pattern' }" @click="activeTab = 'pattern'">
        <span>Картинка</span>
      </div>
      <div class="controls-tabs__item" :class="{ _active: activeTab === 'shape' }" @click="activeTab = 'shape'">
        <span>Фигура</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      activeTab: 'color',
    }),
  }
</script>

<style scoped lang="scss">
  @import "../../variables";

  .controls-tabs {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    border-bottom: 1px solid $color-bg-9;

    &__item {
      color: rgba(255, 255, 255, 0.8);
      font-size: 14px;
      font-weight: bold;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      padding-bottom: 10px;
      transition: all 0.1s;

      &._active {
        border-color: $color-primary;
        color: $color-primary;
      }
    }
  }

</style>