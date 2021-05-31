<template>
  <b-modal ref="preview-modal" size="md" @hide="$emit('close')">
    <template v-slot:modal-title>
      Предпросмотр
    </template>
    <div class="preview-modal">
      <img class="preview-modal__img" v-if="media.type === 'image'" :src="media.src">
      <video class="preview-modal__img" v-else controls="controls" :poster="media.preview">
        <source :src="media.src">
      </video>
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
  display: flex;
  justify-content: center;
  &__img {
    max-width: 100%;
  }
}
</style>