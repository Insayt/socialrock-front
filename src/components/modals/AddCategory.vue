<template>
  <b-modal ref="add-category" size="md">
    <template v-slot:modal-header-close>
      <img src="../../assets/img/icons/times.svg">
    </template>
    <template v-slot:modal-title>
      Новая рубрика
    </template>
    <div class="add-category">
      <b-form class="form-auth__form" @submit.prevent="register">
        <b-form-group
          label="Название"
        >
          <b-form-input
            type="text"
            placeholder="Введите название"
            v-model="name"
            :class="{ 'is-invalid': errors.name }"
          ></b-form-input>
          <div class="invalid-feedback">
            {{ errors.name }}
          </div>
        </b-form-group>
        <b-form-group
          label="Цвет"
        >
          <div class="colors">
            <div class="color"
                 v-for="color in colors"
                 :style="{ backgroundColor: color }"
                 :class="{ _active: checkColor === color }"
                 @click="selectColor(color)">
              <i class="fas fa-check"></i>
            </div>
          </div>
        </b-form-group>
      </b-form>
    </div>
    <template v-slot:modal-footer>
      <b-button type="submit" variant="primary" @click="$bus.$emit('modal:add-account')">Добавить</b-button>
    </template>
  </b-modal>
</template>

<script>
  import config from '../../config';
  export default {
    data: () => ({
      name: '',
      colors: config.projectColors,
      checkColor: '',
      errors: {}
    }),
    mounted () {
      this.$bus.$on('modal:add-category', () => {
        if (this.$refs['add-category']) {
          this.$refs['add-category'].show();
          this.checkColor = config.projectColors[0];
        }
      });
    },
    beforeDestroy () {
      this.$bus.$off('modal:add-category');
    },
    methods: {
      selectColor (color) {
        this.checkColor = color;
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../variables";
  .add-category {
    padding: 20px;
  }
  .colors {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .color {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: gray;
    margin-right: 5px;
    margin-bottom: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid transparent;

    &:nth-child(10n) {
      margin-right: 0;
    }

    .fas {
      display: none;
    }

    &._active {
      border-color: white;
      .fas {
        display: block;
      }
    }
  }
</style>