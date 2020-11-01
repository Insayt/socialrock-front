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
      <div class="editor__empty" v-if="!currentProject.designs.length">
        Вы еще не создали ни одного дизайна. Выберите один из вариантов ниже и начинайте работу 💪
      </div>
      <div class="editor__items" v-if="currentProject.designs.length">
        <div class="editor-item"
             v-for="d in currentProject.designs"
             @click="redirectToEditor(d._id)"
        >
          <div class="editor-item__img">
            <div class="editor-item__type"
                 :class="{
                  _square: d.format === 'square',
                  _horizontal: d.format === 'horizontal',
                  _vertical: d.format === 'vertical',
                  _stories: d.format === 'stories',
                 }"
                 :style="{ backgroundImage: `url(${d.image_url})` }"
            ></div>
          </div>
          <div class="editor-item__delete"
               @click.stop="deleteDesign(d._id)"
               v-b-tooltip.hover title="Удалить дизайн"
          >
            <i class="fa fa-trash"></i>
          </div>
        </div>
      </div>
      <div class="editor__title">
        👷 Создайте дизайн с нуля
      </div>
      <div class="editor__items">
        <div class="editor-item" @click="createDesign('square')">
          <div class="editor-item__img">
            <div class="editor-item__type _square"></div>
          </div>
          <div class="editor-item__title">
            Квадратный
          </div>
        </div>
        <div class="editor-item" @click="createDesign('horizontal')">
          <div class="editor-item__img">
            <div class="editor-item__type _horizontal"></div>
          </div>
          <div class="editor-item__title">
            Горизонтальный
          </div>
        </div>
        <div class="editor-item" @click="createDesign('vertical')">
          <div class="editor-item__img">
            <div class="editor-item__type _vertical"></div>
          </div>
          <div class="editor-item__title">
            Вертикальный
          </div>
        </div>
        <div class="editor-item" @click="createDesign('stories')">
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
      <div class="editor__tabs">
        <div class="tabs">
          <div class="">
            <ul role="tablist" class="nav nav-tabs">
              <li role="presentation" class="nav-item">
                <a href="#" class="nav-link" :class="{ active: designType === 'square' }" @click.prevent="designType = 'square'">Квадратный</a>
              </li>
              <li>
                <a href="#" class="nav-link" :class="{ active: designType === 'horizontal' }" @click.prevent="designType = 'horizontal'">Горизонтальный</a>
              </li>
              <li>
                <a href="#" class="nav-link" :class="{ active: designType === 'vertical' }" @click.prevent="designType = 'vertical'">Вертикальный</a>
              </li>
              <li>
                <a href="#" class="nav-link" :class="{ active: designType === 'stories' }" @click.prevent="designType = 'stories'">Stories</a>
              </li>
            </ul>
          </div>
        </div>
<!--        <b-tabs>-->
<!--          <b-tab title="Квадратный" :active="designType === 'square'"></b-tab>-->
<!--          <b-tab title="Горизонтальный"></b-tab>-->
<!--          <b-tab title="Вертикальный"></b-tab>-->
<!--          <b-tab title="Stories"></b-tab>-->
<!--        </b-tabs>-->
      </div>
      <div class="editor__items">
        <div class="editor-item"
             v-for="d in showDesigns"
             @click="createDesignFromTemplate(d)"
        >
          <div class="editor-item__img">
            <div class="editor-item__type"
                 :class="{
                  _square: d.format === 'square',
                  _horizontal: d.format === 'horizontal',
                  _vertical: d.format === 'vertical',
                  _stories: d.format === 'stories',
                 }"
                 :style="{ backgroundImage: `url(${d.image_url})` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      designs: require('../designs.json'),
      designType: 'square'
    }),
    computed: {
      currentProject() {
        return this.$store.getters['user/currentProject'];
      },
      showDesigns() {
        return this.designs[this.designType];
      }
    },
    methods: {
      redirectToEditor(id) {
        this.$router.push({name: 'editor-create', params: {id: id}});
      },
      createDesign(type) {
        this.$bus.$emit('fixedloader:start');
        this.$store.dispatch('user/createDesign', {
          project_id: this.currentProject._id,
          format: type
        })
          .then(res => {
            this.$router.push({name: 'editor-create', params: {id: res.design._id}});
          })
          .finally(() => {
            this.$bus.$emit('fixedloader:stop');
          })
      },
      createDesignFromTemplate(design) {
        this.$bus.$emit('fixedloader:start');
        this.$store.dispatch('user/createDesign', {
          project_id: this.currentProject._id,
          format: this.designType,
          object: design.object,
          image_url: design.image_url
        })
          .then(res => {
            this.$router.push({name: 'editor-create', params: {id: res.design._id}});
          })
          .finally(() => {
            this.$bus.$emit('fixedloader:stop');
          })
      },
      deleteDesign(id) {
        this.$swal({
          title: `Удалить дизайн?`,
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Удалить',
          cancelButtonText: 'Отмена',
        }).then(res => {
          if (res.value) {
            this.$store.dispatch('user/deleteDesign', {
              design_id: id
            }).then(() => {
              this.$swal({
                title: `Дизайн удален`,
                type: 'success',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000
              });
            }).catch(() => {
              this.$swal({
                title: `Ошибка удаления`,
                type: 'error',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000
              });
            })
          }
        })
      }
    }
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
      flex-wrap: wrap;
      margin-bottom: 15px;
    }

    &__tabs {
      margin-bottom: 20px;

      .tabs .nav-tabs {
        padding-left: 0;
      }
    }
  }

  .editor-item {
    margin-right: 15px;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
    position: relative;

    &:hover {
      .editor-item__img {
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
      }

      .editor-item__delete {
        display: block;
      }
    }

    &__delete {
      display: none;
      position: absolute;
      right: 0;
      top: 0;
      color: $color-danger;
      padding: 10px;
      background-color: $color-bg-0;
      font-size: 14px;
      border-radius: 0 0 0 5px;
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
      background-size: cover;
      background-position: center;

      &._square {
        width: 250px;
        height: 250px;
      }

      &._horizontal {
        width: 250px;
        height: 140px;
      }

      &._vertical {
        width: 140px;
        height: 200px;
      }

      &._stories {
        width: 130px;
        height: 250px;
      }
    }
  }
</style>