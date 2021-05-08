<template>
  <b-modal ref="preview-modal" size="lg" @hide="$emit('close')">
    <template v-slot:modal-title>
      Предпросмотр
    </template>
    <div class="preview-modal">
      <img class="preview-modal__img" :src="media.src">
    </div>

    <template v-slot:modal-footer>
      <div class="foot"></div>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: {
    media: Object
  },
  data: () => ({

  }),
  mounted() {
    this.$refs['preview-modal'].show();
  }
}
</script>

<style lang="scss" scoped>
.preview-modal {
  padding: 20px;
  &__img {
    max-width: 100%;
  }
}
</style>