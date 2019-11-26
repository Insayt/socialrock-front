<template>
  <b-modal ref="category" size="md">
    <template v-slot:modal-header-close>
      <img src="../../assets/img/icons/times.svg">
    </template>
    <template v-slot:modal-title>
      Рубрики
    </template>
    <div class="modal-info">
      Используйте цветные рубрики для разбиения постов на смысловые категории. Так проще
      отслеживать какие типы контента выходят в вашем проекте
    </div>
    <div class="categories">
      <div class="category">
        <div class="category__left">
          <div class="category__icon">
            T
          </div>
          <div class="category__name">
            Test
          </div>
        </div>
        <div class="category__right">
          <b-button type="button"
                    variant="black"
                    size="sm"
                    class="mr-2"
                    v-b-tooltip.hover title="Редактировать рубрику"
          >
            <i class="fas fa-edit"></i>
          </b-button>
          <b-button type="button"
                    variant="black"
                    size="sm"
                    v-b-tooltip.hover title="Удалить рубрику"
          >
            <span class="text-danger">
              <i class="fas fa-trash"></i>
            </span>
          </b-button>
        </div>
      </div>
      <div class="category">
        <div class="category__left">
          <div class="category__icon">
            T
          </div>
          <div class="category__name">
            Test
          </div>
        </div>
        <div class="category__right">
          <b-button type="button"
                    variant="black"
                    size="sm"
                    class="mr-2"
                    v-b-tooltip.hover title="Редактировать рубрику"
          >
            <i class="fas fa-edit"></i>
          </b-button>
          <b-button type="button"
                    variant="black"
                    size="sm"
                    v-b-tooltip.hover title="Удалить рубрику"
          >
            <span class="text-danger">
              <i class="fas fa-trash"></i>
            </span>
          </b-button>
        </div>
      </div>
    </div>
    <template v-slot:modal-footer>
      <b-button type="submit" variant="primary" @click="$bus.$emit('modal:add-category')">Добавить рубрику</b-button>
    </template>
  </b-modal>
</template>

<script>
  export default {
    data: () => ({}),
    mounted () {
      this.$bus.$on('modal:category', () => {
        if (this.$refs['category']) {
          this.$refs['category'].show()
        }
      });
    },
    beforeDestroy () {
      this.$bus.$off('modal:category');
    },
    methods: {
      createTestToken () {
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../variables";
  .categories {
    padding: 20px;
  }
  .category {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    &__left {
      display: flex;
      align-items: center;
    }

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: red;
      font-weight: bold;
      font-size: 24px;
      margin-right: 10px;
    }

    &__right {

    }
  }
</style>