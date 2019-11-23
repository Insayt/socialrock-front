<template>
  <div id="app" :class="{ fullwidth: $router.currentRoute.name === 'auth' }" v-if="!loading">
    <!--<div id="nav">-->
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->
    <sidebar v-if="$router.currentRoute.name !== 'auth'"></sidebar>
    <div class="app-content">
      <s-header v-if="$router.currentRoute.name !== 'auth'" :current-route="$router.currentRoute.name"></s-header>
      <router-view/>
    </div>
    <modal-post v-if="$router.currentRoute.name !== 'auth'"></modal-post>
  </div>
</template>

<script>
  // @ is an alias to /src
  import sHeader from '@/components/Header';
  import Sidebar from '@/components/Sidebar';
  import ModalPost from '@/components/modals/Post';


  export default {
    components: {
      Sidebar,
      sHeader,
      ModalPost,
    },
    data: () => ({
      isSidebarCollapse: false
    }),
    computed: {
      loading () {
        return this.$store.getters['user/loading'];
      },
    },
    mounted () {
      // this.$bus.$on('test', () => {
      //   console.log('Test!');
      // });
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

  .post-editor {
    background-color: $color-bg-4;
    padding: 10px;
    position: relative;

    textarea {
      padding-right: 40px;
    }

    textarea:focus {
      box-shadow: none;
      outline: none;
    }

    &__emoji {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    &__date {
      display: flex;
      /*justify-content: space-between;*/
      align-items: center;
    }

    &__date-text {
      margin-right: 20px;
      min-width: 150px;
    }

    &__date {
      margin: 20px 0;
    }

    &__info {
      //border-top: 1px solid $color-success;
      //border-bottom: 1px solid $color-success;
      background-color: rgba($color-success, 0.1);
      color: lighten($color-success, 10%);
      padding: 20px;
      width: calc(100% + 32px);
      margin-left: -16px;
      display: flex;

    }

    &__info-emoji {
      font-size: 60px;
      margin-right: 20px;
    }

    &__info-emoji {
      font-size: 60px;
      margin-right: 20px;
    }


    &__info-title {
      font-size: 24px;
    }
  }
</style>
