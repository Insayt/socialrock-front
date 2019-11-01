<template>
  <div class="calendar">
    <div class="calendar-header">
      <div class="calendar-header__dates">
        <b-button class="calendar-header__today" variant="black" size="sm">Сегодня</b-button>
        <b-button class="calendar-header__arrow" variant="black" size="sm">
          <i class="fas fa-chevron-left"></i>
        </b-button>
        <b-button class="calendar-header__arrow" variant="black" size="sm">
          <i class="fas fa-chevron-right"></i>
        </b-button>
        23 октября - 30 октября 2019
      </div>
      <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
        <template v-slot:button-content>
          mr.insayt@gmail.com <i class="fas fa-chevron-down"></i>
        </template>
        <b-dropdown-item href="#">
          <i class="fas fa-user"></i>
          Профиль
        </b-dropdown-item>
        <b-dropdown-item href="#">
          <i class="far fa-credit-card"></i>
          Оплата
        </b-dropdown-item>
        <b-dropdown-item href="#">
          <i class="fas fa-life-ring"></i>
          Помощь
        </b-dropdown-item>
        <b-dropdown-item href="#">
          <i class="fas fa-power-off"></i>
          Выход
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <div class="calendar-rows">
      <div class="calendar-rows__item">
        <div class="calendar-rows__day">
          <span>Понедельник,</span> 23 октября
        </div>
        <div class="calendar-rows__posts">
          <post :post="{ id: 1 }" @click="showPostModal"></post>
          <!--<post :post="{}" @click="showPostModal"></post>-->
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


    <b-modal ref="post-modal" size="lg" no-close-on-esc no-close-on-backdrop>
      <template v-slot:modal-header-close>
        <img src="../assets/img/icons/times.svg">
      </template>
      <template v-slot:modal-title>
        Создание поста
      </template>
      <div class="">
        <b-form-textarea
          v-model="newPost.text"
          placeholder="Напишите текст"
          rows="7"
          no-resize
          wrap
        ></b-form-textarea>
      </div>
      <template v-slot:modal-footer>
        <div class="w-100">
          <p class="float-left">Modal Footer Content</p>
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="show=false"
          >
            Close
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
  import Post from '@/components/Post';
  export default {
    components: {
      Post,
    },
    data: () => ({
      selected: [], // Must be an array reference!
      options: [
        { html: `<i class="fas fa-grip-horizontal"></i>`, value: 'orange' },
        { html: `<i class="fas fa-grip-vertical"></i>`, value: 'apple' },
      ],
      newPost: {
        text: ''
      }
    }),
    methods: {
      showPostModal () {
        this.$refs['post-modal'].show()
      }
    }
  }
</script>

<style lang="scss">
  .sidebar-mini .calendar-header {
    left: 60px;
  }

  .calendar {
    padding-top: 50px;
  }

  .calendar-header {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #1E1E1E;
    border-bottom: 1px solid transparent;
    font-weight: bold;
    position: fixed;
    top: 0;
    left: 260px;
    right: 0;
    z-index: 1;

    &__dates {
      display: flex;
      align-items: center;
    }

    &__today {
      margin-right: 20px;
    }

    &__arrow {
      margin-right: 10px;
      &:last-child {
        margin-right: 20px;
      }
    }
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
    }

    &__item {
      margin-bottom: 20px;
    }
  }
</style>