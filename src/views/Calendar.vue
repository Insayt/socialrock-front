<template>
  <div class="calendar">
    <div class="calendar-content">
      <div class="calendar-rows">
        <div class="calendar-rows__item">
          <div class="calendar-rows__day">
            <span>Понедельник,</span> 23 октября
          </div>
          <div class="calendar-rows__posts">
            <post :post="{ id: 1 }" @click="showPostModal"></post>
            <post :post="{}"></post>
            <post :post="{}"></post>
            <post :post="{ id: 1 }" @click="showPostModal"></post>
            <post :post="{}"></post>
          </div>
        </div>

        <div class="calendar-rows__item">
          <div class="calendar-rows__day">
            <span>Вторник,</span> 23 октября
          </div>
          <div class="calendar-rows__posts">
            <post :post="{}"></post>
            <post :post="{}"></post>
            <post :post="{}"></post>
            <post :post="{}"></post>
            <post :post="{}"></post>
          </div>
        </div>

        <div class="calendar-rows__item">
          <div class="calendar-rows__day">
            <span>Вторник,</span> 23 октября
          </div>
          <div class="calendar-rows__posts">
            <post :post="{}"></post>
            <post :post="{}"></post>
            <post :post="{}"></post>
            <post :post="{}"></post>
            <post :post="{}"></post>
          </div>
        </div>

        <div class="calendar-rows__item">
          <div class="calendar-rows__day">
            <span>Вторник,</span> 23 октября
          </div>
          <div class="calendar-rows__posts">
            <post :post="{}"></post>
            <post :post="{}"></post>
            <post :post="{}"></post>
            <post :post="{}"></post>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Post from '@/components/Post';
  export default {
    components: {
      Post,
    },
    data: () => ({
      newPost: {
        text: ''
      }
    }),
    methods: {
      showPostModal () {
        this.$bus.$emit('modal:post');
      }
    }
  }
</script>

<style lang="scss">
  @import '../variables';

  .calendar {
    display: flex;
  }

  .calendar-sidebar {
    width: 240px;
    background-color: #313033;
    padding-top: 20px;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
  }

  .calendar-rows {
    padding: 20px;

    &__day {
      margin-bottom: 20px;
      font-weight: bold;
      color: #F0F0F0;
      span {
        color: #A2A2A2;
      }
    }

    &__posts {
      display: flex;
      flex-wrap: wrap;
    }

    &__item {}
  }
</style>