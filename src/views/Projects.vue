<template>
  <div class="page">
    <div class="row">
      <div class="col-6">
        <div class="box">
          <div class="box-title">
            Создание проекта
          </div>
          <b-form @submit.prevent="createProject">
            <b-form-group>
              <b-input placeholder="Введите название"
                       :class="{ 'is-invalid': errors.name }"
                       v-model="name"></b-input>
              <div class="invalid-feedback">
                {{ errors.name }}
              </div>
            </b-form-group>
            <b-button type="submit" variant="primary" :disabled="loading">Создать</b-button>
          </b-form>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="row-title">
          Все проекты и страницы
        </div>
        <div class="row-subtitle">
          Перетаскивайте страницы для распределения между проектами
        </div>
        <div class="projects-list">
          <div class="projects-list__item" v-for="(p, key) in projects">
            <div class="project">
              <div class="project__title">
                {{ p.name }}
                <i class="fas fa-trash"
                   v-b-tooltip.hover
                   title="Удалить проект"
                   @click="removeProject(p)"
                   v-if="key > 0"
                ></i>
              </div>
              <div class="project__pages">
                <div class="project-page">
                  <div class="project-page__left">
                    <div class="network" style="background-image: url(&quot;/test1.jpg&quot;);">
                      <div class="network__icon" style="background-color: rgb(70, 128, 194);">
                        <i class="fab fa-vk"></i>
                      </div>
                    </div>
                    <div class="project-page__title">
                      Frontend Mafia
                    </div>
                  </div>
                  <i class="fas fa-grip-vertical"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      name: '',
      loading: false,
      errors: {}
    }),
    computed: {
      projects () {
        return this.$store.getters['user/projects'];
      },
    },
    methods: {
      createProject () {
        this.loading = true;
        this.errors = {};
        let data = {
          name: this.name
        };
        this.$store.dispatch('user/createProject', data)
          .then((res) => {
            this.name = '';
          })
          .catch(e => {
            if (e.response && e.response.data.errors) this.errors = e.response.data.errors;
          })
          .finally(() => {
            this.loading = false;
          })
      },
      removeProject (project) {
        this.$swal({
          title: `Удалить проект?`,
          html: `Проект "${project.name}" будет удален навсегда. Все связанные с ним страницы, будут перемещенны в ваш первый проект`,
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Удалить',
          cancelButtonText: 'Отмена',
        }).then(res => {
          if (res.value) {
            this.$store.dispatch('user/deleteProject', {
              id: project._id
            }).then(() => {
              this.$swal({
                title: `Проект удален`,
                type: 'success',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000
              })
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../variables";

  .projects-list {
    display: flex;
    flex-wrap: wrap;

    &__item {
      width: calc(33.33333333333% - 15px);
      height: 400px;
      background-color: $color-bg-1;
      margin-right: 20px;
      margin-bottom: 20px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }

  .project {
    position: relative;

    &__title {
      padding: 15px 15px;
      margin-bottom: 10px;
      font-size: 18px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: $color-bg-3;

      .fas {
        cursor: pointer;
        color: $color-danger;
        font-size: 14px;
      }
    }

    &__pages {
      height: 343px;
      overflow-y: auto;
    }
  }

  .project-page {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;

    &:hover {
      background-color: $color-bg-2;
    }

    &__left {
      display: flex;
      align-items: center;
    }
  }
</style>