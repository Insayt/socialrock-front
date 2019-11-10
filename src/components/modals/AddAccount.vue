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
  </b-modal>
</template>

<script>
  export default {
    data: () => ({
      popup: {}
    }),
    mounted () {
      this.$bus.$on('modal:add-account', () => {
        this.$refs['add-account'].show()
      })
    },
    methods: {
      addAccount (type) {
        const payload = JSON.stringify({
          user_id: this.$store.getters['user/user']._id,
          state: 'auth'
        });
        this.popup = this.PopupCenter(
          `https://oauth.vk.com/authorize?client_id=${process.env.VUE_APP_VK_ID_APP}&redirect_uri=${process.env.VUE_APP_VK_ID_APP_REDIRECT}&display=popup&scope=groups,offline&response_type=code&state=${payload}&v=5.101`,
          'authvk',
          450,
          400
        );
        if (this.checkInterval) {
          clearInterval(this.checkInterval);
          this.checkInterval = null;
        }
        // this.checkInterval = setInterval(() => {
        //   if (this.popup.closed) {
        //     this.popup = {};
        //     this.$store.dispatch('user/getVkGroups')
        //       .then((res) => {
        //         res.forEach((r) => {
        //           if (this.vk.groups && this.vk.groups.length) {
        //             const ids = this.vk.groups.map(g => {
        //               if (g.access_token) return g.id;
        //             });
        //             if (ids.includes(r.id)) r.selected = true;
        //           }
        //         });
        //         this.localGroups = res;
        //         this.$refs['vk-group-modal'].show();
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