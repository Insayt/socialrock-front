<template>
  <div class="sidebar">
    <div class="sidebar__logo">
      <img src="../assets/img/logo.png">
      <div>SOCIAL<span>ROCK</span></div>
    </div>
    <div class="project">
      <div class="project__name-icon" :style="{ background: '#5C6BC0' }">
        М
      </div>
      <div class="project__name">
        Мой проект
      </div>
      <div class="project__icon">
        <i class="fas fa-chevron-down"></i>
      </div>
    </div>
    <div class="sidebar-action">
      <b-button class="sidebar-button" variant="warning" block>
        <i class="fas fa-plus"></i>
        <span>Написать пост</span>
      </b-button>
    </div>
    <div class="nav">
      <router-link to="/calendar" tag="div" class="nav-item" active-class="_active">
        <div class="nav-item__icon">
          <i class="far fa-calendar-alt"></i>
        </div>
        <div class="nav-item__title">
          Автопостинг
        </div>
      </router-link>
      <router-link to="/analytics" tag="div" class="nav-item" active-class="_active">
        <div class="nav-item__icon">
          <i class="fas fa-chart-bar"></i>
        </div>
        <div class="nav-item__title">
          Аналитика
        </div>
      </router-link>
      <router-link to="/editor" tag="div" class="nav-item" active-class="_active">
        <div class="nav-item__icon">
          <i class="fas fa-paint-brush"></i>
        </div>
        <div class="nav-item__title">
          Редактор
        </div>
      </router-link>
      <router-link to="/settings" tag="div" class="nav-item" active-class="_active">
        <div class="nav-item__icon">
          <i class="fas fa-cog"></i>
        </div>
        <div class="nav-item__title">
          Настройки
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  @import "../variables.scss";

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

  .sidebar-bottom {
    position: absolute;
    bottom: 0;
  }
</style>