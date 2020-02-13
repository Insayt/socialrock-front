<template>
  <div class="editor">
    <div class="editor-sidebar">
      <div class="editor-logo">
        <img src="../assets/img/logo.png">
        <div>SOCIAL<span>ROCK</span></div>
        <div class="editor-logo__budge">РЕДАКТОР</div>
      </div>
      <div class="editor-tabs">
        <div class="editor-tabs__item" :class="{ _active: activeTab === 'bg' }" @click="activeTab = 'bg'">
          <div class="editor-tabs__icon fa fa-image"></div>
          <div class="editor-tabs__title">Фон</div>
        </div>
        <div class="editor-tabs__item" :class="{ _active: activeTab === 'txt' }" @click="activeTab = 'txt'">
          <div class="editor-tabs__icon fa fa-font"></div>
          <div class="editor-tabs__title">Текст</div>
        </div>
        <div class="editor-tabs__item" :class="{ _active: activeTab === 'image' }" @click="activeTab = 'image'">
          <div class="editor-tabs__icon fa fa-smile"></div>
          <div class="editor-tabs__title">Графика</div>
        </div>
        <div class="editor-tabs__item" :class="{ _active: activeTab === 'shape' }" @click="activeTab = 'shape'">
          <div class="editor-tabs__icon fa fa-shapes"></div>
          <div class="editor-tabs__title">Фигура</div>
        </div>
      </div>
      <div class="editor-sidebar-tools" >
        <bg v-if="activeTab === 'bg'"></bg>
      </div>
    </div>
    <div class="editor-header">
      <div class="editor-header__left">
        <b-button variant="black">
          <i class="fas fa-undo"></i>
        </b-button>
        <b-button variant="black">
          <i class="fas fa-redo"></i>
        </b-button>
        <b-button variant="black">
          <i class="fas fa-trash"></i>
        </b-button>
        <b-button variant="black" class="_align-v">
          <i class="fas fa-arrow-down"></i>
          <i class="fas fa-arrow-up"></i>
        </b-button>
        <b-button variant="black" class="_align-h">
          <i class="fas fa-arrow-right"></i>
          <i class="fas fa-arrow-left"></i>
        </b-button>
      </div>

      <div class="editor-header__right">
        <b-button variant="primary">
          <i class="fas fa-save"></i>
        </b-button>
        <b-button variant="black" @click="exportCanvas">
          <i class="fas fa-download"></i>
        </b-button>
        <b-button variant="black" @click="$router.push({ name: 'editor' })">
          <i class="fas fa-times"></i>
        </b-button>
      </div>
    </div>

    <div class="canvas-wrap" ref="canvasFitWrap">
      <div class="canvas-wrap__fit"
       id="canvas-wrap-id"
       ref="canvasFit"
       :style="{ transform: 'scale(' + fitValue + ')', width: canvasParams.width + 'px' }"
       :class="{ '_align-left': canvasAlignLeft }"
      >
        <canvas id="canvas"></canvas>
      </div>
      <div class="canvas-wrap__fitter">
        <div class="canvas-wrap__fitter-slider">
          <vue-slider
            v-model="fitValue"
            :interval="0.01"
            :min="0.1"
            :max="2"
            tooltip="none"
            @change="changeFit"
          >

          </vue-slider>
        </div>
        <div class="canvas-wrap__fitter-val">
          {{ Math.floor(fitValue * 100 ) }}%
        </div>
        <div class="canvas-wrap__fitter-btn" @click="fitCanvas">
          Вписать
        </div>
      </div>
    </div>
    <!--<div class="editor-resize">-->
    <!--Resize-->
    <!--</div>-->
  </div>
</template>

<script>
  import { fabric } from '../fabric';
  import bg from '../components/editor/toolBg';

  export default {
    components: {
      bg
    },
    data: () => ({
      activeTab: 'bg',
      canvasAlignLeft: false,
      fitValue: 1,
      canvas: null,
      canvasParams: {
        width: 1080,
        height: 1080
      },
    }),
    created () {
      this.$bus.$on('editor:changeBg', (color) => {
        this.canvas.backgroundColor = color;
        this.canvas.renderAll();
      });

      this.$bus.$on('editor:changeBgGradient', ({color1, color2, type, revert}) => {
        let bgObject = {
          type: 'linear',
        };
        if (type === 'vertical') {
          bgObject.coords = {
            x1: 0,
            y1: this.canvas.height,
          };
        } else if (type === 'horizontal') {
          bgObject.coords = {
            x2: this.canvas.width,
            y2: 0,
          };
        } else if (type === 'angle') {
          bgObject.coords = {
            x1: this.canvas.width,
            y1: this.canvas.height,
          };
        }

        if (revert) {
          bgObject.colorStops = [
            {
              color: color2,
              offset: 0,
            },
            {
              color: color1,
              offset: 1,
            }
          ];
        } else {
          bgObject.colorStops = [
            {
              color: color1,
              offset: 0,
            },
            {
              color: color2,
              offset: 1,
            }
          ];
        }

        let grad = new fabric.Gradient(bgObject);
        this.canvas.backgroundColor = grad.toLive(this.canvas.contextContainer);
        this.canvas.renderAll();
      })

      this.$bus.$on('editor:changeBgPattern', async (file) => {
        let image = await this.loadPattern(file);
        this.canvas.backgroundColor = new fabric.Pattern({source: image});
        this.canvas.renderAll();
      });
    },
    destroyed() {
      let events = [
        'editor:changeBg',
        'editor:changeBgGradient',
        'editor:changeBgPattern'
      ];
      events.forEach(e => {
        this.$bus.$off(e);
      })
    },
    mounted() {
      // document.addEventListener('keydown', this.keyDown);
      // document.addEventListener('click', this.clickEditor);
      this.canvas = new fabric.Canvas('canvas', {
        preserveObjectStacking: true,
        width: this.canvasParams.width,
        height: this.canvasParams.height
      });
      this.canvas.backgroundColor = 'white';
      this.canvas.renderAll();
      // this.canvas.on('selection:updated', (e) => {
      //   if (e.selected.length === 1) {
      //     this.selection = {};
      //     this.activeTab = null;
      //     this.$nextTick(() => {
      //       this.selection = e.selected[0];
      //     });
      //   }
      // });
      // this.canvas.on('selection:created', (e) => {
      //   if (e.selected.length === 1) {
      //     this.selection = {};
      //     this.activeTab = null;
      //     this.$nextTick(() => {
      //       this.selection = e.selected[0];
      //     });
      //   }
      // });
      // this.canvas.on('selection:cleared', () => {
      //   this.selection = {};
      // });

      // this.canvas.on('object:modified', this.saveState);
      // this.canvas.on('object:added', this.saveState);
      // this.canvas.on('object:removed', this.saveState);

      // this.saveState();
      this.fitCanvas();
    },
    methods: {
      exportCanvas () {
        console.log(this.canvas.toObject());
      },

      async loadPattern(url) {
        return  new Promise((resolve, reject) => {
          fabric.util.loadImage(url, function(img) {
            return resolve(img);
          });
        });
      },

      changeFit () {
        this.$nextTick(() => {
          if (this.$refs['canvasFitWrap'].getBoundingClientRect().width <= this.$refs['canvasFit'].getBoundingClientRect().width) {
            this.canvasAlignLeft = true;
          } else {
            this.canvasAlignLeft = false;
          }
        });
      },
      fitCanvas () {
        let fit;
        if (this.canvasParams.width > this.canvasParams.height) {
          fit = ( window.innerWidth - 320 ) / this.canvasParams.width;
        } else {
          fit = ( window.innerHeight - 130 ) / this.canvasParams.height;
        }
        this.fitValue = fit;
        this.changeFit();
      },
    }
  }
</script>

<style scoped lang="scss">
  @import '../variables';

  .editor {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: $color-bg-0;
    z-index: 10;
    top: 0;
    left: 0;
    padding-left: 300px;
    box-sizing: border-box;
  }

  .editor-header {
    width: 100%;
    height: 60px;
    padding: 10px 20px;
    background-color: $color-bg-1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    button {
      margin-right: 10px;
      height: 38px;
      width: 38px;
      align-items: center;
      justify-content: center;
      display: inline-flex;

      &:last-child {
        margin-right: 0;
      }
      &._align-v {
        flex-direction: column;
        font-size: 10px;
      }

      &._align-h {
        font-size: 10px;
      }
    }
  }

  .editor-logo {
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 10px;
    padding-top: 10px;
    font-weight: bold;
    font-size: 26px;
    display: flex;
    align-items: center;
    color: white;
    position: relative;

    &__budge {
      font-size: 10px;
      margin-left: 8px;
      padding: 2px 8px;
      border-radius: 10px;
      background-color: $color-success;
    }

    img {
      width: 25px;
      margin-right: 10px;
    }
    span {
      color: $color-warning;
    }
  }

  .editor-tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__item {
      border-right: 1px solid $color-bg-9;
      border-bottom: 1px solid $color-bg-9;
      border-top: 1px solid $color-bg-9;
      width: 25%;
      font-size: 13px;
      padding: 8px;
      cursor: pointer;
      text-align: center;

      &:last-child {
        border-right: 0;
      }

      &._active {
        background-color: $color-bg-9;
        border-color: transparent;
      }
    }

    &__icon {
      margin-bottom: 3px;
    }
  }

  .editor-sidebar-tools {
    padding: 20px;
    overflow: auto;
    height: 100%;
    padding-bottom: 100px;
  }

  .editor-sidebar {
    width: 300px;
    background-color: $color-bg-2;
    position: fixed;
    z-index: 1;
    left: 0;
    height: 100%;
    min-height: 100%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }

  .editor-bottom {
    position: absolute;
    bottom: 0;
  }

  .canvas-wrap {
    width: 100%;
    height: 100%;
    overflow: auto;
    position: relative;
    text-align: left;
    padding: 10px;
    box-sizing: border-box;
    transform-origin: center top;
    display: flex;
    justify-content: center;

    &__fit {
      box-sizing: border-box;
      transform-origin: center top;

      &._align-left {
        transform-origin: left top;
        margin-left: -40px;
      }
      /*transform: scale(0.5);*/
    }

    &__fitter {
      margin-left: 150px;
      margin-bottom: 5px;
      position: fixed;
      bottom: 5px;
      left: 50%;
      transform: translateX(-50%);
      background-color: $color-bg-9;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 14px;
      display: flex;
      align-items: center;

      &-slider {
        width: 250px;
        margin-right: 10px;
      }

      &-val {
        margin-right: 10px;
      }

      &-btn {
        cursor: pointer;
        padding: 5px 10px;
        border-radius: 4px;
        background-color: rgba(255, 255, 255, 0.1);

        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
      }
    }

    canvas {
      box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    }
  }
</style>