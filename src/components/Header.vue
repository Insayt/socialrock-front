<template>
  <div class="calendar-header">
    <div class="calendar-header__dates">
      <template v-if="currentRoute === 'calendar'">
        <b-button class="calendar-header__today" variant="black" size="sm" @click="today">Сегодня</b-button>
        <b-button class="calendar-header__arrow"
                  variant="black"
                  size="sm"
                  v-b-tooltip.hover
                  title="Предыдущая неделя"
                  @click="prevWeek"
        >
          <i class="fas fa-chevron-left"></i>
        </b-button>
        <b-button class="calendar-header__arrow"
                  variant="black"
                  size="sm"
                  @click="nextWeek"
                  v-b-tooltip.hover
                  title="Следующая неделя"
        >
          <i class="fas fa-chevron-right"></i>
        </b-button>
        <span class="calendar-header__current" v-if="startDt">{{ formatedStartDate }} - {{ formatedEndDate }}</span>
        <!--<b-dropdown class="dropdown-calendar" size="sm" variant="black" toggle-class="text-decoration-none" no-caret>-->
          <!--<template v-slot:button-content>-->
            <!--Выбрать период <i class="fas fa-calendar-alt ml-1"></i>-->
          <!--</template>-->
          <!--<b-dropdown-text>-->
            <!--<v-date-picker-->
              <!--mode="range"-->
              <!--:value="null"-->
              <!--color="orange"-->
              <!--is-dark-->
              <!--is-inline-->
              <!--is-expanded-->
            <!--/>-->
            <!--<b-button class="calendar-header__arrow" variant="black" size="sm" block>-->
              <!--Обновить-->
            <!--</b-button>-->
          <!--</b-dropdown-text>-->
        <!--</b-dropdown>-->
      </template>
      <template v-if="currentRoute === 'analytics'">
        <div class="calendar-header__title">Аналитика</div>
      </template>
      <template v-if="currentRoute === 'editor'">
        <div class="calendar-header__title">Редактор</div>
      </template>
      <template v-if="currentRoute === 'settings'">
        <div class="calendar-header__title">Настройки проекта — {{ currentProject.name }}</div>
      </template>
      <template v-if="currentRoute === 'projects'">
        <div class="calendar-header__title">Управление проектами</div>
      </template>
    </div>
    <b-dropdown size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
      <template v-slot:button-content>
        {{ user.email }} <i class="fas fa-chevron-down"></i>
      </template>
      <b-dropdown-item href="#">
        <i class="fas fa-bell"></i>
        Уведомления
        <b-badge class="ml-2" variant="warning">4</b-badge>
      </b-dropdown-item>
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
      <b-dropdown-item href="#" @click.prevent="logout()">
        <i class="fas fa-power-off"></i>
        Выход
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
  import { DateTime } from "luxon";

  export default {
    props: {
      currentRoute: {
        type: String,
        required: true,
      }
    },
    data: () => ({
      startDt: null,
      endDt: null,
    }),
    computed: {
      currentProject () {
        return this.$store.getters['user/currentProject'];
      },
      user () {
        return this.$store.getters['user/user'];
      },
      formatedStartDate () {
        return this.startDt.toLocaleString({ month: 'long', day: 'numeric' });
      },
      formatedEndDate () {
        return this.endDt.toLocaleString(DateTime.DATE_FULL);
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('user/logout')
          .then(() => {
            this.$router.push({ name: 'auth' });
          })
      },
      prevWeek () {
        this.startDt = this.startDt.minus({ weeks: 1 });
        this.endDt = this.endDt.minus({ weeks: 1 });
        this.$bus.$emit('calendar:reload', {
          startDt: this.startDt,
          endDt: this.endDt,
        });
      },
      nextWeek () {
        this.startDt = this.startDt.plus({ weeks: 1 });
        this.endDt = this.endDt.plus({ weeks: 1 });
        this.$bus.$emit('calendar:reload', {
          startDt: this.startDt,
          endDt: this.endDt,
        });
      },
      today () {
        this.startDt = DateTime.local().set({hours: 0, minutes: 0, seconds: 0, milliseconds: 0});
        this.endDt = DateTime.local().set({hours: 0, minutes: 0, seconds: 0, milliseconds: 0}).plus({ weeks: 1 }).minus({ days: 1 });
        this.$bus.$emit('calendar:reload', {
          startDt: this.startDt,
          endDt: this.endDt,
        });
      },
    },
    mounted () {
      this.startDt = DateTime.local().set({hours: 0, minutes: 0, seconds: 0, milliseconds: 0});
      this.endDt = DateTime.local().set({hours: 0, minutes: 0, seconds: 0, milliseconds: 0}).plus({ weeks: 1 }).minus({ days: 1 });
    }
  }
</script>

<style lang="scss" scoped>
  @import "../variables";
  .calendar-header {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid transparent;
    font-weight: bold;
    position: fixed;
    top: 0;
    right: 0;
    left: 240px;
    z-index: 1;
    background-color: $color-bg-1;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

    &__title {
      font-size: 20px;
    }

    &__current {
      margin-right: 10px;
    }

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
</style>