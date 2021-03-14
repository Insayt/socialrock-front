<template>
  <div class="auth">
    <form class="form-auth">
      <img class="login-img-1" src="../assets/img/login-img-1.svg">
      <img class="login-img-2" src="../assets/img/login-img-2.svg">
      <div class="logo">
        <img src="../assets/img/logo.png">
        <div>SOCIAL<span>ROCK</span></div>
      </div>
      <div class="box">
        <b-tabs class="auth-tabs">
          <b-tab title="Вход" active>
            <b-form class="form-auth__form" @submit.prevent="login">
              <div class="auth__form-group">
                <b-input placeholder="Email" :class="{ 'is-invalid': errors.email }" v-model="email"></b-input>
                <div class="invalid-feedback">
                  {{ errors.email }}
                </div>
              </div>
              <div class="auth__form-group">
                <b-input type="password" placeholder="Пароль" :class="{ 'is-invalid': errors.password }" v-model="password"></b-input>
                <div class="invalid-feedback">
                  {{ errors.password }}
                </div>
              </div>
              <b-button size="lg" type="submit" variant="primary" block>Войти</b-button>
            </b-form>
          </b-tab>
          <b-tab title="Регистрация">
            <b-form class="form-auth__form" @submit.prevent="register">
              <div class="auth__form-group">
                <b-input placeholder="Email" v-model="email" :class="{ 'is-invalid': errors.email }"></b-input>
                <div class="invalid-feedback">
                  {{ errors.email }}
                </div>
              </div>
              <div class="auth__form-group">
                <b-input type="password" placeholder="Пароль" v-model="password" :class="{ 'is-invalid': errors.password }"></b-input>
                <div class="invalid-feedback">
                  {{ errors.password }}
                </div>
              </div>
              <div class="auth__form-group">
                <b-input type="password" placeholder="Повторите пароль" v-model="repeatPassword" :class="{ 'is-invalid': errors.repeatPassword }"></b-input>
                <div class="invalid-feedback">
                  {{ errors.repeatPassword }}
                </div>
              </div>
              <b-button size="lg" type="submit" variant="primary" block :disabled="loading">Зарегистрироваться</b-button>
            </b-form>
          </b-tab>
        </b-tabs>
      </div>
    </form>
  </div>
</template>

<script>
  import { DateTime } from 'luxon';
  export default {
    data: () => ({
      errors: {},
      loading: false,
      email: '',
      password: '',
      repeatPassword: ''
    }),
    computed: {
      currentProject () {
        return this.$store.getters['user/currentProject'];
      },
    },
    methods: {
      login () {
        this.loading = true;
        this.errors = {};
        let data = {
          email: this.email,
          password: this.password,
        };
        this.$store.dispatch('user/login', data)
          .then(() => {
            this.$router.push({ name: 'calendar', params: { projectId: this.$store.getters['user/currentProject'].short_id } });
          })
          .catch(e => {
            if (e.response && e.response.data.errors) this.errors = e.response.data.errors;
          })
          .finally(() => {
            this.loading = false;
          })
      },
      register () {
        this.loading = true;
        this.errors = {};
        let data = {
          email: this.email,
          password: this.password,
          repeatPassword: this.repeatPassword,
          timezone: DateTime.local().zoneName
        };
        this.$store.dispatch('user/register', data)
          .then((res) => {
            this.$router.push({ name: 'calendar', params: { projectId: res.project_id } });
          })
          .catch(e => {
            if (e.response && e.response.data.errors) this.errors = e.response.data.errors;
          })
          .finally(() => {
            this.loading = false;
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../variables";
  .auth {
    display: flex;
    align-items: center;
    justify-content: center;

    &__header {
      font-size: 28px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 15px;
    }

    &__form-group {
      margin-bottom: 10px;
    }

    .btn {
      margin-top: 25px;
    }
  }
  .form-auth {
    width: 410px;
    margin-top: 100px;
    position: relative;

    &__form {
      width: 100%;
    }
  }
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 50px;
    color: white;
    margin-bottom: 30px;

    img {
      width: 45px;
      margin-right: 15px;
    }
    span {
      color: $color-warning;
    }
  }
  .login-img-1 {
    position: absolute;
    left: -190px;
    top: 120px;
    z-index: -1;
    opacity: 0.5;
  }
  .login-img-2 {
    position: absolute;
    right: -187px;
    top: 120px;
    z-index: -1;
    opacity: 0.5;
  }
</style>