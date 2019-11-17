<template>
  <b-modal ref="list-accounts">
    <template v-slot:modal-header-close>
      <img src="../../assets/img/icons/times.svg">
    </template>
    <template v-slot:modal-title>
      Страницы
    </template>
    <div class="modal-info">
      Подключайте новые страницы в соцсетях и удаляйте ненужные.
    </div>
    <div class="no-projects" v-if="!currentProject.social_accounts.length">
      <div class="no-projects__title">
        Добавьте вашу первую страницу
      </div>
      <div class="no-projects__icon">
        <i class="fas fa-arrow-down"></i>
      </div>
    </div>
    <div class="projects" v-if="currentProject.social_accounts.length">
      <div class="project-page" v-for="account in currentProject.social_accounts">
        <div class="project-page__left">
          <div class="network" :style="{ backgroundImage: `url(${account.picture})` }">
            <div v-if="account.social_type === 'vk'" class="network__icon" style="background-color: rgb(70, 128, 194);">
              <i class="fab fa-vk"></i>
            </div>
          </div>
          <div class="project-page__title">
            {{ account.name }}
          </div>
        </div>
        <b-button type="button"
                  variant="black"
                  size="sm"
                  @click="removeSocialAccount(account)"
                  v-b-tooltip.hover title="Удалить страницу"
        >
            <span class="text-danger">
              <i class="fas fa-trash"></i>
            </span>
        </b-button>
      </div>
    </div>

    <template v-slot:modal-footer>
      <!--<div class="foot"></div>-->
      <b-button type="submit" variant="primary" block @click="$bus.$emit('modal:add-account')">Добавить страницу</b-button>
    </template>
  </b-modal>
</template>

<script>
  export default {
    data: () => ({

    }),
    computed: {
      currentProject () {
        return this.$store.getters['user/currentProject'];
      },
    },
    mounted () {
      this.$bus.$on('modal:list-accounts', () => {
        if (this.$refs['list-accounts']) {
          this.$refs['list-accounts'].show()
        }
      });
      this.$bus.$on('modal:hide-all', () => {
        if (this.$refs['list-accounts']) {
          this.$refs['list-accounts'].hide()
        }
      });
    },
    beforeDestroy () {
      this.$bus.$off('modal:list-account');
      this.$bus.$off('modal:hide-all');
    },
    methods: {
      removeSocialAccount (account) {
        this.$swal({
          title: `Удалить страницу?`,
          html: `Страница <b class="color-primary">${account.name}</b> будет удалена навсегда. Все связанные с ней данные будут потеряны`,
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Удалить',
          cancelButtonText: 'Отмена',
        }).then(res => {
          if (res.value) {
            this.$store.dispatch('user/deleteAccount', {
              account_id: account._id
            }).then(() => {
              this.$swal({
                title: `Страница удалена`,
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
  @import "../../variables";

  .projects {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
  }

  .project-page {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;

    &:last-child {
      margin-bottom: 0;
    }

    &__left {
      display: flex;
      align-items: center;
    }

    &__title {
      white-space: nowrap;
      overflow: hidden;
      width: 300px;
      text-overflow: ellipsis;
    }
  }
  .no-projects {
    text-align: center;
    font-size: 16px;
    padding-top: 30px;

    &__title {
      margin-bottom: 10px;
    }

    &__icon {
      font-size: 25px;
      margin-bottom: 20px;
      animation-name: tick;
      animation-duration: 1s;
      animation-iteration-count: infinite;
    }
  }

  @keyframes tick {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(0);
    }
  }
</style>