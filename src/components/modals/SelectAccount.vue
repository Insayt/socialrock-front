<template>
  <b-modal modal-class="modal-bg-no-opacity" ref="select-account" size="md" no-close-on-backdrop>
    <template v-slot:modal-header-close>
      <img src="../../assets/img/icons/times.svg">
    </template>
    <template v-slot:modal-title>
      Выберите страницы, которые хотите подключить
    </template>
    <div class="accounts">
      <div class="project-page" v-for="acc in accounts" @click="selectPage(acc)"
           :class="{ _disabled: isAccountAdded(acc.id) }">
        <div class="project-page__left">
          <div class="network" :style="{ backgroundImage: `url(${acc.photo_200})` }">
            <div class="network__icon" style="background-color: rgb(70, 128, 194);">
              <i class="fab fa-vk" v-if="acc.social_type === 'vk'"></i>
            </div>
          </div>
          <div class="project-page__title">
            {{ acc.name }}
            <div class="project-page__subtitle" v-if="isAccountAdded(acc.id)">
              Страница уже добавлена к одному из проектов
            </div>
          </div>
        </div>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" autocomplete="off"
                 class="custom-control-input" value="true" :checked="acc.checked">
          <label class="custom-control-label"></label>
        </div>
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
      projects () {
        return this.$store.getters['user/projects'];
      },
    },
    methods: {
      test (acc) {
        console.log(acc);
      },
      selectPage (page) {
        page.checked = !page.checked
      },
      isAccountAdded (socialId) {
        let added = false;
        let searchArray = [];
        this.projects.map(p => {
          p.social_accounts.map(acc => {
            searchArray.push(Number(acc.social_id))
          })
        });
        if (searchArray.includes(socialId)) {
          added = true;
        }
        return added;
      },
      addAccount () {
        let checkedAccounts = this.accounts.filter(acc => {
          return acc.checked;
        });
        this.$store.dispatch('user/addAccounts', {accounts: checkedAccounts, project_id: this.currentProject._id})
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

    &._disabled {
      opacity: 0.2;
      pointer-events: none;
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
    &__subtitle {
      font-size: 14px;
    }
  }
</style>