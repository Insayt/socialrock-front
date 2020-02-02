<template>
  <div>
    <div class="access-denied" v-if="!currentProject.access.analytics">
      <img src="../assets/img/access_denied.svg">
      <div class="access-denied__header">
        Oops.. 🤭
      </div>
      У вас нет доступа к этому разделу.
      <br> Обратитесь к администратору проекта,
      <br> если вам очень нужно сюда попасть :)
    </div>
    <div class="page" v-else>
      <div class="analytics-date">
        <b-button class="calendar-header__today" variant="primary">1 месяц</b-button>
        <b-button class="calendar-header__today" variant="black">3 месяца</b-button>
        <b-button class="calendar-header__today" variant="black">Год</b-button>
        <!--<span >Октябрь 2019</span>-->
        <b-dropdown class="dropdown-calendar" variant="black" toggle-class="text-decoration-none" no-caret>
          <template v-slot:button-content>
            Выбрать период <i class="fas fa-calendar-alt ml-1"></i>
          </template>
          <b-dropdown-text>
            <v-date-picker
              mode="range"
              :value="null"
              color="orange"
              is-dark
              is-inline
              is-expanded
            />
            <b-button class="calendar-header__arrow" variant="black" size="sm" block>
              Обновить
            </b-button>
          </b-dropdown-text>
        </b-dropdown>
      </div>
      <div class="post-modal__networks">
        <div class="network _active" style="background-image: url('/test1.jpg')">
          <div class="network__bg">
            <div class="network__check">
              <i class="fas fa-check"></i>
            </div>
          </div>
          <div class="network__icon" style="background-color: #4680C2">
            <i class="fab fa-vk"></i>
          </div>
        </div>
        <div class="network" style="background-image: url('/test1.jpg')">
          <div class="network__icon" style="background-color: #4680C2">
            <i class="fab fa-vk"></i>
          </div>
        </div>
        <div class="network-add" v-b-tooltip.hover.right title="Подключить страницу">
          <i class="fas fa-plus"></i>
        </div>
      </div>
      <div class="analytics-cards">
        <div class="box analytics-cards__item">
          <div class="analytics-cards__item-count">10</div>
          Постов
        </div>
        <div class="box analytics-cards__item">
          <div class="analytics-cards__item-count">25</div>
          Сторис
        </div>
      </div>
      <div class="box">
        <div class="box-title">
          Динамика числа подписчиков
        </div>
        <p class="analytics-desc">
          Отслеживайте как меняется колличество подписчиков ваших страниц со временем
        </p>
        <subscribers></subscribers>
      </div>
      <div class="box">
        <div class="box-title">
          Охват
        </div>
        <p class="analytics-desc">
          Общий охват, охват подписчиков, просмотры сторис
        </p>
        <coverage></coverage>
      </div>
      <div class="box">
        <div class="box-title">
          Активность
        </div>
        <p class="analytics-desc">
          Переходы по ссылкам, репосты, лайки, комментарии, сохранения (для Instagram), нажатия кнопок (для Telegram) по дням
        </p>
        <activities></activities>
      </div>
      <div class="box">
        <div class="box-title">
          Конверсии в Google Analytics и Яндекс метрике
        </div>
        <p class="analytics-desc">
          Какие посты больше всего понравились вашей аудитории
        </p>
        <activities></activities>
      </div>
      <div class="box">
        <div class="box-title">
          Лучшие публикации
        </div>
        <p class="analytics-desc">
          Какие посты больше всего понравились вашей аудитории
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import Subscribers from '../components/charts/Subscribers';
  import Coverage from '../components/charts/Coverage';
  import Activities from '../components/charts/Activities';
  export default {
    components: {
      Subscribers,
      Coverage,
      Activities
    },
    data: () => ({}),
    computed: {
      currentProject () {
        return this.$store.getters['user/currentProject'];
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../variables";
  .analytics-date {
    margin-bottom: 20px;

    .btn {
      margin-right: 10px;
    }
    span {
      margin-right: 10px;
    }
  }

  .analytics-cards {
    display: flex;

    &__item {
      width: 100%;
      text-align: center;
      color: $color-font-gray;
    }

    &__item-count {
      font-size: 40px;
      font-weight: bold;
      color: $color-font;
    }
  }
  .analytics-desc {
    color: $color-font-gray;
  }
</style>