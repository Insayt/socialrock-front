<template>
  <b-modal ref="add-account" size="md">
    <template v-slot:modal-header-close>
      <img src="../../assets/img/icons/times.svg">
    </template>
    <template v-slot:modal-title>
      Добавить соцсеть
    </template>
    <div class="add-account">
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
    <modal-select-account></modal-select-account>
  </b-modal>
</template>

<script>
  import ModalSelectAccount from './SelectAccount';
  export default {
    components: {
      ModalSelectAccount
    },
    data: () => ({
      testToken: 'e09725369ada0bc39ccd57281f8430e9fd75bb4df36fa725e9586d25234d17a67ec3c9c5d7080aba1fb2f',
      popup: {},
      checkInterval: null
    }),
    mounted () {
      this.$bus.$on('modal:add-account', () => {
        this.$refs['add-account'].show()
      });
      this.$bus.$on('modal:hide-all', () => {
        this.$refs['add-account'].hide()
      });
    },
    beforeDestroy () {
      this.$bus.$off('modal:add-account')
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
        if (type === 'vk') {
          this.$store.dispatch('user/createTestToken', { token: this.testToken })
            .then((res) => {
              this.$store.dispatch('user/getVkGroups')
                .then((res) => {
                  console.log(res);
                  this.$bus.$emit('modal:select-account', res);
                });
            })
        }
        // const payload = JSON.stringify({
        //   user_id: this.$store.getters['user/user']._id,
        //   state: 'auth'
        // });
        // this.popup = this.PopupCenter(
        //   `https://oauth.vk.com/authorize?client_id=${process.env.VUE_APP_VK_ID_APP}&redirect_uri=https://oauth.vk.com/blank.html&scope=groups,offline,wall,stats&response_type=token&state=${payload}&v=5.37&revoke=1`,
        //   'authvk',
        //   700,
        //   500
        // );
        // if (this.checkInterval) {
        //   clearInterval(this.checkInterval);
        //   this.checkInterval = null;
        // }
        // this.checkInterval = setInterval(() => {
        //   if (this.popup.closed) {
        //     this.popup = {};
        //     this.$store.dispatch('user/getVkGroups')
        //       .then((res) => {
        //         console.log(res);
        //         // res.forEach((r) => {
        //         //   if (this.vk.groups && this.vk.groups.length) {
        //         //     const ids = this.vk.groups.map(g => {
        //         //       if (g.access_token) return g.id;
        //         //     });
        //         //     if (ids.includes(r.id)) r.selected = true;
        //         //   }
        //         // });
        //         // this.localGroups = res;
        //         // this.$refs['vk-group-modal'].show();
        //         // https://www.facebook.com/v5.0/dialog/oauth?response_type=token&display=popup&client_id=545910552866235&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer%2Fcallback&scope=
        //       });
        //     clearInterval(this.checkInterval);
        //     this.checkInterval = null;
        //   }
        // }, 1000);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../variables";

  .add-account {
    padding: 20px;
    background-color: $color-bg-2;
    color: $color-font-gray;
  }

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