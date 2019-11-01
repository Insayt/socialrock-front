<template>
  <div id="app" :class="{ 'sidebar-mini': isSidebarCollapse }">
    <!--<div id="nav">-->
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->
    <sidebar @toggle="sidebarToggle"></sidebar>
    <router-view/>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Sidebar from '@/components/Sidebar';

  export default {
    components: {
      Sidebar
    },
    data: () => ({
      isSidebarCollapse: false
    }),
    methods: {
      sidebarToggle () {
        this.isSidebarCollapse = !this.isSidebarCollapse;
      }
    }
  }
</script>


<style lang="scss">
  body {
    background-color: #1E1E1E;
    color: #F0F0F0;
    font-family: "Roboto";
  }

  a {
    color: #007BED
  }

  .vc-text-gray-200 {
    color: #F0F0F0;
  }
  .vc-border-gray-700 {
    border: none;
  }
  .vc-bg-gray-900 {
    background-color: #313033;
  }
  /*.vc-bg-orange-500 {*/
    /*background-color: #ffc107;*/
    /*opacity: 1;*/
  /*}*/
  .vc-text-white {
    color: #1E1E1E;
  }
  .vc-select-none {
    color: #F0F0F0 !important;
  }

  .dropdown {

    .btn-link {
      color: #F0F0F0;
      font-size: 16px;
      font-weight: bold;

      i {
        margin-left: 5px;
      }
    }

    .dropdown-menu {
      min-width: 200px;
      background-color: #313033;
      color: #F0F0F0;

      .dropdown-item {
        color: #F0F0F0;
        font-weight: bold;
        padding: 10px 20px;
        &:hover {
          background-color: #272729;
        }
        i {
          margin-right: 10px;
        }
      }
    }
  }

  .modal {
    .close {
      color: #F0F0F0;
      outline: none;
    }
    .modal-header, .modal-footer {
      border-color: #2F2F2F;
    }
  }

  .modal-content {
    background-color: #1E1E1E;
    color: #F0F0F0;
  }

  .modal-backdrop {
    opacity: 0.9;
  }

  .form-control {
    background-color: #272628;
    border-color: #272628;
    color: #F0F0F0;

    &:focus {
      background-color: #272628;
      border-color: #272628;
      color: #F0F0F0;
    }
  }

  .btn {
    &:focus {
      box-shadow: none !important;
    }
  }

  .btn-black {
    color: #F0F0F0;
    font-weight: inherit;
    background-color: #313033;

    &:hover {
      color: #F0F0F0;
      background-color: lighten(#313033, 5%);
    }
  }

  #app {
    padding-left: 260px;

    &.sidebar-mini {
      padding-left: 60px;
    }
  }

  .btn-warning {
    color: #1E1E1E;
    display: flex;
    align-items: center;
    justify-content: center;

    .fas {
      margin-right: 10px;
    }
  }

</style>
