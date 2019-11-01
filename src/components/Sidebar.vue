<template>
  <div class="sidebar">
    <div class="sidebar__logo">
      <img src="../assets/img/logo.png">
      <div>SOCIAL<span>ROCK</span></div>
    </div>
    <!--<div class="sidebar-collapse" @click="$emit('toggle')">-->
      <!--<i class="fas fa-chevron-left"></i>-->
    <!--</div>-->
    <div class="project">
      <div class="project__name-icon" :style="{ background: 'linear-gradient(to left, #3494e6, #ec6ead)' }">
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
      <div class="nav-item _active">
        <div class="nav-item__icon">
          <i class="far fa-calendar-alt"></i>
        </div>
        <div class="nav-item__title">
          Автопостинг
        </div>
      </div>
      <div class="nav-item">
        <div class="nav-item__icon">
          <i class="fas fa-chart-bar"></i>
        </div>
        <div class="nav-item__title">
          Аналитика
        </div>
      </div>
      <div class="nav-item">
        <div class="nav-item__icon">
          <i class="fas fa-paint-brush"></i>
        </div>
        <div class="nav-item__title">
          Редактор
        </div>
      </div>
      <!--<div class="nav-item">-->
        <!--<div class="nav-item__icon">-->
          <!--<i class="fas fa-wrench"></i>-->
        <!--</div>-->
        <!--<div class="nav-item__title">-->
          <!--Инструменты-->
        <!--</div>-->
      <!--</div>-->
      <div class="nav-item">
        <div class="nav-item__icon">
          <i class="fas fa-cog"></i>
        </div>
        <div class="nav-item__title">
          Настройки
        </div>
      </div>
      <!--<div class="sidebar-bottom">-->
        <!--<v-date-picker-->
          <!--mode="range"-->
          <!--:value="null"-->
          <!--color="orange"-->
          <!--is-dark-->
          <!--is-inline-->
          <!--is-expanded-->
        <!--/>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss">
  .sidebar {
    width: 260px;
    left: 0;
    top: 0;
    bottom: 0;
    position: fixed;
    background-color: #313033;
    /*transition: width 0.4s;*/

    &__logo {
      padding-left: 20px;
      padding-right: 20px;
      padding-bottom: 10px;
      padding-top: 10px;
      font-weight: bold;
      font-size: 26px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #1E1E1E;

      img {
        width: 25px;
        margin-right: 10px;
      }
      span {
        color: #ffc107;
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
    padding-top: 20px;
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
      top: 28px;
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
      background-color: #272729;
    }
  }

  .sidebar-bottom {
    position: absolute;
    bottom: 0;
  }
</style>