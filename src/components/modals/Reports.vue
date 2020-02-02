<template>
  <b-modal ref="reports" size="md">
    <template v-slot:modal-header-close>
      <img src="../../assets/img/icons/times.svg">
    </template>
    <template v-slot:modal-title>
      Отчеты
    </template>
    <div class="modal-info">
      Укажите почту на которую хотите получать еженедельные и ежемесячные отчеты
    </div>
    <div class="s-modal-content">
      <b-form>
        <b-form-group
          label="Ввведите email"
        >
          <b-form-input
            type="text"
            placeholder="Email"
            v-model="email"
            :class="{ 'is-invalid': errors.email }"
          ></b-form-input>
          <div class="invalid-feedback">
            {{ errors.email }}
          </div>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox
            v-model="week"
          >
            Получать еженедельные отчеты
          </b-form-checkbox>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox
            v-model="month"
          >
            Получать ежемесячные отчеты
          </b-form-checkbox>
        </b-form-group>
      </b-form>
    </div>
    <template v-slot:modal-footer>
      <b-button type="submit" variant="primary" @click="saveReports">Сохранить</b-button>
    </template>
  </b-modal>
</template>

<script>
  export default {
    data: () => ({
      email: '',
      week: true,
      month: true,
      errors: {}
    }),
    computed: {
      currentProject () {
        return this.$store.getters['user/currentProject'];
      },
    },
    mounted () {
      this.$bus.$on('modal:reports', () => {
        if (this.$refs['reports']) {
          this.email = this.currentProject.reports.email;
          this.week = this.currentProject.reports.week;
          this.month = this.currentProject.reports.month;
          this.$refs['reports'].show();
        }
      });
    },
    beforeDestroy () {
      this.$bus.$off('modal:reports');
    },
    methods: {
      saveReports () {
        this.$store.dispatch('user/changeProjectReports', {
          project_id: this.currentProject._id,
          email: this.email,
          week: this.week,
          month: this.month,
        }).then(() => {
          this.$refs['reports'].hide();
          this.$swal({
            title: `Настройки отчетов сохранены`,
            type: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000
          });
        }).catch(e => {
          if (e.response && e.response.data.errors) this.errors = e.response.data.errors;
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../variables";

  .access-title {
    margin-top: 30px;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .users {
    &__item {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__email {

    }
    &__buttons {
      i {
        cursor: pointer;
        margin-right: 15px;
        color: $color-font-gray;
        font-size: 18px;

        &._active {
          color: $color-success;
        }
        &.fa-trash {
          color: $color-danger;
        }
      }
    }
  }
</style>