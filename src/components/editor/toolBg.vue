<template>
  <div>
    <div class="controls-tabs">
      <div class="controls-tabs__item" :class="{ _active: activeTab === 'color' }" @click="activeTab = 'color'">
        <span>Цвет</span>
      </div>
      <div class="controls-tabs__item" :class="{ _active: activeTab === 'gradient' }" @click="activeTab = 'gradient'">
        <span>Градиент</span>
      </div>
      <div class="controls-tabs__item" :class="{ _active: activeTab === 'pattern' }" @click="activeTab = 'pattern'">
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
                   size="sm"
                   v-b-tooltip.hover.bottom
                   title="Перевернуть"
                   @click="revertGradient"
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

    <div v-show="activeTab === 'pattern'">
      <div class="controls-title">Загрузить текстуру</div>
      <label class="input-file" for="pattern-file">
        <div class="btn btn-success btn-sm" :disabled="patternLoading" :class="{ disabled: patternLoading }">
          <i class="fas fa-upload" v-show="!patternLoading"></i>
          <i class="fas fa-spinner fa-spin" v-show="patternLoading"></i>
          Выбрать файл
        </div>
        <input id="pattern-file"
               type="file"
               accept=".jpg,.jpeg,.png"
               hidden
               ref="pattern"
               @change="handlePatternUpload"
               :disabled="patternLoading"
        />
      </label>
      <div class="controls-title">Текстуры проекта</div>
      <div class="pattern">
        <div class="pattern__item _contain"
             v-for="pat in currentProject.patterns"
             :style="{ backgroundImage: `url(${pat})` }"
             @click="changeBgPattern(pat)"
        >
          <div class="pattern__delete">
            <i class="fa fa-times"
               v-b-tooltip.hover
               title="Удалить"
               @click.stop="deletePattern(pat)"
            ></i>
          </div>
        </div>
      </div>
      <div class="controls-title">Готовые текстуры</div>
      <div class="pattern">
        <div class="pattern__item"
             v-for="num in 4"
             :style="{ backgroundImage: `url(./patterns/${num}.png)` }"
             @click="changeBgPattern(`./patterns/${num}.png`)"
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
      gradientRevert: false,
      currentBg: null,
      patternLoading: false
    }),
    computed: {
      currentProject () {
        return this.$store.getters['user/currentProject'];
      },
      user () {
        return this.$store.getters['user/user'];
      },
    },
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
        this.currentBg = bg;
        this.$bus.$emit('editor:changeBgGradient', {color1: bg.colors[0], color2: bg.colors[1], type: this.gradientType, revert: this.gradientRevert});
      },

      changeGradientType(type) {
        this.gradientType = type;
        if (this.currentBg) {
          this.changeBgGradient(this.currentBg);
        }
      },

      revertGradient () {
        this.gradientRevert = !this.gradientRevert;
        if (this.currentBg) {
          this.changeBgGradient(this.currentBg);
        }
      },

      changeBgPattern (path) {
        this.$bus.$emit('editor:changeBgPattern', path);
      },

      handlePatternUpload () {
        this.patternLoading = true;
        let file = this.$refs.pattern.files[0];
        if (file.size > 2000000) {
          this.$swal({
            title: `Ошибка`,
            html: `Максимальный размер файла 2 мегабайта`,
            type: 'error'
          });
          return;
        }
        let fd = new FormData();
        fd.append('file', file);
        this.$store.dispatch('user/uploadPattern', {
          project_id: this.currentProject._id,
          form_data: fd
        }).then(() => {
          this.$swal({
            title: `Текстура загружена`,
            type: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000
          });
        }).catch(() => {
          this.$swal({
            title: `Ошибка загрузки`,
            type: 'error',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000
          });
        }).finally(() => {
          this.patternLoading = false;
        })
      },

      deletePattern (pat) {
        this.$swal({
          title: `Удалить текстуру?`,
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Удалить',
          cancelButtonText: 'Отмена',
        }).then(res => {
          if (res.value) {
            this.$store.dispatch('user/deletePattern', {
              project_id: this.currentProject._id,
              pattern: pat
            }).then(() => {
              this.$swal({
                title: `Текстура удалена`,
                type: 'success',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000
              });
            }).catch(() => {
              this.$swal({
                title: `Ошибка удаления`,
                type: 'error',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000
              });
            })
          }
        })
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

  .pattern {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 15px;

    &__item {
      width: 120px;
      height: 120px;
      border-radius: 2px;
      cursor: pointer;
      margin-right: 10px;
      margin-bottom: 10px;
      background-color: $color-bg-1;
      background-size: auto;
      background-repeat: no-repeat;
      background-position: center;

      &._contain {
        background-size: contain;
      }

      &:nth-child(4n) {
        margin-right: 0;
      }

      &:hover {
        .pattern__delete i {
          display: block;
        }
      }
    }

    &__delete {
      color: $color-danger;
      align-items: center;
      justify-content: center;
      height: 100%;
      border-radius: 1px;
      font-size: 14px;
      position: relative;

      i {
        display: none;
        position: absolute;
        right: 0;
        padding: 10px;
        background-color: lighten($color-danger, 20%);
        border-radius: 0 0 0 10px;
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
      height: 40px;
      width: 70px;
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

  .input-file {
    margin-bottom: 15px;
  }
</style>