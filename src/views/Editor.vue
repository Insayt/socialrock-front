<template>
  <div>
    <div class="access-denied" v-if="!currentProject.access.editor">
      <img src="../assets/img/access_denied.svg">
      <div class="access-denied__header">
        Oops.. 🤭
      </div>
      У вас нет доступа к этому разделу.
      <br> Обратитесь к администратору проекта,
      <br> если вам очень нужно сюда попасть :)
    </div>
    <div v-else>
      Редактор
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      currentProject () {
        return this.$store.getters['user/currentProject'];
      },
    },
  }
</script>

<style scoped>

</style>