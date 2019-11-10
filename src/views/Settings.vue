<template>
  <div class="page settings">
    <div class="box">
      <div class="box-title">
        Страницы
      </div>
      <div class="projects">
        <div class="project-page">
          <div class="project-page__left">
            <div class="network" style="background-image: url(/test1.jpg);">
              <div class="network__icon" style="background-color: rgb(70, 128, 194);">
                <i class="fab fa-vk"></i>
              </div>
            </div>
            <div class="project-page__title">
              Frontend Mafia
            </div>
          </div>
          <b-dropdown
            split
            split-variant="black"
            size="sm"
            variant="black"
            text="Обновить доступ"
          >
            <b-dropdown-item size="sm" href="#">
              <span class="text-danger">
                 <i class="fas fa-trash"></i>
              </span>
              Удалить
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div class="project-page">
          <div class="project-page__left">
            <div class="network" style="background-image: url(/test1.jpg);">
              <div class="network__icon" style="background-color: rgb(70, 128, 194);">
                <i class="fab fa-vk"></i>
              </div>
            </div>
            <div class="project-page__title">
              Frontend Mafia
            </div>
          </div>
          <b-dropdown
            split
            split-variant="black"
            size="sm"
            variant="black"
            text="Обновить доступ"
          >
            <b-dropdown-item size="sm" href="#">
              <span class="text-danger">
                 <i class="fas fa-trash"></i>
              </span>
              Удалить
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div class="project-page">
          <div class="project-page__left">
            <div class="network" style="background-image: url(/test1.jpg);">
              <div class="network__icon" style="background-color: rgb(70, 128, 194);">
                <i class="fab fa-vk"></i>
              </div>
            </div>
            <div class="project-page__title">
              Frontend Mafia
            </div>
          </div>
          <b-dropdown
            split
            split-variant="black"
            size="sm"
            variant="black"
            text="Обновить доступ"
          >
            <b-dropdown-item size="sm" href="#">
              <span class="text-danger">
                 <i class="fas fa-trash"></i>
              </span>
              Удалить
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div class="project-page">
          <div class="project-page__left">
            <div class="network" style="background-image: url(/test1.jpg);">
              <div class="network__icon" style="background-color: rgb(70, 128, 194);">
                <i class="fab fa-vk"></i>
              </div>
            </div>
            <div class="project-page__title">
              Frontend Mafia
            </div>
          </div>
          <b-dropdown
            split
            split-variant="black"
            size="sm"
            variant="black"
            text="Обновить доступ"
          >
            <b-dropdown-item size="sm" href="#">
              <span class="text-danger">
                 <i class="fas fa-trash"></i>
              </span>
              Удалить
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <b-button type="submit" variant="primary" @click="$bus.$emit('modal:add-account')">Добавить страницу</b-button>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  @import "../variables";

  .settings {

  }

  .projects {
    display: flex;
    flex-wrap: wrap;
  }

  .project-page {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(50% - 10px);
    margin-right: 20px;
    margin-bottom: 20px;

    &:nth-child(2n) {
      margin-right: 0;
    }

    &__left {
      display: flex;
      align-items: center;
    }

    &__title {
      white-space: nowrap;
      overflow: hidden;
      width: 300px;
      text-overflow: ellipsis;
    }
  }
</style>