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
      <b-form-radio-group
        id="btn-radios-1"
        v-model="selected"
        :options="options"
        buttons
        button-variant="black"
        size="sm"
      ></b-form-radio-group>
    </div>
    <div class="calendar-rows">
      <div class="calendar-rows__item">
        <div class="calendar-rows__day">
          <span>Понедельник,</span> 23 октября
        </div>
        <div class="calendar-rows__posts">
          <post></post>
          <post></post>
          <post></post>
          <post></post>
        </div>
      </div>

      <div class="calendar-rows__item">
        <div class="calendar-rows__day">
          <span>Вторник,</span> 23 октября
        </div>
        <div class="calendar-rows__posts">
          <post></post>
          <post></post>
          <post></post>
          <post></post>
        </div>
      </div>

      <div class="calendar-rows__item">
        <div class="calendar-rows__day">
          <span>Вторник,</span> 23 октября
        </div>
        <div class="calendar-rows__posts">
          <post></post>
          <post></post>
          <post></post>
          <post></post>
        </div>
      </div>

      <div class="calendar-rows__item">
        <div class="calendar-rows__day">
          <span>Вторник,</span> 23 октября
        </div>
        <div class="calendar-rows__posts">
          <post></post>
          <post></post>
          <post></post>
          <post></post>
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
      selected: [], // Must be an array reference!
      options: [
        { html: `<i class="fas fa-grip-horizontal"></i>`, value: 'orange' },
        { html: `<i class="fas fa-grip-vertical"></i>`, value: 'apple' },
      ]
    }),
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
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #1E1E1E;
    font-weight: bold;
    position: fixed;
    top: 0;
    left: 250px;
    right: 0;

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