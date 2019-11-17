<template>
  <b-modal modal-class="modal-bg-no-opacity" ref="select-account" size="md" no-close-on-backdrop >
    <template v-slot:modal-header-close>
      <img src="../../assets/img/icons/times.svg">
    </template>
    <template v-slot:modal-title>
      Выберите страницы, которые хотите подключить
    </template>
    <div class="accounts">
      <div class="project-page" v-for="acc in accounts" @click="acc.checked = !acc.checked">
        <div class="project-page__left">
          <div class="network" :style="{ backgroundImage: `url(${acc.photo_200})` }">
            <div class="network__icon" style="background-color: rgb(70, 128, 194);">
              <i class="fab fa-vk" v-if="acc.social_type === 'vk'"></i>
            </div>
          </div>
          <div class="project-page__title">
            {{ acc.name }}
          </div>
        </div>
        <b-form-checkbox v-model="acc.checked">
        </b-form-checkbox>
      </div>
    </div>
    <template v-slot:modal-footer>
      <div class="w-100">
        <div class="float-left"></div>
        <b-button
          variant="primary"
          class="float-right"
          @click="addAccount"
        >
          Подключить страницы
        </b-button>
        <b-button
          variant="black"
          class="float-right mr-3"
          @click="$refs['select-account'].hide()"
        >
          Отмена
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
  export default {
    data: () => ({
      accounts: []
    }),
    mounted () {
      this.$bus.$on('modal:select-account', (data) => {
        this.accounts = data.map(d => {
          d.checked = false;
          return d;
        });
        this.$nextTick(() => {
          this.$refs['select-account'].show()
        });
      })
    },
    beforeDestroy () {
      this.$bus.$off('modal:select-account')
    },
    computed: {
      currentProject () {
        return this.$store.getters['user/currentProject'];
      },
    },
    methods: {
      addAccount () {
        let checkedAccounts = this.accounts.filter(acc => {
          return acc.checked;
        });
        this.$store.dispatch('user/addAccounts', { accounts: checkedAccounts, project_id: this.currentProject._id })
          .then((res) => {
            this.$refs['select-account'].hide();
            this.$bus.$emit('modal:hide-add-account');
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../variables";
  .accounts {
    padding: 10px 0;
  }
  .project-page {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    cursor: pointer;

    &:hover {
      background-color: $color-bg-2;
    }

    &__left {
      display: flex;
      align-items: center;
    }
    &__title {
      white-space: nowrap;
      overflow: hidden;
      width: 340px;
      text-overflow: ellipsis;
    }
  }
</style>