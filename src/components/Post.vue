<template>
  <div>
    <div class="post _empty">
      <div class="post__content">
        <div class="post__icon">
          <img src="../assets/img/icons/plus-round.svg">
        </div>
        <div class="post__time">
          <img src="../assets/img/icons/clock.svg"> 09:00
        </div>
        <!--<div class="post__title">-->
        <!--Запланировать пост-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  .post {
    width: 200px;
    height: 200px;
    border: 1px dashed #A2A2A2;
    color: #A2A2A2;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    margin-right: 20px;

    &:hover {
      background-color: rgba(#A2A2A2, 0.1);
    }

    &__content {
      min-width: 200px;
    }

    &__icon {
      text-align: center;
      margin-bottom: 20px;
    }

    &__time {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        margin-right: 5px;
      }
    }

    &__title {
      text-align: center;
    }
  }
</style>