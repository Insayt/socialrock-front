<template>
  <div class="text-tool">
    <div class="text-tool__add">
      <div class="text-tool__item _header" @click="addObject('title', 'Заголовок')">
        Заголовок
      </div>
      <div class="text-tool__item _subheader">
        Подзаголовок
      </div>
      <div class="text-tool__item _text">
        Текст
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({

    }),
    methods: {
      addObject(type, data) {
        if (type === 'title') {
          let skew = 1;
          let fw = 'normal';
          if (data === 'Заголовок') {
            skew = 2;
            fw = 'bold';
          }
          if (data === 'Подзаголовок') {
            skew = 1.5;
          }
          if (data === 'Текст') {
            skew = 1;
          }
          let text = new fabric.IText(data, {
            fontFamily: 'Arial',
            editable: true,
            lineHeight: 1.2,
            lockUniScaling: true,
            fontWeight: fw,
            scaleX: skew,
            scaleY: skew,
            fill: '#ffffff',
            shadow: {
              color: '#8B8B8B',
              blur: 0,
              offsetX: 0,
              offsetY: 0
            },
          });
          this.canvas.add(text);
          text.center();
          this.saveState();
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  @import '../../variables';
  .text-tool {
    &__add {
      text-align: center;
    }

    &__item {
      margin-bottom: 15px;
      cursor: pointer;
      color: $color-font;

      &:hover {
        color: $color-font-gray;
      }

      &._header {
        font-size: 36px;
        font-weight: bold;
      }
      &._subheader {
        font-size: 26px;
      }
      &._text {
        font-size: 18px;
      }

    }
  }
</style>