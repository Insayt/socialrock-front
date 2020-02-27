<template>
  <div>
    <div class="controls-tabs">
<!--      <div class="controls-tabs__item" :class="{ _active: activeTab === 'color' }" @click="activeTab = 'color'">-->
<!--        <span>Иконка</span>-->
<!--      </div>-->
      <div class="controls-tabs__item" :class="{ _active: activeTab === 'stickers' }" @click="activeTab = 'stickers'">
        <span>Стикеры</span>
      </div>
      <div class="controls-tabs__item" :class="{ _active: activeTab === 'img' }" @click="activeTab = 'img'">
        <span>Картинка</span>
      </div>
      <div class="controls-tabs__item" :class="{ _active: activeTab === 'shape' }" @click="activeTab = 'shape'">
        <span>Фигура</span>
      </div>
    </div>
    <div class="editor-sidebar-tools">
      <div v-if="activeTab === 'stickers'">
        <div v-for="s in stickers">
          <div class="controls-title">{{ s.name }}</div>
          <div class="sticker">
            <div class="sticker__item"
                 v-for="img in s.count"
                 :style="{ backgroundImage: `url(./stickers/${s.folder}/${img}.png)` }"
                 @click="addSticker(`./stickers/${s.folder}/${img}.png`)"
            ></div>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'img'">
        <images type="graphic"></images>
      </div>
    </div>
  </div>
</template>

<script>
  import Images from './Images';
  export default {
    components: {
      Images
    },
    data: () => ({
      activeTab: 'stickers',
      stickers: [
        {
          name: 'Мемы',
          folder: 'memes',
          count: 10,
        },
        {
          name: 'Смайлы',
          folder: 'smile',
          count: 32,
        },
      ]
    }),
    methods: {
      addSticker (url) {
        this.$bus.$emit('editor:addImage', url);
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

  .sticker {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 15px;

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
      background-size: contain;

      &:nth-child(2n) {
        margin-right: 0;
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

</style>