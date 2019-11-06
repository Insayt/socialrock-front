<template>
  <div class="sidebar" :class="{ 'show-project-list': showProjectList }">
    <div class="projects-list">
      <div class="projects-list__pd">
        <b-button class="sidebar-button projects-list__pd" variant="warning" block @click="createProject()">
          <i class="fas fa-plus"></i>
          <span>Создать проект</span>
        </b-button>
      </div>
      <div class="projects-list__title projects-list__pd">
        Ваши проекты:
      </div>
      <div class="projects-list__item" v-for="p in projects" :class="{ _active: p.short_id === currentProject.short_id }">
        <div class="project__name-icon" :style="{ background: currentProject.color }">
          {{ p.name[0] }}
        </div>
        <div class="project__name">
          {{ p.name }}
        </div>
      </div>
    </div>
    <div class="sidebar__logo">
      <img src="../assets/img/logo.png">
      <div>SOCIAL<span>ROCK</span></div>
    </div>
    <div class="project" @click="showProjectList = !showProjectList">
      <div class="project__name-icon" :style="{ background: currentProject.color }">
        {{ currentProject.name[0] }}
      </div>
      <div class="project__name">
        {{ currentProject.name }}
      </div>
      <div class="project__icon">
        <i class="fas fa-chevron-down" v-show="!showProjectList"></i>
        <i class="fas fa-chevron-up" v-show="showProjectList"></i>
      </div>
    </div>
    <div class="sidebar-action">
      <b-button class="sidebar-button" variant="warning" block>
        <i class="fas fa-plus"></i>
        <span>Написать пост</span>
      </b-button>
    </div>
    <div class="nav">
      <router-link :to="{ name: 'calendar', params: { projectId: currentProject.short_id } }" tag="div" class="nav-item" active-class="_active">
        <div class="nav-item__icon">
          <i class="far fa-calendar-alt"></i>
        </div>
        <div class="nav-item__title">
          Автопостинг
        </div>
      </router-link>
      <router-link :to="{ name: 'editor', params: { projectId: currentProject.short_id } }" tag="div" class="nav-item" active-class="_active">
        <div class="nav-item__icon">
          <i class="fas fa-paint-brush"></i>
        </div>
        <div class="nav-item__title">
          Редактор
        </div>
      </router-link>
      <router-link :to="{ name: 'analytics', params: { projectId: currentProject.short_id } }" tag="div" class="nav-item" active-class="_active">
        <div class="nav-item__icon">
          <i class="fas fa-chart-bar"></i>
        </div>
        <div class="nav-item__title">
          Аналитика
        </div>
      </router-link>
      <router-link :to="{ name: 'settings', params: { projectId: currentProject.short_id } }" tag="div" class="nav-item" active-class="_active">
        <div class="nav-item__icon">
          <i class="fas fa-cog"></i>
        </div>
        <div class="nav-item__title">
          Настройки
        </div>
      </router-link>
    </div>
    <div class="sidebar-bottom" v-if="!user.email_verify">
      <div class="sidebar-bottom__emoji">
        💡
      </div>
      <div class="sidebar-bottom__text">
        Подтвердите свой email!
      </div>
      <div class="sidebar-bottom__btn">
        Мы отправили вам письмо с ссылкой для подтверждения. Если вы не получили его, проверьте спам или запросите еще одно
      </div>
      <b-button  variant="danger" block>Запросить письмо</b-button>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      showProjectList: false
    }),
    computed: {
      currentProject () {
        return this.$store.getters['user/currentProject'];
      },
      user () {
        return this.$store.getters['user/user'];
      },
      projects () {
        return this.$store.getters['user/projects'];
      },
    },
    methods: {
      createProject () {
        this.$router.push({ name: 'projects' });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../variables.scss";

  .sidebar-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
    text-align: center;
    border: 1px solid rgba($color-danger, 0.8);
    background-color: #6A3430;

    &__emoji {
      font-size: 70px;
      position: relative;
      top: 5px;
      /*animation-name: pulse;*/
      animation-duration: 1s;
      animation-iteration-count: infinite;
    }
    &__text {
      font-size: 17px;
      margin-bottom: 15px;
    }
    &__btn {
      font-size: 13px;
      margin-bottom: 15px;
      color: lightgray;
    }
  }

  .sidebar {
    width: 240px;
    left: 0;
    top: 0;
    bottom: 0;
    position: fixed;
    background-color: $color-bg-2;
    z-index: 2;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

    &__logo {
      padding-left: 20px;
      padding-right: 20px;
      padding-bottom: 10px;
      padding-top: 10px;
      font-weight: bold;
      font-size: 26px;
      display: flex;
      align-items: center;
      color: white;

      img {
        width: 25px;
        margin-right: 10px;
      }
      span {
        color: $color-warning;
      }
    }

    &.show-project-list .projects-list {
      top: 120px;
      visibility: visible;
      opacity: 1;
    }
  }

  .projects-list {
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $color-bg-2;
    z-index: 2;
    padding-top: 10px;
    visibility: hidden;
    opacity: 0;
    overflow-y: auto;
    transition: all 0.2s ease-in-out;
    font-weight: bold;

    &__title {
      margin-top: 20px;
      margin-bottom: 20px;
    }

    &__item {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 0 20px;
      height: 50px;

      &._active {
        background-color: $color-bg-7;
      }
    }

    .projects-list__pd {
      padding-left: 20px;
      padding-right: 20px;
    }

    .project__name-icon {
      width: 30px;
      height: 30px;
      line-height: 30px;
      font-size: 24px;
    }
  }

  .sidebar-collapse {
    position: absolute;
    top: 50%;
    right: 20px;
    font-size: 26px;
    color: #272729;
    cursor: pointer;
    transition: all 0.4s;
  }

  .project {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    font-size: 16px;
    font-weight: bold;
    position: relative;
    user-select: none;

    &__name-icon {
      width: 40px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 32px;
      font-weight: bold;
      border-radius: 5px;
      margin-right: 15px;
    }

    &__icon {
      position: absolute;
      right: 20px;
      top: 18px;
    }
  }

  .sidebar-action {
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .sidebar-button {
    font-weight: bold;
  }

  .nav {
    margin-top: 20px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    font-weight: bold;
    padding-left: 20px;
    padding-right: 20px;
    cursor: pointer;
    margin-bottom: 10px;

    &__icon {
      margin-right: 15px;
    }

    &._active {
      background-color: $color-bg-7;
    }
  }
</style>