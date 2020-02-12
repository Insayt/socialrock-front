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

    <div v-show="activeTab === 'color'">
      <div class="controls-title">Выбрать цвет</div>
      <div class="color-dropdown">
        <b-dropdown class="color-dropdown__dropdown">
          <template v-slot:button-content>
            <div class="color-dropdown__color" :style="{ backgroundColor: userColor }"></div>
          </template>
          <b-dropdown-group>
            <color-picker
                    theme="light"
                    :color="userColor"
                    @changeColor="changeColor"
            />
          </b-dropdown-group>
        </b-dropdown>
      </div>
      <div class="controls-title">Палитра цветов</div>
      <div class="colors">
        <div class="colors__item"
             v-for="color in colorsDefault"
             :style="{ backgroundColor: color }"
             :class="{ transparent: color === 'transparent' }"
             @click="changeBg(color)"
        ></div>
      </div>
    </div>

    <div v-show="activeTab === 'gradient'">
      <div class="controls-title">Настройки градиента</div>
      <div class="gradient-settings">
        <b-button :variant="gradientType === 'vertical' ? 'primary' : 'black'"
                  v-b-tooltip.hover
                  title="Вертикальный"
                  @click="changeGradientType('vertical')"
        >
          <i class="fad fa-arrows-v"></i>
        </b-button>
        <b-button :variant="gradientType === 'horizontal' ? 'primary' : 'black'"
                  v-b-tooltip.hover
                  title="Горизонтальный"
                  @click="changeGradientType('horizontal')"
        >
          <i class="fad fa-arrows-h"></i>
        </b-button>
        <b-button class="angle"
                  :variant="gradientType === 'angle' ? 'primary' : 'black'"
                  v-b-tooltip.hover
                  title="Под углом"
                  @click="changeGradientType('angle')"
        >
          <i class="fad fa-arrows-h"></i>
        </b-button>
      </div>
      <div class="gradient-settings">
        <b-button  :variant="gradientRevert ? 'primary' : 'black'"
                   size="sm" v-b-tooltip.hover.bottom
                   title="Перевернуть"
                   @click="gradientRevert = !gradientRevert"
        >
          <i class="fas fa-sync"></i>
        </b-button>
      </div>
      <div class="controls-title">Выберите градиент</div>
      <div class="colors">
        <div class="colors__item"
             v-for="bg in backgroundsDefault"
             :style="{ background: generateGradient(bg) }"
             @click="changeBgGradient(bg)"
             :title="bg.name"
        ></div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data: () => ({
      userColor: '#FFFFFF',
      activeTab: 'color',
      colorsDefault: ['transparent', '#000000', '#FFFFFF', '#FF1900', '#F47365', '#FFB243', '#FFE623', '#6EFF2A', '#1BC7B1', '#00BEFF', '#2E81FF', '#5D61FF', '#FF89CF', '#FC3CAD', '#BF3DCE', '#8E00A7'],
      backgroundsDefault: require('../../gradients'),
      gradientType: 'vertical',
      gradientRevert: false
    }),
    methods: {
      generateGradient (bg) {
        if (this.gradientType === 'vertical') {
          if (this.gradientRevert) {
            return `linear-gradient(to bottom, ${bg.colors[0]}, ${bg.colors[1]})`;
          } else {
            return `linear-gradient(to top, ${bg.colors[0]}, ${bg.colors[1]})`;
          }
        } else if (this.gradientType === 'horizontal') {
          if (this.gradientRevert) {
            return `linear-gradient(to left, ${bg.colors[0]}, ${bg.colors[1]})`;
          } else {
            return `linear-gradient(to right, ${bg.colors[0]}, ${bg.colors[1]})`;
          }
        } else if (this.gradientType === 'angle') {
          if (this.gradientRevert) {
            return `linear-gradient(135deg, ${bg.colors[0]}, ${bg.colors[1]})`;
          } else {
            return `linear-gradient(135deg, ${bg.colors[1]}, ${bg.colors[0]})`;
          }
        }
      },

      changeColor(color) {
        const {r, g, b, a} = color.rgba;
        this.userColor = `rgba(${r}, ${g}, ${b}, ${a})`;
        this.changeBg(this.userColor);
      },

      changeBg(color) {
        this.$bus.$emit('editor:changeBg', color)
      },

      changeBgGradient(bg) {
        this.$bus.$emit('editor:changeBgGradient', {color1: bg.colors[0], color2: bg.colors[1], type: this.gradientType, revert: this.gradientRevert});
      },

      changeGradientType(type) {
        this.gradientType = type;
        // this.$bus.$emit('editor:changeBgGradient', {color1: bg.colors[0], color2: bg.colors[1], type: this.gradientType})
      }
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

  .color-dropdown {
    margin-bottom: 15px;

    &__color {
      border-radius: 2px;
    }
  }

  .gradient-settings {
    margin-bottom: 15px;

    button {
      height: 38px;
      width: 76px;
      margin-right: 10px;
      font-size: 20px;
      padding: 0;

      &.angle {
        i {
          transform: rotate(45deg);
        }
      }
    }
  }
</style>