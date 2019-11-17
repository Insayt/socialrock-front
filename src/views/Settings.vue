<template>
  <div class="page settings">
    <div class="settings-item" @click="$bus.$emit('modal:list-accounts')">
      <div class="settings-item__left" style="background-color: #C62828">
        <i class="fas fa-file-alt"></i>
      </div>
      <div class="settings-item__right">
        <div class="settings-item__title">
          <span>Страницы</span>
          <span class="settings-item__count" v-if="currentProject.social_accounts.length">
            {{ currentProject.social_accounts.length }}
          </span>
        </div>
        <div class="settings-item__subtitle">
          Добавляйте и удаляйте страницы в социальных сетях
        </div>
      </div>
    </div>
    <div class="settings-item">
      <div class="settings-item__left" style="background-color: #AD1457">
        <i class="fas fa-tags"></i>
      </div>
      <div class="settings-item__right">
        <div class="settings-item__title">
          Рубрики
        </div>
        <div class="settings-item__subtitle">
          Используйте рубрики для разделения контента по темам
        </div>
      </div>
    </div>
    <div class="settings-item">
      <div class="settings-item__left" style="background-color: #6A1B9A">
        <i class="fas fa-link"></i>
      </div>
      <div class="settings-item__right">
        <div class="settings-item__title">
          Ссылки
        </div>
        <div class="settings-item__subtitle">
          Сокращение ссылок и UTM-метки
        </div>
      </div>
    </div>
    <div class="settings-item">
      <div class="settings-item__left" style="background-color: #4527A0">
        <i class="fas fa-users-cog"></i>
      </div>
      <div class="settings-item__right">
        <div class="settings-item__title">
          Пользователи
        </div>
        <div class="settings-item__subtitle">
          Добавляйте к проекту коллег и клиентов
        </div>
      </div>
    </div>
    <div class="settings-item">
      <div class="settings-item__left" style="background-color: #283593">
        <i class="far fa-clock"></i>
      </div>
      <div class="settings-item__right">
        <div class="settings-item__title">
          Часовой пояс проекта
        </div>
        <div class="settings-item__subtitle">
          В каком часовом поясе будет вестись работа в проекте
        </div>
      </div>
    </div>
    <div class="settings-item">
      <div class="settings-item__left" style="background-color: #1565C0">
        <i class="fas fa-envelope-open-text"></i>
      </div>
      <div class="settings-item__right">
        <div class="settings-item__title">
          Отчеты
        </div>
        <div class="settings-item__subtitle">
          Настроить получение отчетов по проекту на почту
        </div>
      </div>
    </div>
    <div class="settings-item">
      <div class="settings-item__left" style="background-color: #2E7D32">
        <i class="fas fa-cogs"></i>
      </div>
      <div class="settings-item__right">
        <div class="settings-item__title">
          Кастомизация
        </div>
        <div class="settings-item__subtitle">
          Название проекта и цвет иконки
        </div>
      </div>
    </div>
    <div class="settings-item">
      <div class="settings-item__left" style="background-color: #EF6C00">
        <i class="fas fa-rss"></i>
      </div>
      <div class="settings-item__right">
        <div class="settings-item__title">
          Кроспостинг
        </div>
        <div class="settings-item__subtitle">
          Настройте публикацию из RSS
        </div>
      </div>
    </div>
    <modal-add-account></modal-add-account>
    <modal-select-account></modal-select-account>
    <modal-accounts-list></modal-accounts-list>
  </div>
</template>

<script>
  import ModalAddAccount from '@/components/modals/AddAccount';
  import ModalSelectAccount from '@/components/modals/SelectAccount';
  import ModalAccountsList from '@/components/modals/AccountsList';
  export default {
    components: {
      ModalAddAccount,
      ModalSelectAccount,
      ModalAccountsList
    },
    data: () => ({
      errors: {},
    }),
    computed: {
      currentProject () {
        return this.$store.getters['user/currentProject'];
      },
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  @import "../variables";

  .settings {
    max-width: 600px;
    margin: 0 auto;
  }

  .settings-item {
    display: flex;
    align-items: center;
    padding: 20px;
    margin-bottom: 20px;
    background-color: $color-bg-1;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    cursor: pointer;

    &:hover {
      background-color: $color-bg-2;
    }

    &__left {
      font-size: 24px;
      margin-right: 20px;
      background-color: $color-bg-9;
      padding: 20px;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__right {
      width: 100%;
    }

    &__title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__subtitle {
      font-size: 16px;
      color: $color-font-gray;
    }

    &__count {
      width: 25px;
      height: 25px;
      background-color: $color-warning;
      color: $color-bg-0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-size: 14px;
      /*font-weight: normal;*/
    }
  }
</style>