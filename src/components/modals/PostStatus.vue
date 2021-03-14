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
          {{ e.error_msg }}
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
        this.$refs['post-modal-status'].show();
      });
    });
  },
  beforeDestroy () {
    this.$bus.$off('modal:post-status');
  },
  methods: {
    handleFileUpload () {

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
  }
}
</style>