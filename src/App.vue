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
    padding-left: 250px;

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
