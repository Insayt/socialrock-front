<template>
  <b-modal ref="users" size="md">
    <template v-slot:modal-header-close>
      <img src="../../assets/img/icons/times.svg">
    </template>
    <template v-slot:modal-title>
      Пользователи
    </template>
    <div class="modal-info">
      Добавьте пользователей и работайте над соцсетями в команде.
    </div>
    <div class="s-modal-content" v-if="currentProject.shared_to.length">
      <div class="font-weight-bold">
        Добавленные пользователи:
      </div>
      <div class="users">
        <div class="users__item" v-for="user in currentProject.shared_to">
          <div class="users__email">
            <div>{{ user.email }}</div>
          </div>
          <div class="users__buttons">
            <i class="far fa-calendar-alt"
               :class="{ _active: user.access.posts }"
               @click="changeAccess('posts', user)"
               title="Создание и редактирование постов"
               v-b-popover.hover.top="{ variant: 'info',  content: `Кликните что бы включить или выключить доступ` }"
            ></i>
            <i class="fas fa-paint-brush"
               :class="{ _active: user.access.editor }"
               @click="changeAccess('editor', user)"
               title="Работа с редактором дизайна"
               v-b-popover.hover.top="{ variant: 'info',  content: `Кликните что бы включить или выключить доступ` }"
            ></i>
            <i class="fas fa-chart-bar"
               @click="changeAccess('analytics', user)"
               :class="{ _active: user.access.analytics }"
               title="Просмотр аналитики и экспорт отчетов"
               v-b-popover.hover.top="{ variant: 'info',  content: `Кликните что бы включить или выключить доступ` }"
            ></i>
            <i class="fas fa-cog"
               @click="changeAccess('settings', user)"
               :class="{ _active: user.access.settings }"
               title="Редактирование настроек проекта"
               v-b-popover.hover.top="{ variant: 'info',  content: `Кликните что бы включить или выключить доступ` }"
            ></i>
            <i class="fas fa-trash"
               @click="deleteUser(user)"
               v-b-tooltip.hover title="Удалить пользователя"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <template v-slot:modal-footer>
      <b-button type="submit" variant="primary" @click="$bus.$emit('modal:add-user')">Добавить пользователя</b-button>
    </template>
  </b-modal>
</template>

<script>
  export default {
    data: () => ({
      users: [],
      errors: {}
    }),
    computed: {
      currentProject () {
        return this.$store.getters['user/currentProject'];
      },
    },
    mounted () {
      this.$bus.$on('modal:users', () => {
        if (this.$refs['users']) {
          this.$refs['users'].show()
        }
      });
    },
    beforeDestroy () {
      this.$bus.$off('modal:users');
    },
    methods: {
      changeAccess (type, user) {
        user.access[type] = !user.access[type];
        this.$store.dispatch('user/addUserAccess', {
          project_id: this.currentProject._id,
          email: user.email,
          access: user.access
        }).then(() => {
          this.$swal({
            title: `Доступ обновлен`,
            type: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000
          })
        }).catch(e => {
          if (e.response && e.response.data.errors) this.errors = e.response.data.errors;
        })
      },
      deleteUser (user) {
        this.$swal({
          title: `Удалить пользователя?`,
          html: `Вы уверены что хотите удалить пользователя <b class="color-primary">${user.email}</b> из проекта?`,
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Удалить',
          cancelButtonText: 'Отмена',
        }).then(res => {
          if (res.value) {
            this.$store.dispatch('user/deleteUserAccess', {
              project_id: this.currentProject._id,
              email: user.email,
            }).then(() => {
              this.$refs['users'].hide();
              this.$swal({
                title: `Пользователь удален`,
                type: 'success',
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

<style lang="scss" scoped>
  @import "../../variables";
  .access-title {
    margin-top: 30px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  .users {
    &__item {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__email {

    }
    &__buttons {
      i {
        cursor: pointer;
        margin-right: 15px;
        color: $color-font-gray;
        font-size: 18px;

        &._active {
          color: $color-success;
        }
        &.fa-trash {
          color: $color-danger;
        }
      }
    }
  }
</style>