<template>
  <div>
    <div class="controls-title">
      Повернуть & Отразить
    </div>
    <div class="controls-title">
      <b-button
              variant="black"
              v-b-tooltip.hover
              title="Повернуть на 90° влево"
              @click="$bus.$emit('editor:rotateObject', -90)"
      >
        <i class="fas fa-undo"></i>
      </b-button>
      <b-button
              variant="black"
              v-b-tooltip.hover
              title="Повернуть на 90° вправо"
              @click="$bus.$emit('editor:rotateObject', 90)"
      >
        <i class="fas fa-redo"></i>
      </b-button>
      <b-button
              class="svg-button"
              variant="black"
              v-b-tooltip.hover
              title="Отразить по вертикали"
              @click="$bus.$emit('editor:flipObject', 'x')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
             focusable="false" width="20px" height="20px"
             style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
             preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
          <path d="M15 21h2v-2h-2v2zm4-12h2V7h-2v2zM3 5v14c0 1.1.9 2 2 2h4v-2H5V5h4V3H5c-1.1 0-2 .9-2 2zm16-2v2h2c0-1.1-.9-2-2-2zm-8 20h2V1h-2v22zm8-6h2v-2h-2v2zM15 5h2V3h-2v2zm4 8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2z"
                fill="#E1E1E1"/>
        </svg>
      </b-button>
      <b-button
              class="svg-button"
              variant="black"
              v-b-tooltip.hover
              title="Отразить по горизонтали"
              @click="$bus.$emit('editor:flipObject', 'y')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
             focusable="false" width="20px" height="20px"
             style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
             preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
          <path d="M3 15v2h2v-2m10 4v2h2v-2m2-16H5c-1.1 0-2 .9-2 2v4h2V5h14v4h2V5c0-1.1-.9-2-2-2m2 16h-2v2c1.1 0 2-.9 2-2M1 11v2h22v-2M7 19v2h2v-2m10-4v2h2v-2m-10 4v2h2v-2M3 19c0 1.1.9 2 2 2v-2z"
                fill="#E1E1E1"/>
        </svg>
      </b-button>
    </div>
    <div class="controls-title">
      Прозрачность
      <span>{{ imageOpacity }}</span>
    </div>
    <div class="slider-wrap">
      <vue-slider
              v-model="imageOpacity"
              :min="0"
              :max="100"
              tooltip="none"
              @change="$bus.$emit('editor:changeOpacity', imageOpacity)"
      ></vue-slider>
    </div>

    <template v-if="['image', 'rect', 'circle', 'triangle', 'ellipse'].includes(type)">
      <div class="controls-title">
        Заливка
        <div class="color-dropdown _small">
          <b-dropdown class="color-dropdown__dropdown" ref="filldropdown">
            <template v-slot:button-content>
              <div class="color-dropdown__color" :style="{ backgroundColor: fill }"></div>
            </template>
            <b-dropdown-group>
              <color-picker
                      theme="light"
                      :color="fill"
                      @changeColor="changeFillColor"
              />
              <b-button
                      block
                      variant="primary"
                      size="sm"
                      class="picker-button"
                      @click="changeFillColorSet"
              >
                Выбрать
              </b-button>
            </b-dropdown-group>
          </b-dropdown>
        </div>
      </div>
    </template>

    <template v-if="['image', 'rect', 'circle', 'triangle', 'ellipse'].includes(type)">
      <div class="controls-title">
        Размер рамки
        <span>{{ strokeVal }}</span>
      </div>
      <div class="slider-wrap">
        <vue-slider
                v-model="strokeVal"
                :min="0"
                :max="100"
                tooltip="none"
                @change="$bus.$emit('editor:changeStroke', strokeVal)"
        ></vue-slider>
      </div>

      <div class="controls-title">
        Цвет рамки
        <div class="color-dropdown _small">
          <b-dropdown class="color-dropdown__dropdown" ref="fillstrokedropdown">
            <template v-slot:button-content>
              <div class="color-dropdown__color" :style="{ backgroundColor: stroke }"></div>
            </template>
            <b-dropdown-group>
              <color-picker
                      theme="light"
                      :color="stroke"
                      @changeColor="changeStrokeColor"
              />
              <b-button
                      block
                      variant="primary"
                      size="sm"
                      class="picker-button"
                      @click="changeStrokeColorSet"
              >
                Выбрать
              </b-button>
            </b-dropdown-group>
          </b-dropdown>
        </div>
      </div>
    </template>

  </div>
</template>

<script>
  export default {
    props: [
      'opacity',
      'type',
      'fill',
      'stroke',
      'strokeWidth'
    ],
    data: () => ({
      imageOpacity: 0,
      strokeVal: 0,
      fillStroke: '#000000',
      fillColor: '#FFFFFF'
    }),
    mounted() {
      this.$nextTick(() => {
        this.imageOpacity = Math.floor(this.opacity * 100);
        this.strokeVal = this.strokeWidth;
      });
    },
    methods: {
      changeFillColor(color) {
        const {r, g, b, a} = color.rgba;
        this.fillColor = `rgba(${r}, ${g}, ${b}, ${a})`;
      },

      changeFillColorSet () {
        this.$bus.$emit('editor:changeFill', this.fillColor);
        this.$refs['filldropdown'].hide(true)
      },
      changeStrokeColor(color) {
        const {r, g, b, a} = color.rgba;
        this.fillStroke = `rgba(${r}, ${g}, ${b}, ${a})`;
      },

      changeStrokeColorSet () {
        this.$bus.$emit('editor:changeStrokeColor', this.fillStroke);
        this.$refs['fillstrokedropdown'].hide(true)
      },
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

  .slider-wrap {
    margin-bottom: 15px;
  }
</style>