<template>
  <b-modal ref="post-modal-status" size="lg">
    <template v-slot:modal-header-close>
      <img src="@/assets/img/icons/times.svg">
    </template>
    <template v-slot:modal-title>
      Статус поста
    </template>
    <div class="post-modal-status">
      <div class="status"
           v-for="tsk in tasks"
           :class="{
             _error: tsk.status === 'error',
             _success: tsk.status === 'success',
             _pending: tsk.status === 'pending',
           }"
      >
        <div class="post-social"
             :style="{ backgroundImage: `url(${tsk.social_account.picture})` }"
             v-b-tooltip.hover :title="tsk.social_account.name"
        >
          <i v-if="tsk.social_account.social_type === 'vk'" class="fab fa-vk"></i>
        </div>
        <div>
          <div>
            <b v-if="tsk.status === 'error'">Ошибка выкладки поста!</b>
            <b v-if="tsk.status === 'success'">Пост опубликован! 🤘</b>
            <b v-if="tsk.status === 'pending'">Пост публикуется...</b>
          </div>
          <div>
            <div v-if="tsk.status === 'success'">
              <template v-if="s.type === 'vk'">
                Ссылка: <a :href="vkUrl(s)" target="_blank">{{ vkUrl(s) }}</a>
              </template>
            </div>
            <div v-if="tsk.status === 'error'">
              <template v-if="tsk.type === 'vk'">
                <template v-if="tsk.error && tsk.error.code ">
                  <template v-if="tsk.error.code === 5">
                    Авторизация пользователя не удалась
                  </template>
                  <template v-if="tsk.error.code  === 15">
                    Ошибка доступа. Перейдите в настройки, удалите эту страницу и заведите её заново
                  </template>
                  <template v-else>
                    Код ошибки - {{ tsk.code }}
                  </template>
                </template>
              </template>
            </div>
            <div class="post-modal-status__reboot" v-if="tsk.status === 'error'"  >
              <b-button size="sm" variant="info">
                Выложить еще раз
              </b-button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="post">
        <div v-if="post.text" class="status-section">
          <div class="status-subtitle">
            Текст поста:
          </div>
          <b-form-textarea
              v-model="post.text"
              placeholder="Нет текста"
              rows="7"
              no-resize
              wrap
              :disabled="true"
          ></b-form-textarea>
        </div>
        <div v-if="post.media && post.media.length" class="status-section">
          <div class="status-subtitle">
            Медиа:
          </div>
          <div class="media">
            <div
                class="media-item"
                v-for="(item, index) in post.media"
                :style="{ backgroundImage: getMediaPreview(item) }"
                @click="showPreviewMedia(item)"
            >
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-slot:modal-footer>
      <div class="w-100">

      </div>
    </template>
    <preview-media v-if="previewMedia" :media="previewMedia" @close="previewClose"></preview-media>
  </b-modal>
</template>

<script>
import data from './emoji';
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast';
import 'emoji-mart-vue-fast/css/emoji-mart.css'
import { DateTime } from 'luxon';
import PreviewMedia from '@/components/modals/PreviewMedia';

export default {
  components: {
    picker: Picker,
    PreviewMedia,
  },
  data: () => ({
    post: null,
    previewMedia: null,
    tasks: [],
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
        const tasksKeys = Object.keys(post.tasks);
        for (let key of tasksKeys) {
          post.tasks[key].social_account = post.social_accounts.find(acc => acc._id === key);
        }
        this.tasks = Object.values(post.tasks);
        this.post = post;
        this.$refs['post-modal-status'].show();
      });
    });
  },
  beforeDestroy () {
    this.$bus.$off('modal:post-status');
  },
  methods: {
    showPreviewMedia (media) {
      this.previewMedia = media;
    },
    previewClose () {
      this.previewMedia = null;
    },
    getMediaPreview (media) {
      if (media.type === 'video') return 'url(' + media.preview + ')';
      return 'url(' + media.src + ')';
    },
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

  &__reboot {
    margin-top: 5px;
  }
}
.status-subtitle {
  font-weight: bold;
  margin-bottom: 10px;
}
.status-section {
  margin-bottom: 10px;
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

  &._pending{
    color: #084298;
    background-color: #cfe2ff;
    border-color: #b6d4fe;

    .post-social {
      border: 1px solid #155724;
    }
  }
}
.media {
  display: flex;
  flex-wrap: wrap;
}

.media-item {
  display: block;
  width: 141px;
  height: 141px;
  background-position: center;
  background-size: cover;
  background-color: $color-bg-0;
  margin-right: 10px;
  margin-bottom: 10px;
  position: relative;
  border: 5px solid $color-bg-9;
  border-radius: 3px;
  cursor: pointer;

  &:nth-child(5n) {
    margin-right: 0;
  }

  &__close {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 15px;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $color-danger;
    color: white;
    padding: 15px;
    cursor: pointer;
    border-radius: 3px;

    &:hover {
      background-color: $color-danger-hover;
    }
  }
}
</style>