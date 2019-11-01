<template>
  <div class="post-wrapper" @click="$emit('click', post)">
    <div class="post _empty" v-if="!post.id">
      <div class="post__content">
        <div class="post__icon">
          <img src="../assets/img/icons/plus-round.svg">
        </div>
        <div class="post__time">
          <img src="../assets/img/icons/clock.svg"> 09:00
        </div>
        <!--<div class="post__title">-->
        <!--Запланировать пост-->
        <!--</div>-->
      </div>
    </div>
    <div v-else class="post _full">
      <div class="post__header">
        <div class="post__time-small">
          <img src="../assets/img/icons/clock.svg"> 09:00
          <i class="fa fa-trash text-danger" v-b-tooltip.hover title="Удалить 13.01.2019 в 22:00"></i>
        </div>
        <div class="post__tags">
          <div class="tag" v-b-tooltip.hover title="Моя рубрика">М</div>
          <div class="tag" v-b-tooltip.hover title="Следующая рубрика">С</div>
        </div>
      </div>
      <div class="post__content">
        Некий текст для тестового
        поста который уйдет в разные
        социальные сети
        <div class="post__images">
          <img class="post-image" src="/test1.jpg">
          <img class="post-image" src="/test1.jpg">
          <img class="post-image" src="/test1.jpg">
          <img class="post-image" src="/test1.jpg">
          <img class="post-image" src="/test1.jpg">
        </div>
      </div>
      <div class="post__footer">
        <div class="post-social" :style="{ backgroundImage: `url(/test1.jpg)` }">
          <i class="fab fa-vk"></i>
        </div>
        <div class="post-social" :style="{ backgroundImage: `url(/test1.jpg)` }">
          <i class="fab fa-vk"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      post: {
        required: false,
        type: Object,
      }
    },
    data: () => ({

    }),
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .post {
    width: 200px;
    height: 200px;
    border: 1px dashed #A2A2A2;
    color: #A2A2A2;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    margin-right: 20px;

    &:hover {
      background-color: rgba(#A2A2A2, 0.1);
    }

    &._empty {
      .post__content {
        margin-bottom: 0;
      }
    }

    &._full {
      display: block;
      border: 1px solid #A2A2A2;
      background-color: #313033;
      font-weight: normal;
    }

    &__header {
      display: flex;
      padding: 10px 10px 0 10px;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }


    &__time-small {
      font-size: 14px;
      img {
        width: 20px;
        margin-right: 5px;
      }
      i {
        margin-left: 5px;
      }
    }

    &__tags {
      display: flex;
    }

    .tag {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      color: #F0F0F0;
      border-radius: 50%;
      background: linear-gradient(to top, #da22ff, #9733ee);
      font-size: 12px;
      margin-right: 5px;

      &:last-child {
        margin-right: 0;
      }
    }

    &__content {
      min-width: 200px;
      color: #F0F0F0;
      font-size: 14px;
      padding: 0 10px 0 10px;
      margin-bottom: 10px;
    }

    &__icon {
      text-align: center;
      margin-bottom: 20px;
    }

    &__time {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        margin-right: 5px;
      }
    }

    &__title {
      text-align: center;
    }

    &__images {
      margin: 5px 0 5px 0;
      height: 45px;
      overflow: hidden;
    }

    &__footer {
      display: flex;
      padding: 0 10px 0 10px;
    }
  }

  .post-image {
    max-width: 45px;
    max-height: 45px;
    margin-right: 5px;
  }

  .post-social {
    width: 25px;
    height: 25px;
    background-size: cover;
    margin-right: 10px;
    position: relative;
    border-radius: 4px;

    i {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 10px;
      background-color: #4680C2;
      color: white;
      padding: 2px;
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:last-child {
      margin-right: 0;
    }
  }
</style>