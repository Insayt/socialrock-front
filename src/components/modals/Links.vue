<template>
  <b-modal ref="links" size="md">
    <template v-slot:modal-header-close>
      <img src="../../assets/img/icons/times.svg">
    </template>
    <template v-slot:modal-title>
      Ссылки
    </template>
    <div class="modal-info">
      Настройте сокращение ссылок, чтобы считать клики и добавлять UTM-метки.
    </div>
    <div class="links">
      <div class="links__checkbox">
        <b-form-checkbox
          v-model="isAddUtm"
        >
          Добавлять UTM метки к ссылкам
        </b-form-checkbox>
      </div>
      <b-form class="form-auth__form" @submit.prevent="register" v-if="isAddUtm">
        <b-form-group
          label="Метка utm_medium"
        >
          <b-form-input
            type="text"
            v-model="utm_medium"
            :class="{ 'is-invalid': errors.utm_medium }"
          ></b-form-input>
          <div class="invalid-feedback">
            {{ errors.utm_medium }}
          </div>
        </b-form-group>
        <b-form-group
          label="Метка utm_source для ВКонтакте"
        >
          <b-form-input
            type="text"
            v-model="utm_source_vk"
            :class="{ 'is-invalid': errors.utm_source_vk }"
          ></b-form-input>
          <div class="invalid-feedback">
            {{ errors.utm_source_vk }}
          </div>
        </b-form-group>
        <b-form-group
          label="Метка utm_source для Facebook"
        >
          <b-form-input
            type="text"
            v-model="utm_source_fb"
            :class="{ 'is-invalid': errors.utm_source_fb }"
          ></b-form-input>
          <div class="invalid-feedback">
            {{ errors.utm_source_fb }}
          </div>
        </b-form-group>
        <b-form-group
          label="Метка utm_source для Instagram"
        >
          <b-form-input
            type="text"
            v-model="utm_source_inst"
            :class="{ 'is-invalid': errors.utm_source_inst }"
          ></b-form-input>
          <div class="invalid-feedback">
            {{ errors.utm_source_inst }}
          </div>
        </b-form-group>
        <b-form-group
          label="Метка utm_source для Одноклассников"
        >
          <b-form-input
            type="text"
            v-model="utm_source_ok"
            :class="{ 'is-invalid': errors.utm_source_ok }"
          ></b-form-input>
          <div class="invalid-feedback">
            {{ errors.utm_source_ok }}
          </div>
        </b-form-group>
        <b-form-group
          label="Метка utm_source для Telegram"
        >
          <b-form-input
            type="text"
            v-model="utm_source_tg"
            :class="{ 'is-invalid': errors.utm_source_tg }"
          ></b-form-input>
          <div class="invalid-feedback">
            {{ errors.utm_source_tg }}
          </div>
        </b-form-group>
      </b-form>
    </div>
    <template v-slot:modal-footer>
      <b-button type="submit" variant="primary" @click="saveUtm" :disabled="loading">Сохранить</b-button>
    </template>
  </b-modal>
</template>

<script>
  export default {
    data: () => ({
      isAddUtm: false,
      loading: false,
      errors: {},
      utm_medium: 'social',
      utm_source_vk: 'vk.com',
      utm_source_fb: 'facebook.com',
      utm_source_inst: 'instagram.com',
      utm_source_ok: 'ok.ru',
      utm_source_tg: 'telegram.org'
    }),
    computed: {
      currentProject () {
        return this.$store.getters['user/currentProject'];
      },
    },
    mounted () {
      this.$bus.$on('modal:links', () => {
        if (this.$refs['links']) {
          this.$refs['links'].show();
          this.isAddUtm = this.currentProject.utm.enable;
          this.utm_medium = this.currentProject.utm.utm_medium;
          this.utm_source_vk = this.currentProject.utm.utm_source_vk;
          this.utm_source_fb = this.currentProject.utm.utm_source_fb;
          this.utm_source_inst = this.currentProject.utm.utm_source_inst;
          this.utm_source_ok = this.currentProject.utm.utm_source_ok;
          this.utm_source_tg = this.currentProject.utm.utm_source_tg;
        }
      });
    },
    beforeDestroy () {
      this.$bus.$off('modal:links');
    },
    methods: {
      saveUtm () {
        let dt = {
          enable: this.isAddUtm,
          utm_medium: this.utm_medium,
          utm_source_vk: this.utm_source_vk,
          utm_source_fb: this.utm_source_fb,
          utm_source_inst: this.utm_source_inst,
          utm_source_ok: this.utm_source_ok,
          utm_source_tg: this.utm_source_tg
        };

        this.$store.dispatch('user/saveUtm', {
          project_id: this.currentProject._id,
          utm: dt
        })
          .then((res) => {
            this.$refs['links'].hide();
            this.$swal({
              title: `UTM метки сохранены`,
              type: 'success',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000
            })
          })
          .catch(e => {
            if (e.response && e.response.data.errors) this.errors = e.response.data.errors;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../variables";
  .links {
    padding: 20px;
    &__checkbox {
      margin-bottom: 10px;
    }
  }
</style>