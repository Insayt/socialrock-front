<template>
  <div id="app" :class="{ fullwidth: $router.currentRoute.name === 'auth' || $router.currentRoute.name === 'editor-create' }" v-if="!loading">
    <!--<div id="nav">-->
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->
    <vue-topprogress ref="topProgress"></vue-topprogress>
    <sidebar v-if="$router.currentRoute.name !== 'auth' && $router.currentRoute.name !== 'editor-create'"></sidebar>
    <div class="app-content">
      <s-header
        v-if="$router.currentRoute.name !== 'auth' && $router.currentRoute.name !== 'editor-create'"
        :current-route="$router.currentRoute.name"
      ></s-header>
      <router-view/>
    </div>
    <modal-post v-if="$router.currentRoute.name !== 'auth'"></modal-post>
    <modal-post-status v-if="$router.currentRoute.name !== 'auth'"></modal-post-status>
    <div class="loader" v-show="loaderWrap">
      <i class="fas fa-cog fa-spin"></i>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import sHeader from '@/components/Header';
  import Sidebar from '@/components/Sidebar';
  import ModalPost from '@/components/modals/Post';
  import ModalPostStatus from '@/components/modals/PostStatus';

  export default {
    components: {
      Sidebar,
      sHeader,
      ModalPost,
      ModalPostStatus,
    },
    data: () => ({
      isSidebarCollapse: false,
      showEditor: false,
      loaderWrap: false
    }),
    computed: {
      loading () {
        return this.$store.getters['user/loading'];
      },
    },
    mounted () {
      if (this.$route.query && this.$route.query.email && this.$route.query.token) {
        let data = {
          email: this.$route.query.email,
          password: this.$route.query.token,
        };
        this.$store.dispatch('user/login', data)
            .then(() => {
              this.$router.push({ name: 'calendar', params: { projectId: this.$store.getters['user/currentProject'].short_id } });
            })
      }
      this.$bus.$on('loading:start', () => {
        this.$refs.topProgress.start();
      });
      this.$bus.$on('loading:stop', () => {
        this.$refs.topProgress.done();
      });
      this.$bus.$on('fixedloader:start', () => {
        this.loaderWrap = true;
      });
      this.$bus.$on('fixedloader:stop', () => {
        this.loaderWrap = false;
      });
    },
    methods: {}
  }
</script>


<style lang="scss">
  @import "variables";
  @import "theme";

  #app {
    padding-left: 240px;

    &.sidebar-mini {
      padding-left: 60px;
    }

    &.fullwidth {
      padding-left: 0;
      .app-content {
        padding-top: 0;
      }
    }
  }

  .app-content {
    padding-top: 60px;
  }

  .dropdown-calendar {
    .dropdown-menu {
      padding: 0;
    }
  }

  .post-modal-trash {
    margin-left: 10px;
    opacity: .4;
    font-size: 14px;
    cursor: pointer;
  }

  .network {
    width: 60px;
    height: 60px;
    background: $color-bg-6;
    border-radius: 5px;
    position: relative;
    cursor: pointer;
    background-size: cover;
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }

    &__check {
      width: 20px;
      height: 20px;
      background-color: $color-success;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: -5px;
      top: -5px;
      color: white;
      border-radius: 50%;
      font-size: 10px;
    }

    &__bg {
      display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba($color-success, 0.5);
      border-radius: 5px;
    }

    &__icon {
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      position: absolute;
      right: 0;
      bottom: 0;
      border-radius: 2px;
      font-size: 16px;
      background: $color-bg-9;
    }
  }

  .network._active {
    .network__bg {
      display: block;
    }
  }

  .network-add {
    width: 60px;
    height: 60px;
    border: 1px solid $color-bg-8;
    color: $color-bg-8;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 5px;
    font-size: 18px;

    &:hover {
      color: $color-font-gray;
      border-color: $color-font-gray;
    }
  }

  .post-modal {
    &__networks {
      margin-top: 5px;
      margin-bottom: 20px;
      display: flex;
    }

    .custom-select {
      width: 60px;
      color: $color-font;
      font-weight: inherit;
      background-color: $color-bg-6;
      border-color: $color-bg-6;
      cursor: pointer;

      &:focus{
        box-shadow: none;
      }

      &:hover {
        box-shadow: $box-shadow-button;
      }
    }
  }

  .loader {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba($color-bg-0, 0.9);
    color: $color-font-gray;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 35px;
  }
</style>
