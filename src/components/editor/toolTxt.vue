<template>
  <div class="text-tool">
    <div class="controls-title">Шрифт</div>
    <div class="control-select">
      <multiselect
        class="font-select"
        v-model="font"
        @input="changeProp('fontFamily', font.val)"
        :options="fontList"
        :selectLabel="''"
        :selectedLabel="''"
        :deselectLabel="''"
        :searchable="true"
        :allow-empty="false"
        :placeholder="'Шрифт...'"
        :close-on-select="false"
        :max-height="400"
        group-values="list"
        group-label="type"
        track-by="val"
        label="name"
      >
        <span slot="noResult">Нет такого шрифта :(</span>
        <template slot="option" slot-scope="props">
          <span :style="{ fontFamily: props.option.val }">
            {{ props.option.name || props.option.$groupLabel }}
          </span>
        </template>
      </multiselect>
    </div>
    <div class="controls-icon-wrap">
      <div class="controls-icon"
         :class="{ active: fontWeight === 'bold' }"
         @click="changeProp('fontWeight', fontWeight === 'bold' ? 'normal' : 'bold')"
      >
        <i class="fas fa-bold"></i>
      </div>
      <div class="controls-icon"
         :class="{ active: fontStyle === 'italic' }"
         @click="changeProp('fontStyle',fontStyle === 'italic' ? 'normal' : 'italic')"
      >
        <i class="fas fa-italic"></i>
      </div>
      <div class="controls-icon"
         :class="{ active: underline }"
         @click="changeProp('underline', !underline)"
      >
        <i class="fas fa-underline"></i>
      </div>
      <div class="controls-icon"
         :class="{ active: overline }"
         @click="changeProp('overline', !overline)"
      >
        <i class="fas fa-underline icon-rotate"></i>
      </div>
      <div class="controls-icon"
         :class="{ active: linethrough }"
         @click="changeProp('linethrough', !linethrough)"
      >
        <i class="fas fa-strikethrough"></i>
      </div>
    </div>
    <div class="controls-icon-wrap">
      <div class="controls-icon"
         :class="{ active: textAlign === 'left' }"
         @click="changeProp('textAlign', 'left')"
      >
        <i class="fas fa-align-left"></i>
      </div>
      <div class="controls-icon"
         :class="{ active: textAlign === 'center' }"
         @click="changeProp('textAlign', 'center')"
      >
        <i class="fas fa-align-center"></i>
      </div>
      <div class="controls-icon"
         :class="{ active: textAlign === 'right' }"
         @click="changeProp('textAlign', 'right')"
      >
        <i class="fas fa-align-right"></i>
      </div>
      <div class="color-dropdown _small">
        <b-dropdown class="color-dropdown__dropdown" ref="colordropdown">
          <template v-slot:button-content>
            <div class="color-dropdown__color" :style="{ backgroundColor: fill }"></div>
          </template>
          <b-dropdown-group>
            <color-picker
                theme="light"
                :color="fill"
                @changeColor="changeColor"
            />
            <b-button
                block
                variant="primary"
                size="sm"
                class="picker-button"
                @click="changeColorSet"
            >
              Выбрать
            </b-button>
          </b-dropdown-group>
        </b-dropdown>
      </div>
    </div>
    <div class="controls-title">
      Интервал между буквами
      <span>{{ letterSpacing }}</span>
    </div>
    <div class="slider-wrap">
      <vue-slider
        v-model="letterSpacing"
        :min="-10"
        :max="20"
        tooltip="none"
        @change="changeProp('charSpacing', letterSpacing * 30)"
      ></vue-slider>
    </div>

    <div class="controls-title">
      Межстрочный интервал
      <span>{{ vLineHeight }}</span>
    </div>
    <div class="slider-wrap">
      <vue-slider
        v-model="vLineHeight"
        :min="0.8"
        :max="3"
        :interval="0.1"
        tooltip="none"
        @change="changeProp('lineHeight', vLineHeight)"
      >
      </vue-slider>
    </div>

    <div class="controls-title">
      Тень
      <div class="color-dropdown _small">
        <b-dropdown class="color-dropdown__dropdown" ref="colordropdownshadow">
          <template v-slot:button-content>
            <div class="color-dropdown__color" :style="{ backgroundColor: vShadow.color }"></div>
          </template>
          <b-dropdown-group>
            <color-picker
                    theme="light"
                    :color="vShadow.color"
                    @changeColor="changeShadowColor"
            />
            <b-button
                    block
                    variant="primary"
                    size="sm"
                    class="picker-button"
                    @click="changeShadowColorSet"
            >
              Выбрать
            </b-button>
          </b-dropdown-group>
        </b-dropdown>
      </div>
    </div>

    <div class="shadows">
      <div class="shadows__item">
        <div class="controls-title">Отступ</div>
        <vue-slider
          v-model="vShadow.offsetX"
          :min="0"
          :max="25"
          :interval="1"
          tooltip="none"
          @change="debounceChangeShadow"
        >
        </vue-slider>
      </div>
      <div class="shadows__item">
        <div class="controls-title">Размытие</div>
        <vue-slider
          v-model="vShadow.blur"
          :min="0"
          :max="15"
          :interval="1"
          tooltip="none"
          @change="debounceChangeShadow"
        >
        </vue-slider>
      </div>
    </div>
  </div>
</template>

<script>
  import { debounce } from 'lodash';

  export default {
    components: {},
    inheritAttrs: false,
    props: [
      'type',
      'fontWeight',
      'fontStyle',
      'textAlign',
      'fontFamily',
      'fill',
      'ffList',
      'charSpacing',
      'lineHeight',
      'underline',
      'linethrough',
      'overline',
      'shadow'
    ],
    data: () => ({
      font: {
        val: '',
        name: ''
      },
      fontList: [
        {
          type: 'Стандартные:',
          list: [
            {val: 'Arial', name: 'Arial'},
            {val: 'Arial Black', name: 'Arial Black'},
            {val: 'Comic Sans MS', name: 'Comic Sans MS'},
            {val: 'Courier New', name: 'Courier New'},
            {val: 'Georgia', name: 'Georgia'},
            {val: 'Verdana', name: 'Verdana'},
            {val: 'Times New Roman', name: 'Times New Roman'},
            {val: 'Impact', name: 'Impact'},
          ]
        },
        {
          type: 'Без засечек:',
          list: [
            {val: 'Alegreya Sans', name: 'Alegreya Sans'},
            {val: 'Alegreya Sans SC', name: 'Alegreya Sans SC'},
            {val: 'Andika', name: 'Andika'},
            {val: 'Arimo', name: 'Arimo'},
            {val: 'Arsenal', name: 'Arsenal'},
            {val: 'Cuprum', name: 'Cuprum'},
            {val: 'Didact Gothic', name: 'Didact Gothic'},
            {val: 'El Messiri', name: 'El Messiri'},
            {val: 'Exo 2', name: 'Exo 2'},
            {val: 'Fira Sans', name: 'Fira Sans'},
            {val: 'Fira Sans Condensed', name: 'Fira Sans Condensed'},
            {val: 'Fira Sans Extra Condensed', name: 'Fira Sans Extra Condensed'},
            {val: 'IBM Plex Sans', name: 'IBM Plex Sans'},
            {val: 'Istok Web', name: 'Istok Web'},
            {val: 'Jura', name: 'Jura'},
            {val: 'Marmelad', name: 'Marmelad'},
            {val: 'Montserrat', name: 'Montserrat'},
            {val: 'Montserrat Alternates', name: 'Montserrat Alternates'},
            {val: 'Noto Sans', name: 'Noto Sans'},
            {val: 'Open Sans', name: 'Open Sans'},
            {val: 'Open Sans Condensed', name: 'Open Sans Condensed'},
            {val: 'Oswald', name: 'Oswald'},
            {val: 'Philosopher', name: 'Philosopher'},
            {val: 'Play', name: 'Play'},
            {val: 'PT Sans', name: 'PT Sans'},
            {val: 'PT Sans Caption', name: 'PT Sans Caption'},
            {val: 'PT Sans Narrow', name: 'PT Sans Narrow'},
            {val: 'Roboto', name: 'Roboto'},
            {val: 'Roboto Condensed', name: 'Roboto Condensed'},
            {val: 'Rubik', name: 'Rubik'},
            {val: 'Rubik Mono One', name: 'Rubik Mono One'},
            {val: 'Russo One', name: 'Russo One'},
            {val: 'Scada', name: 'Scada'},
            {val: 'Seymour One', name: 'Seymour One'},
            {val: 'Source Sans Pro', name: 'Source Sans Pro'},
            {val: 'Tenor Sans', name: 'Tenor Sans'},
            {val: 'Ubuntu', name: 'Ubuntu'},
          ]
        },
        {
          type: 'С засечками:',
          list: [
            {val: 'Alegreya', name: 'Alegreya'},
            {val: 'Alegreya SC', name: 'Alegreya SC'},
            {val: 'Alice', name: 'Alice'},
            {val: 'Cormorant', name: 'Cormorant'},
            {val: 'Cormorant Garamond', name: 'Cormorant Garamond'},
            {val: 'Cormorant Infant', name: 'Cormorant Infant'},
            {val: 'Cormorant SC', name: 'Cormorant SC'},
            {val: 'EB Garamond', name: 'EB Garamond'},
            {val: 'Gabriela', name: 'Gabriela'},
            {val: 'Ledger', name: 'Ledger'},
            {val: 'Lora', name: 'Lora'},
            {val: 'Merriweather', name: 'Merriweather'},
            {val: 'Noto Serif', name: 'Noto Serif'},
            {val: 'Old Standard TT', name: 'Old Standard TT'},
            {val: 'Oranienbaum', name: 'Oranienbaum'},
            {val: 'Playfair Display', name: 'Playfair Display'},
            {val: 'Playfair Display SC', name: 'Playfair Display SC'},
            {val: 'Podkova', name: 'Podkova'},
            {val: 'Prata', name: 'Prata'},
            {val: 'PT Serif', name: 'PT Serif'},
            {val: 'PT Serif Caption', name: 'PT Serif Caption'},
            {val: 'Roboto Slab', name: 'Roboto Slab'},
            {val: 'Spectral', name: 'Spectral'},
            {val: 'Spectral SC', name: 'Spectral SC'},
            {val: 'Tinos', name: 'Tinos'},
            {val: 'Vollkorn', name: 'Vollkorn'},
            {val: 'Vollkorn SC', name: 'Vollkorn SC'},
          ]
        },
        {
          type: 'Декоративные:',
          list: [
            {val: 'Lobster', name: 'Lobster'},
            {val: 'Comfortaa', name: 'Comfortaa'},
            {val: 'Underdog', name: 'Underdog'},
            {val: 'Poiret One', name: 'Poiret One'},
            {val: 'Press Start 2P', name: 'Press Start 2P'},
            {val: 'Prosto One', name: 'Prosto One'},
            {val: 'Forum', name: 'Forum'},
            {val: 'Yeseva One', name: 'Yeseva One'},
            {val: 'Kelly Slab', name: 'Kelly Slab'},
            {val: 'Ruslan Display', name: 'Ruslan Display'},
            {val: 'Stalinist One', name: 'Stalinist One'},
          ]
        },
        {
          type: 'Рукописные:',
          list: [
            {val: 'Pacifico', name: 'Pacifico'},
            {val: 'Amatic SC', name: 'Amatic SC'},
            {val: 'Caveat', name: 'Caveat'},
            {val: 'Marck Script', name: 'Marck Script'},
            {val: 'Neucha', name: 'Neucha'},
            {val: 'Bad Script', name: 'Bad Script'},
            {val: 'Pangolin', name: 'Pangolin'},
          ]
        }
      ],
      letterSpacing: 0,
      vLineHeight: 1.2,
      userColor: null,
      vShadow: {
        color: 'red',
        blur: 0,
        offsetX: 0,
        offsetY: 0
      }
    }),
    created () {
      this.debounceChangeShadow = debounce(this.changeShadow, 200);
    },
    mounted() {
      this.$nextTick(() => {
        this.font = {val: this.fontFamily, name: this.fontFamily};
        this.letterSpacing = this.charSpacing / 30;
        this.vLineHeight = this.lineHeight;
        this.vShadow = this.shadow;
      });
    },
    methods: {
      changeColor(color) {
        const {r, g, b, a} = color.rgba;
        this.userColor = `rgba(${r}, ${g}, ${b}, ${a})`;
      },
      changeShadowColor(color) {
        const {r, g, b, a} = color.rgba;
        this.vShadow.color = `rgba(${r}, ${g}, ${b}, ${a})`;
      },
      changeProp(type, val) {
        this.$emit('changeProp', {
          type,
          val
        })
      },
      changeColorSet () {
        this.changeProp('fill', this.userColor);
        this.$refs['colordropdown'].hide(true)
      },
      changeShadow() {
        let shadow = {
          color: this.vShadow.color,
          blur: this.vShadow.blur,
          offsetX: this.vShadow.offsetX,
          offsetY: this.vShadow.offsetX
        };
        this.changeProp('shadow', shadow);
      },
      changeShadowColorSet(color) {
        this.changeProp('shadow.color', this.vShadow.color);
        this.$refs['colordropdownshadow'].hide(true);
      },
    }
  }
</script>

<style scoped lang="scss">
  @import '../../variables';
  .text-tool {

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
  .controls-icon-wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  .controls-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
    margin-right: 5px;
    color: rgba(255, 255, 255, 0.8);

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    &.active {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  .icon-rotate {
    transform: rotate(180deg);
  }
  .slider-wrap {
    margin-bottom: 15px;
  }
  .shadows {
    &__item {
      margin-bottom: 15px;
    }
    &__title {
      font-size: 14px;
      text-align: left;
      margin-bottom: 10px;
      margin-top: 10px;
      color: rgba(255, 255, 255, 0.8);
    }
  }
</style>