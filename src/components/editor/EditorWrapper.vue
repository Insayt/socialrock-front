<template>
  <div class="editor">
    <div class="editor-header">
      Header
      <i class="fas fa-undo"></i>
      <i class="fas fa-redo"></i>
      <i class="fas fa-trash"></i>
      <div>
        <i class="fas fa-arrow-down"></i>
        <i class="fas fa-arrow-up"></i>
      </div>
      <div>
        <i class="fas fa-arrow-right"></i>
        <i class="fas fa-arrow-left"></i>
      </div>
    </div>
    <div class="editor-sidebar">
      Sidebar
    </div>
    <div class="editor-bottom">
      <i class="fas fa-image"></i>
      <i class="fas fa-font"></i>
      <i class="fas fa-smile"></i>
      <i class="fas fa-shapes"></i>
    </div>
    <div class="editor-resize">
      Resize
    </div>
  </div>
</template>

<script>
  export default {
    name: "EditorWrapper"
  }
</script>

<style scoped lang="scss">
  @import '../../variables';
  .editor {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: $color-bg-1;
    z-index: 10;
    top: 0;
    left: 0;
  }
  .editor-header {
    height: 50px;
    background-color: $color-bg-2;
  }
  .editor-sidebar {

  }
  .editor-bottom {
    position: absolute;
    bottom: 0;
  }
  .editor-resize {
    position: absolute;
    right: 0;
  }
</style>