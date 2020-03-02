<template>
  <div>
    <div class="access-denied" v-if="!currentProject.access.editor">
      <img src="../assets/img/access_denied.svg">
      <div class="access-denied__header">
        Oops.. 🤭
      </div>
      У вас нет доступа к этому разделу.
      <br> Обратитесь к администратору проекта,
      <br> если вам очень нужно сюда попасть :)
    </div>
    <div v-else class="editor">
      <div class="editor__title">
        🤘 Ваши дизайны
      </div>
      <div class="editor__empty">
        Вы еще не создали ни одного дизайна. Выберите один из вариантов ниже и начинайте работу 💪
      </div>
      <div class="editor__title">
        👷 Создайте дизайн с нуля
      </div>
      <div class="editor__items">
        <div class="editor-item" @click="$router.push({ name: 'editor-create', query: { from: 'square' } })">
          <div class="editor-item__img">
            <div class="editor-item__type _square"></div>
          </div>
          <div class="editor-item__title">
            Квадратный
          </div>
        </div>
        <div class="editor-item" @click="$router.push({ name: 'editor-create', query: { from: 'horizontal' } })">
          <div class="editor-item__img">
            <div class="editor-item__type _horizonral"></div>
          </div>
          <div class="editor-item__title">
            Горизонтальный
          </div>
        </div>
        <div class="editor-item" @click="$router.push({ name: 'editor-create', query: { from: 'vertical' } })">
          <div class="editor-item__img">
            <div class="editor-item__type _vertical"></div>
          </div>
          <div class="editor-item__title">
            Вертикальный
          </div>
        </div>
        <div class="editor-item" @click="$router.push({ name: 'editor-create', query: { from: 'stories' } })">
          <div class="editor-item__img">
            <div class="editor-item__type _stories"></div>
          </div>
          <div class="editor-item__title">
            Stories
          </div>
        </div>
      </div>
      <div class="editor__title">
        🔥 Или выберите из готовых шаблонов
      </div>
      <div class="editor__items">
        <div class="editor-item">
          <div class="editor-item__img"></div>
          <div class="editor-item__title">
            Квадратный
          </div>
        </div>
        <div class="editor-item">
          <div class="editor-item__img"></div>
          <div class="editor-item__title">
            Горизонтальный
          </div>
        </div>
        <div class="editor-item">
          <div class="editor-item__img"></div>
          <div class="editor-item__title">
            Stories
          </div>
        </div>
        <div class="editor-item">
          <div class="editor-item__img"></div>
          <div class="editor-item__title">
            Stories
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      currentProject () {
        return this.$store.getters['user/currentProject'];
      },
    },
  }
</script>

<style scoped lang="scss">
  @import '../variables';
  .editor {
    padding: 20px;

    &__title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 15px;
    }

    &__empty {
      padding: 20px;
      border-radius: 10px;
      background-color: $color-bg-3;
      color: $color-font-gray;
      margin-bottom: 20px;
    }
    &__items {
      display: flex;
      margin-bottom: 15px;
    }
  }
  .editor-item {
    margin-right: 15px;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;

    &:hover {
      .editor-item__img {
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
      }
    }

    &__img {
      width: 250px;
      height: 250px;
      background-color: $color-bg-4;
      margin-bottom: 10px;
      transition: all 0.2s;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__title {
      font-weight: normal;
      font-size: 16px;
    }

    &__type {
      background-color: white;

      &._square {
        width: 150px;
        height: 150px;
      }
      &._horizonral {
        width: 200px;
        height: 100px;
      }
      &._vertical {
        width: 100px;
        height: 150px;
      }
      &._stories {
        width: 100px;
        height: 200px;
      }
    }
  }
</style>