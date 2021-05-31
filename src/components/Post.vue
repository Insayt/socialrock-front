<template>
  <div class="post-wrapper" @click="$emit('click', post)">
    <div class="post _empty" v-if="!post._id">
      <div class="post__content">
        <div class="post__icon">
          <img src="../assets/img/icons/plus-round.svg">
        </div>
        <div class="post__time">
          <img src="../assets/img/icons/clock.svg"> {{ post.time }}
        </div>
        <!--<div class="post__title">-->
        <!--Запланировать пост-->
        <!--</div>-->
      </div>
    </div>
    <div v-else class="post _full" :class="{ _success: post.status === 'finish', _error: post.status === 'error' }">
      <div class="post__header">
        <div class="post__time-small" v-if="post.status === 'new'">
          <img src="../assets/img/icons/clock.svg">
          {{ postTime(post.run_dt) }}
<!--          <i class="fa fa-trash" v-b-tooltip.hover title="Удалить 13.01.2019 в 22:00"></i>-->
        </div>
        <div class="post__time-small"
             v-if="post.status === 'finish'"
             v-b-popover.top.hover="{ variant: 'success',  content: 'Пост опубликован успешно' }"
        >
          <div class="post__time-small-done">
            <i class="fas fa-check"></i>
          </div>
          {{ postTime(post.run_dt) }}
        </div>
        <div class="post__time-small"
             v-if="post.status === 'error'"
             v-b-popover.top.hover="{ variant: 'danger',  content: 'Пост опубликован с ошибками' }"
        >
          <div class="post__time-small-done _error">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          {{ postTime(post.run_dt) }}
        </div>
        <div class="post__tags">
<!--          <div class="tag" v-b-tooltip.hover title="Следующая рубрика">С</div>-->
        </div>
      </div>
      <div class="post__content">
        <div class="post__text">{{ post.text }}</div>
        <div class="post__images" v-if="post.media && post.media.length">
          <img class="post-image" v-for="media in post.media"
               :src="getMediaPreview(media)">
        </div>
      </div>
      <div class="post__footer">
        <div class="post-social"
             v-for="account in post.social_accounts"
             :style="{ backgroundImage: `url(${account.picture})` }"
             v-b-tooltip.hover :title="account.name"
        >
          <i v-if="account.social_type === 'vk'" class="fab fa-vk"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {DateTime} from 'luxon';

  export default {
    props: {
      post: {
        required: false,
        type: Object,
      }
    },
    data: () => ({}),
    methods: {
      getMediaPreview (media) {
        if (media.type === 'video') return media.preview;
        return media.src;
      },
      postTime (dt) {
        return DateTime.fromISO(dt).toFormat('HH:mm');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../variables';

  .post {
    position: relative;
    width: 200px;
    height: 200px;
    background-color: $color-bg-1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    margin-right: 20px;
    margin-bottom: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    &:hover {
      background-color: $color-bg-2;
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    }

    &._empty {
      .post__content {
        margin-bottom: 0;
      }
    }

    &._full {
      display: block;
      border: 1px solid $color-bg-3;
      background-color: $color-bg-3;
      font-weight: normal;

      &:hover {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      }
    }

    &._success {
      background-color: darken($color-success, 25%);
    }

    &._error {
      background-color: darken($color-danger, 25%);
    }

    &__header {
      display: flex;
      padding: 10px 10px 0 10px;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    &__time-small {
      display: flex;
      font-size: 14px;
      font-weight: bold;
      //color: lighten($color-primary, 50%);
      img {
        width: 20px;
        margin-right: 5px;
      }
      /*i {*/
      /*  margin-left: 5px;*/
      /*}*/

      &._done {
        color: $color-success;
      }
    }

    &__time-small-done {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: $color-success;
      margin-right: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: white;

      &._error {
        background-color: $color-danger;
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
      background: #E040FB;
      font-size: 12px;
      margin-right: 5px;

      &:last-child {
        margin-right: 0;
      }

      &.error {
        background-color: $color-danger;
      }

      &.success {
        background-color: $color-success;
      }
    }

    &__content {
      min-width: 200px;
      color: #F0F0F0;
      font-size: 14px;
      padding: 0 10px 0 10px;
      margin-bottom: 10px;
    }

    &__text {
      height: 60px;
      overflow: hidden;
    }

    &__icon {
      text-align: center;
      margin-bottom: 20px;
    }

    &__time {
      color: lighten($color-bg-0, 50%);
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
      margin: 8px 0 8px 0;
      height: 40px;
      overflow: hidden;
    }

    &__footer {
      display: flex;
      padding: 0 10px 0 10px;
      position: absolute;
      bottom: 10px;
    }

    .fa-trash {
      color: #FF5252
    }
  }

  .post-image {
    max-width: 45px;
    max-height: 45px;
    margin-right: 5px;
  }

  .post-social {
    width: 30px;
    height: 30px;
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