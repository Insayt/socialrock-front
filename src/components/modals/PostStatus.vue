<template>
  <b-modal ref="post-modal-status" size="lg" no-close-on-esc no-close-on-backdrop>
    <template v-slot:modal-header-close>
      <img src="@/assets/img/icons/times.svg">
    </template>
    <template v-slot:modal-title>
      Статус поста
      <!--      <i class="fa fa-trash post-modal-trash" v-b-tooltip.hover title="Очистить форму"></i>-->
    </template>
    <div class="post-modal-status">
      <div class="status _error" v-for="e in errors">
        <div class="post-social"
             :style="{ backgroundImage: `url(${e.social_account.picture})` }"
             v-b-tooltip.hover :title="e.social_account.name"
        >
          <i v-if="e.social_account.social_type === 'vk'" class="fab fa-vk"></i>
        </div>
        <div>
          <div>
            <b>Ошибка выкладки поста!</b>
          </div>
          <div>
            <template v-if="e.type === 'vk'">
              <template v-if="e.code === 5">
                Авторизация пользователя не удалась
              </template>
              <template v-else>
                Код ошибки - {{ e.code }}
              </template>
            </template>
          </div>
        </div>
      </div>
      <div class="status _success" v-for="s in success">
        <div class="post-social"
             :style="{ backgroundImage: `url(${s.social_account.picture})` }"
             v-b-tooltip.hover :title="s.social_account.name"
        >
          <i v-if="s.social_account.social_type === 'vk'" class="fab fa-vk"></i>
        </div>
        <div>
          <div>
            <b>Пост опубликован! 🤘</b>
          </div>
          <div>
            <template v-if="s.type === 'vk'">
              Ссылка: <a :href="vkUrl(s)" target="_blank">{{ vkUrl(s) }}</a>
            </template>
          </div>
        </div>
      </div>
    </div>
    <template v-slot:modal-footer>
      <div class="w-100">

      </div>
    </template>
  </b-modal>
</template>

<script>
import data from './emoji';
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast';
import 'emoji-mart-vue-fast/css/emoji-mart.css'
import { DateTime } from 'luxon';

export default {
  components: {
    picker: Picker,
  },
  data: () => ({
    errors: [],
    success: []
  }),
  computed: {
    currentProject () {
      return this.$store.getters['user/currentProject'];
    },
    projects () {
      return this.$store.getters['user/projects'];
    },
    minDateTime () {
      return DateTime.local().toString();
    },
  },
  mounted () {
    this.$bus.$on('modal:post-status', (post) => {
      this.$nextTick(() => {
        this.errors = post.social_errors;
        this.success = post.social_success;
        this.$refs['post-modal-status'].show();
      });
    });
  },
  beforeDestroy () {
    this.$bus.$off('modal:post-status');
  },
  methods: {
    vkUrl (data) {
      return `https://vk.com/wall-${data.social_account.social_id}_${data.post_id}`;
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../variables";
.post-modal-status {
  width: 100%;
  padding: 20px;
}
.post-social {
  width: 50px;
  height: 50px;
  background-size: cover;
  margin-right: 15px;
  position: relative;
  border-radius: 4px;

  i {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 15px;
    background-color: #4680C2;
    color: white;
    padding: 2px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.status {
  position: relative;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: .25rem;
  display: flex;
  align-items: center;

  &._error {
    color: #842029;
    background-color: #f8d7da;
    border-color: #f5c2c7;

    .post-social {
      border: 1px solid #842029;
    }
  }

  &._success{
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;

    .post-social {
      border: 1px solid #155724;
    }
  }
}
</style>