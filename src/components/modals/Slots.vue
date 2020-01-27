<template>
  <b-modal ref="slots" size="md" @hide="onHide">
    <template v-slot:modal-header-close>
      <img src="../../assets/img/icons/times.svg">
    </template>
    <template v-slot:modal-title>
      <span>Слоты</span>
    </template>
    <div class="modal-info">
      Добавляйте и изменяйте пустые слоты на всю неделю в расписании ваших публикаций, для более удобного планирования
    </div>
    <div class="slots">
      <div class="slot-wrap" v-for="day in 7">
        <div class="slot-day">
          {{ getDayName(day) }}
        </div>
        <div v-for="(val, index) in currentProject.slots[day]">
          <div class="slot _bottom">
            <div class="slot-left">
              <div class="slot__time _right">
                <b-input disabled :value="formatTime(index)"></b-input>
              </div>
              <div class="slot__category">
                <b-form-select v-model="currentProject.slots[day][index]" :options="categoriesSelect" @change="changeSlotCategory(day, index, currentProject.slots[day][index])"></b-form-select>
              </div>
            </div>
            <b-button type="button"
                      variant="black"
                      size="sm"
                      v-b-tooltip.hover title="Удалить слот"
                      @click="deleteSlot(day, index)"
            >
              <span class="text-danger">
                <i class="fas fa-trash"></i>
              </span>
            </b-button>
          </div>
        </div>
        <div class="slot-title">
          Выберите время и тему для нового слота
        </div>
        <div class="slot _bottom-max">
          <div class="slot__time _right">
            <datetime type="time"
                      class="theme-dark"
                      title="Дата и время слота:"
                      placeholder="Время"
                      v-model="times[day]"
                      :phrases="{ok: 'Ок', cancel: 'Отмена'}"
            ></datetime>
          </div>
          <div class="slot__category">
            <b-form-select v-model="categories[day]" :options="categoriesSelect"></b-form-select>
          </div>
          <b-button type="button" variant="primary" @click="addSlot(day)">Добавить</b-button>
        </div>
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
      daysNames: [
        { num: 1, name: 'Понедельник' },
        { num: 2, name: 'Вторник' },
        { num: 3, name: 'Среда' },
        { num: 4, name: 'Четверг' },
        { num: 5, name: 'Пятница' },
        { num: 6, name: 'Суббота' },
        { num: 7, name: 'Воскресенье' },
      ],
      times: {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
      },
      categories: {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
      }
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
      onHide () {
        this.time = null;
        this.category = null;
        this.categoriesSelect = [];
        this.type = 'week';
      },
      addSlot (day) {
        this.$store.dispatch('user/addSlot', {
          project_id: this.currentProject._id,
          day_number: day,
          slot_index: DateTime.fromISO(this.times[day]).toFormat('HH_mm'),
          value: this.categories[day]
        }).then(() => {
          this.times[day] = null;
          this.categories[day] = null;
          this.$swal({
            title: `Слот сохранена`,
            type: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000
          })
        })
      },
      getDayName (day) {
        return this.daysNames.find(i => i.num === day).name;
      },
      formatTime (time) {
        return time.replace('_', ':');
      },
      changeSlotCategory (day, time, val) {
        this.$store.dispatch('user/editSlotCategory', {
          project_id: this.currentProject._id,
          day_number: day,
          slot_index: time,
          value: val
        }).then(() => {
          this.$swal({
            title: `Рубрика сохранена`,
            type: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000
          })
        })
      },
      deleteSlot (day, time) {
        this.$store.dispatch('user/deleteSlot', {
          project_id: this.currentProject._id,
          day_number: day,
          slot_index: time,
        }).then(() => {
          this.$swal({
            title: `Слот удален`,
            type: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000
          })
        })
      }
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

    &._bottom {
      margin-bottom: 10px;
    }

    &._bottom-max {
      margin-bottom: 20px;
    }

    &__time {
      max-width: 100px;
      &._right {
        margin-right: 10px;
      }
    }

    &__category {
      width: 100%;
      margin-right: 10px;
    }
  }
  .slot-day {
    font-weight: bold;
    margin-bottom: 10px;
  }
  .slot-left {
    display: flex;
    align-items: center;
    width: 100%;

    .custom-select {
      min-width: 100%;
    }
  }
</style>