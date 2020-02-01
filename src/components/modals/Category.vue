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
    <div class="categories" v-if="currentProject.categories && currentProject.categories.length">
      <div class="category" v-for="category in currentProject.categories">
        <div class="category__left">
          <div class="category__icon" :style="{ backgroundColor: category.color }">
            {{ category.name[0].toUpperCase() }}
          </div>
          <div class="category__name">
            {{ category.name }}
          </div>
        </div>
        <div class="category__right">
          <b-button type="button"
                    variant="black"
                    size="sm"
                    class="mr-2"
                    v-b-tooltip.hover title="Редактировать рубрику"
                    @click="editCategory(category)"
          >
            <i class="fas fa-edit"></i>
          </b-button>
          <b-button type="button"
                    variant="black"
                    size="sm"
                    v-b-tooltip.hover title="Удалить рубрику"
                    @click="removeCategory(category)"
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
    computed: {
      currentProject () {
        return this.$store.getters['user/currentProject'];
      },
    },
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
      editCategory (category) {
        this.$bus.$emit('modal:add-category', category)
      },
      removeCategory (category) {
        this.$swal({
          title: `Удалить рубрику?`,
          html: `Рубрика <b class="color-primary">${category.name}</b> будет удалена навсегда`,
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Удалить',
          cancelButtonText: 'Отмена',
        }).then(res => {
          if (res.value) {
            this.$store.dispatch('user/deleteCategory', {
              id: category._id
            }).then(() => {
              this.$swal({
                title: `Рубрика удалена`,
                type: 'success',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000
              })
            })
          }
        })
      }
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