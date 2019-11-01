<template>
  <div class="sidebar">
    <div class="sidebar__logo">
      <img src="../assets/img/logo.png">
      <div>SOCIAL<span>ROCK</span></div>
    </div>
    <div class="sidebar-collapse" @click="$emit('toggle')">
      <i class="fas fa-chevron-left"></i>
    </div>
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
    <!--<div class="sidebar-action">-->
      <!--<b-button class="sidebar-button" variant="warning" block>-->
        <!--<i class="fas fa-plus"></i>-->
        <!--<span>Написать пост</span>-->
      <!--</b-button>-->
    <!--</div>-->
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
      <div class="sidebar-bottom">
        <div class="nav">
          <div class="nav-item">
            <div class="nav-item__icon">
              <i class="fas fa-user"></i>
            </div>
            <div class="nav-item__title">
              Профиль
            </div>
          </div>
          <div class="nav-item">
            <div class="nav-item__icon">
              <i class="far fa-credit-card"></i>
            </div>
            <div class="nav-item__title">
              Оплата
            </div>
          </div>
          <div class="nav-item">
            <div class="nav-item__icon">
              <i class="fas fa-life-ring"></i>
            </div>
            <div class="nav-item__title">
              Помощь
            </div>
          </div>
          <div class="nav-item">
            <div class="nav-item__icon">
              <i class="fas fa-power-off"></i>
            </div>
            <div class="nav-item__title">
              Выход
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss">
  .sidebar-mini {
    color: inherit !important;
    .sidebar{
      width: 60px;

      &__logo {
        padding: 0;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        div { display: none }
        img {
          margin-right: 0;
        }
      }

      .project {
        padding: 10px;
      }

      .project__name-icon {
        margin-right: 0;
      }

      .project__name, .project__icon {
        display: none;
      }
    }

    .sidebar-action {
      padding-left: 10px;
      padding-right: 10px;
    }

    .sidebar-button {
      span { display: none }
    }

    .btn-warning {
      height: 40px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;

      .fas {
        margin-right: 0 !important;
      }
    }
    .nav {
      margin-top: 0;
    }

    .nav-item {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
    }

    .nav-item__icon {
      margin-right: 0;
    }
    .nav-item__title {
      display: none;
    }
    .sidebar-collapse {
      transform: rotate(180deg);
    }
  }

  .sidebar {
    width: 250px;
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
      text-shadow: 2px 2px 0px black;
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