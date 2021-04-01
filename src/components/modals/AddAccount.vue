<template>
  <b-modal ref="add-account" size="md">
    <template v-slot:modal-header-close>
      <img src="../../assets/img/icons/times.svg">
    </template>
    <template v-slot:modal-title>
      Добавить соцсеть
    </template>
    <div class="modal-info">
      Добавьте соцсети для планирования постов и сбора аналитики. Для подключения страницы вы должны быть её
      администратором.
      Обязательно предоставьте необходимые доступы, которые запросит SocialRock. Это необходимо для корректной работы
      сервиса.
    </div>
    <div class="socials">
      <div class="socials__item vk" @click="addAccount('vk')">
        <i class="fab fa-vk"></i>
      </div>
      <div class="socials__item fb">
        <i class="fab fa-facebook-f"></i>
      </div>
      <div class="socials__item ok">
        <i class="fab fa-odnoklassniki"></i>
      </div>
      <div class="socials__item tg">
        <i class="fab fa-telegram-plane"></i>
      </div>
      <div class="socials__item inst">
        <i class="fab fa-instagram"></i>
      </div>
      <div class="socials__item tw">
        <i class="fab fa-twitter"></i>
      </div>
    </div>
    <template v-slot:modal-footer>
      <div class="foot"></div>
    </template>
  </b-modal>
</template>

<script>
  export default {
    data: () => ({
      popup: {},
      checkInterval: null
    }),
    mounted () {
      this.$bus.$on('modal:add-account', () => {
        if (this.$refs['add-account']) {
          this.$refs['add-account'].show()
        }
      });
      this.$bus.$on('modal:hide-all', () => {
        if (this.$refs['add-account']) {
          this.$refs['add-account'].hide()
        }
      });
      this.$bus.$on('modal:hide-add-account', () => {
        if (this.$refs['add-account']) {
          this.$refs['add-account'].hide()
        }
      });
    },
    beforeDestroy () {
      this.$bus.$off('modal:add-account');
      this.$bus.$off('modal:hide-all');
      this.$bus.$off('modal:hide-add-account');
    },
    methods: {
      PopupCenter (url, title, w, h) {
        // Fixes dual-screen position                         Most browsers      Firefox
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var systemZoom = width / window.screen.availWidth;
        var left = (width - w) / 2 / systemZoom + dualScreenLeft
        var top = (height - h) / 2 / systemZoom + dualScreenTop
        var newWindow = window.open(url, title, 'scrollbars=no, menubar=no, width=' + w / systemZoom + ', height=' + h / systemZoom + ', top=' + top + ', left=' + left);

        // Puts focus on the newWindow
        if (window.focus) newWindow.focus();
        return newWindow;
      },
      createTestToken () {
        this.$store.dispatch('user/createTestToken', { token: this.testToken })
          .then((res) => {
            this.$store.dispatch('user/getVkGroups')
              .then((res) => {
                console.log(res);
              });
          })
      },
      addAccount (type) {
        // if (type === 'vk') {
        //   this.$store.dispatch('user/createTestToken', { token: this.testToken })
        //     .then((res) => {
        //       return this.$store.dispatch('user/getVkGroups')
        //     })
        //     .then((res) => {
        //       this.$bus.$emit('modal:select-account', res);
        //     })
        //     .catch(e => {
        //       this.$swal({
        //         title: `Ошибка получения страниц`,
        //         type: 'error',
        //         toast: true,
        //         position: 'top-end',
        //         showConfirmButton: false,
        //         timer: 5000
        //       })
        //     })
        // }
        const payload = JSON.stringify({
          user_id: this.$store.getters['user/user']._id,
          state: 'auth'
        });
        this.popup = this.PopupCenter(
          `https://oauth.vk.com/authorize?client_id=${process.env.VUE_APP_VK_ID_APP}&redirect_uri=https://oauth.vk.com/blank.html&scope=groups,offline,wall,stats,photos&response_type=token&state=${payload}&v=5.37&revoke=1`,
          // `https://oauth.vk.com/authorize?client_id=${process.env.VUE_APP_VK_ID_APP}&redirect_uri=${process.env.VUE_APP_VK_ID_APP_REDIRECT}&scope=groups,offline,wall,stats&response_type=code&state=${payload}&v=5.37&revoke=1`,
          'authvk',
          700,
          500
        );
        if (this.checkInterval) {
          clearInterval(this.checkInterval);
          this.checkInterval = null;
        }
        this.checkInterval = setInterval(() => {
          if (this.popup.closed) {
            this.popup = {};
            this.$store.dispatch('user/getVkGroups')
              .then((res) => {
                this.$bus.$emit('modal:select-account', res);
              });
            clearInterval(this.checkInterval);
            this.checkInterval = null;
          }
        }, 1000);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../variables";

  .socials {
    display: flex;
    flex-wrap: wrap;

    &__item {
      background-color: red;
      width: 33.333333333333%;
      height: 150px;
      font-size: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      cursor: pointer;
    }
  }

  .vk {
    background-color: $color-vk;

    &:hover {
      background-color: lighten($color-vk, 10%);
    }
  }

  .fb {
    background-color: $color-fb;

    &:hover {
      background-color: lighten($color-fb, 10%);
    }
  }

  .ok {
    background-color: $color-ok;

    &:hover {
      background-color: lighten($color-ok, 10%);
    }
  }

  .inst {
    background-color: $color-inst;

    &:hover {
      background-color: lighten($color-inst, 10%);
    }
  }

  .tw {
    background-color: $color-tw;

    &:hover {
      background-color: lighten($color-tw, 10%);
    }
  }

  .tg {
    background-color: $color-tg;

    &:hover {
      background-color: lighten($color-tg, 10%);
    }
  }

  .foot {
    height: 10px;
  }
</style>