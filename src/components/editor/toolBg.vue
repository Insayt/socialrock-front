<template>
  <div>
    <div class="controls-tabs">
      <div class="controls-tabs__item" :class="{ _active: activeTab === 'color' }" @click="activeTab = 'color'">
        <span>Цвет</span>
      </div>
      <div class="controls-tabs__item" :class="{ _active: activeTab === 'gradient' }" @click="activeTab = 'gradient'">
        <span>Градиент</span>
      </div>
      <div class="controls-tabs__item" :class="{ _active: activeTab === 'texture' }" @click="activeTab = 'texture'">
        <span>Текстура</span>
      </div>
      <div class="controls-tabs__item" :class="{ _active: activeTab === 'image' }" @click="activeTab = 'image'">
        <span>Картинка</span>
      </div>
    </div>

    <div class="controls-title">Палитра по умолчанию</div>
    <div class="colors">
      <div class="colors__item"
         v-for="color in colorsDefault"
         :style="{ backgroundColor: color }"
         :class="{ transparent: color === 'transparent' }"
         @click="changeBg(color)"
      ></div>

      <div class="colors__item"
         v-for="bg in backgroundsDefault"
         :style="{ backgroundColor: bg.colors[0] }"
      ></div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      color: '#000000',
      activeTab: 'color',
      colorsDefault: ['transparent', '#000000', '#FFFFFF', '#FF1900', '#F47365', '#FFB243', '#FFE623', '#6EFF2A', '#1BC7B1', '#00BEFF', '#2E81FF', '#5D61FF', '#FF89CF', '#FC3CAD', '#BF3DCE', '#8E00A7'],
      backgroundsDefault: require('../../gradients')
    }),
    methods: {
      changeBg (color) {
        console.log(color);
        // this.$emit('changeBg', color)
      }
      // changeColor (color) {
      //   this.color = color.rgba.toRgbaString();
      //   this.changeBg(this.color);
      // },
    }
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

  .colors {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 15px;

    &__item {
      width: 57px;
      height: 57px;
      border-radius: 2px;
      cursor: pointer;
      margin-right: 10px;
      margin-bottom: 10px;

      &:nth-child(4n) {
        margin-right: 0;
      }

      &.add {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        background: rgba(255, 255, 255, 0.1);

        &:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      }
    }
  }

  .transparent {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0FFNTQzRTU5ODRGMTFFMjhBRDVEODk3RjlCOUZGREIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0FFNTQzRTY5ODRGMTFFMjhBRDVEODk3RjlCOUZGREIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozQUU1NDNFMzk4NEYxMUUyOEFENUQ4OTdGOUI5RkZEQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozQUU1NDNFNDk4NEYxMUUyOEFENUQ4OTdGOUI5RkZEQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnjjAFIAAAAmSURBVHjaYvz//z8DEjh79iwyl4kBL6CpNAuaW4yNjQeL0wACDAApUAh6jNqwUwAAAABJRU5ErkJggg==);
    background-repeat: repeat;
  }
</style>