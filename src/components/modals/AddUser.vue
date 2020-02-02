<template>
  <b-modal ref="add-user" size="md">
    <template v-slot:modal-header-close>
      <img src="../../assets/img/icons/times.svg">
    </template>
    <template v-slot:modal-title>
      Добавить пользователя
    </template>
    <div class="s-modal-content">
      <b-form class="form-auth__form">
        <b-form-group
          label="Введите email"
        >
          <b-form-input
            type="text"
            placeholder="Email"
            v-model="email"
            :class="{ 'is-invalid': errors.email }"
          ></b-form-input>
          <div class="invalid-feedback">
            {{ errors.email }}
          </div>
        </b-form-group>
        <div class="access-title">
          Выберите доступы для пользователя:
        </div>
        <b-form-group>
          <b-form-checkbox
            v-model="posts"
          >
            Создание и редактирование постов
          </b-form-checkbox>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox
            v-model="editor"
          >
            Работа с редактором дизайна
          </b-form-checkbox>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox
            v-model="analytics"
          >
            Просмотр аналитики и экспорт отчетов
          </b-form-checkbox>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox
            v-model="settings"
          >
            Редактирование настроек проекта
          </b-form-checkbox>
        </b-form-group>
      </b-form>
    </div>
    <template v-slot:modal-footer>
      <b-button type="submit" variant="primary" @click="addUser">Сохранить</b-button>
    </template>
  </b-modal>
</template>

<script>
  export default {
    data: () => ({
      email: '',
      posts: true, // Создание постов
      draft: true, // Черновики
      editor: true, // Редактор
      analytics: true, // Аналитика
      settings: true, // Настройки
      errors: {}
    }),
    computed: {
      currentProject () {
        return this.$store.getters['user/currentProject'];
      },
    },
    mounted () {
      this.$bus.$on('modal:add-user', () => {
        if (this.$refs['add-user']) {
          this.$refs['add-user'].show()
        }
      });
    },
    beforeDestroy () {
      this.$bus.$off('modal:add-user');
    },
    methods: {
      addUser () {
        this.errors = {};
        this.$store.dispatch('user/addUserAccess', {
          project_id: this.currentProject._id,
          email: this.email,
          access: {
            posts: this.posts,
            draft: this.draft,
            editor: this.editor,
            analytics: this.analytics,
            settings: this.settings,
          }
        }).then(() => {
          this.$refs['add-user'].hide();
          this.$swal({
            title: `Приглашение отправлено`,
            type: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000
          });
        }).catch(e => {
          if (e.response && e.response.data.errors) this.errors = e.response.data.errors;
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../variables";
  .access-title {
    margin-top: 30px;
    margin-bottom: 10px;
    font-weight: bold;
  }
</style>