<template>
  <b-modal ref="settings-modal" size="lg" hide-footer hide-header>
    <div class="settings">
      123
    </div>
  </b-modal>
</template>

<script>
  export default {
    mounted () {
      this.$bus.$on('modal:settings', () => {
        this.$refs['settings-modal'].show()
      })
    }
  }
</script>

<style lang="scss" scoped>
  .settings {
    background-color: red;
  }
</style>