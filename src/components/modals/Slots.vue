<template>
  <b-modal ref="slots" size="md">
    <template v-slot:modal-header-close>
      <img src="../../assets/img/icons/times.svg">
    </template>
    <template v-slot:modal-title>
      <span>Слоты</span>
    </template>
    <div class="modal-info">
      Добавляйте и изменяйте пустые слоты в расписании ваших публикаций для более удобного планирования
    </div>
    <div class="slots">
      <!--<div class="slots-select">-->
        <!--<b-form-select v-model="type" :options="options"></b-form-select>-->
      <!--</div>-->
      <div class="slot-title">
        Выберите время и тему для нового слота
      </div>
      <div class="slot">
        <div class="slot__time">
          <datetime type="time"
                    class="theme-dark"
                    title="Дата и время слота:"
                    placeholder="Время"
                    v-model="time"
                    :phrases="{ok: 'Ок', cancel: 'Отмена'}"
          ></datetime>
        </div>
        <div class="slot__category">
          <b-form-select v-model="category" :options="categoriesSelect"></b-form-select>
        </div>
        <b-button type="button" variant="primary">Добавить</b-button>
      </div>
    </div>
    <template v-slot:modal-footer>
      <div class="foot"></div>
    </template>
  </b-modal>
</template>

<script>
  import {DateTime} from 'luxon';

  export default {
    data: () => ({
      time: null,
      category: null,
      categoriesSelect: [],
      type: 'week',
      options: [
        {value: 'week', text: 'Слоты на неделю'},
        {value: 'day', text: 'Слоты для конкретных дней'},
      ]
    }),
    computed: {
      currentProject () {
        return this.$store.getters['user/currentProject'];
      },
    },
    mounted () {
      this.$bus.$on('modal:slots', () => {
        if (this.$refs['slots']) {
          this.$refs['slots'].show();
          this.categoriesSelect = [
            {value: null, text: 'Без рубрики'},
          ];
          this.currentProject.categories.map((cat) => {
            this.categoriesSelect.push({value: cat._id, text: cat.name});
          });
        }
      });
    },
    beforeDestroy () {
      this.$bus.$off('modal:slots');
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  @import "../../variables";

  .slots {
    padding: 20px;
  }

  .slots-select {
    margin-bottom: 20px;
  }

  .slot-title {
    font-size: 14px;
    color: $color-font-gray;
    margin-bottom: 10px;
  }

  .slot {
    display: flex;
    justify-content: space-between;

    &__time {

    }
  }
</style>