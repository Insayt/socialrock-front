<template>
  <b-modal ref="post-modal" size="lg" no-close-on-esc no-close-on-backdrop>
    <template v-slot:modal-header-close>
      <img src="@/assets/img/icons/times.svg">
    </template>
    <template v-slot:modal-title>
      <template  v-if="status !== 'new'">
        Статус поста
      </template>
      <template v-else>
        <template v-if="postId">
          Редактирование поста
        </template>
        <template v-else>
          Создание поста
        </template>
      </template>
<!--      <i class="fa fa-trash post-modal-trash" v-b-tooltip.hover title="Очистить форму"></i>-->
    </template>
    <div class="post-modal">
      <b-tabs v-if="status === 'new'">
        <b-tab title="Пост" active>
          <div class="post-modal__networks" v-if="accounts.length">
            <div class="network"
                 v-for="(account, index) in accounts"
                 :style="{ backgroundImage: `url(${account.picture})` }"
                 :class="{ _active: account.checked }"
                 @click="checkAccount(account, index)"
                 v-b-tooltip.hover :title="account.name"
            >
              <div class="network__bg">
                <div class="network__check">
                  <i class="fas fa-check"></i>
                </div>
              </div>
              <div v-if="account.social_type === 'vk'"
                   class="network__icon"
                   style="background-color: rgb(70, 128, 194);">
                <i class="fab fa-vk"></i>
              </div>
            </div>
            <div class="network-add" v-b-tooltip.hover.right title="Подключить страницу">
              <i class="fas fa-plus"></i>
            </div>
          </div>
          <div class="post-editor">
            <b-form-textarea
              v-model="text"
              placeholder="Текст поста"
              rows="7"
              no-resize
              wrap
            ></b-form-textarea>
            <div class="post-editor__emoji">
              <b-dropdown class="clean-dropdown" variant="link" v-b-tooltip.hover title="Emoji" no-caret ref="emojidropdown">
                <template v-slot:button-content>
                  <i class="far fa-smile"></i>
                </template>
                <b-dropdown-group>
                  <picker :data="emojiIndex" :native="true" :show-search="false" @select="selectEmoji" title=""/>
                </b-dropdown-group>
              </b-dropdown>
            </div>
            <div class="media">
              <div class="media-item" v-for="(item, index) in media"
                  :style="{ backgroundImage: getMediaPreview(item) }"
                   @click="showPreviewMedia(item)"
              >
                <div class="media-item__close" v-b-tooltip.hover title="Удалить" @click.stop="deleteMedia(index)">
                  <i class="fas fa-times"></i>
                </div>
              </div>
              <div class="media-item _load" v-show="loadMedia">
                <i class="fas fa-spinner fa-spin"></i>
              </div>
            </div>
<!--            <b-dropdown class="clean-dropdown" variant="link" v-b-tooltip.hover title="Ссылка" no-caret>-->
<!--              <template v-slot:button-content>-->
<!--                <i class="fas fa-link"></i>-->
<!--              </template>-->
<!--              <b-dropdown-group>-->
<!--                <b-input placeholder="Вставьте ссылку" v-model="link"></b-input>-->
<!--              </b-dropdown-group>-->
<!--            </b-dropdown>-->
            <label class="input-file" for="file">
              <div class="btn btn-link"
                   :class="{ disabled: media.length === 10 }"
                   v-b-tooltip.hover title="Фото или видео"
              >
                <i class="fas fa-photo-video"></i>
              </div>
              <input id="file"
                     type="file"
                     accept=".jpg,.jpeg,.png, video/*"
                     hidden
                     ref="file"
                     @change="handleFileUpload"
                     :disabled="media.length === 10"
              />
            </label>
            <b-button variant="link"
                      :disabled="media.length === 10"
                      v-b-tooltip.hover title="Фото из редактора"
                      @click="showEditorPhoto"
            >
              <i class="fas fa-paint-brush"></i>
            </b-button>
<!--            <b-button variant="link" v-b-tooltip.hover title="Геолокация">-->
<!--              <i class="fas fa-map-marker-alt"></i>-->
<!--            </b-button>-->
<!--            <b-button variant="link" v-b-tooltip.hover title="Опрос">-->
<!--              <i class="fas fa-list-ul"></i>-->
<!--            </b-button>-->
          </div>
          <div class="post-editor__date">
            <div class="post-editor__date-text">Дата публикации</div>
            <div>
              <datetime type="datetime"
                        class="theme-dark"
                        title="Дата и время публикации:"
                        placeholder="Дата и время"
                        v-model="runDt"
                        :value-zone="currentProject.timezone"
                        :zone="currentProject.timezone"
                        :phrases="{ok: 'Ок', cancel: 'Отмена'}"
                        :min-datetime="minDateTime"
              ></datetime>
            </div>
            <div class="post-editor__timezone"
            >
              {{ currentProject.timezone }}
              <i class="fas fa-info-circle"
                 v-b-popover.hover.top="{ variant: 'info',  content: `Что бы сменить часовой пояс, перейдите в Настройки -> Часовой пояс` }"
                 :title="`Текущий часовой пояс ${currentProject.timezone}`"
              ></i>
            </div>
          </div>
          <!--<div class="post-editor__info">-->
          <!--<div class="post-editor__info-emoji">❓</div>-->
          <!--<div>-->
          <!--<div class="post-editor__info-title">-->
          <!--Совет-->
          <!--</div>-->
          <!--<div class="post-editor__info-text">-->
          <!--123123-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
        </b-tab>
        <b-tab title="Сторис">
          Tab Contents 1
        </b-tab>
      </b-tabs>

      <div class="post-modal-status" v-if="status !== 'new'">
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

        <!--      <div v-if="post">-->
        <!--        <div v-if="post.text" class="status-section">-->
        <!--          <div class="status-subtitle">-->
        <!--            Текст поста:-->
        <!--          </div>-->
        <!--          <b-form-textarea-->
        <!--              v-model="post.text"-->
        <!--              placeholder="Нет текста"-->
        <!--              rows="7"-->
        <!--              no-resize-->
        <!--              wrap-->
        <!--              :disabled="true"-->
        <!--          ></b-form-textarea>-->
        <!--        </div>-->
        <!--        <div v-if="post.media && post.media.length" class="status-section">-->
        <!--          <div class="status-subtitle">-->
        <!--            Медиа:-->
        <!--          </div>-->
        <!--          <div class="media">-->
        <!--            <div-->
        <!--                class="media-item"-->
        <!--                v-for="(item, index) in post.media"-->
        <!--                :style="{ backgroundImage: getMediaPreview(item) }"-->
        <!--                @click="showPreviewMedia(item)"-->
        <!--            >-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--      </div>-->
      </div>
    </div>

    <template v-slot:modal-footer>
      <div class="w-100">
        <div class="float-left" v-if="status === 'new'">
          <b-dropdown class="dropdown-calendar" variant="black" toggle-class="text-decoration-none" no-caret>
            <template v-slot:button-content>
              Рубрика <i class="fas fa-chevron-down ml-2"></i>
            </template>
            <b-dropdown-text>
              123
            </b-dropdown-text>
          </b-dropdown>
        </div>
        <div class="float-right" v-if="status === 'new'">
          <b-button
            class="post-editor-delete"
            variant="danger"
            @click="deletePost"
            v-if="postId"
          >
            Удалить пост
          </b-button>
          <b-button
            variant="primary"
            @click="savePost"
            v-if="!postId"
          >
            Запланировать
          </b-button>
          <b-button
            variant="primary"
            @click="savePost"
            v-if="postId && status === 'new'"
          >
            Сохранить
          </b-button>
        </div>
      </div>
    </template>

    <b-modal ref="photo-editor" size="lg">
      <template v-slot:modal-header-close>
        <img src="../../assets/img/icons/times.svg">
      </template>
      <template v-slot:modal-title>
        🤘 Ваши дизайны
      </template>
      <div class="editor">
        <div class="editor__empty" v-if="!currentProject.designs.length">
          Вы еще не создали ни одного дизайна
        </div>
        <div class="editor__items" v-if="currentProject.designs.length">
          <div class="editor-item"
               v-for="d in currentProject.designs"
               @click="selectDesign(d)"
          >
            <div class="editor-item__img">
              <div class="editor-item__type"
                   :class="{
                  _square: d.format === 'square',
                  _horizontal: d.format === 'horizontal',
                  _vertical: d.format === 'vertical',
                  _stories: d.format === 'stories',
                 }"
                   :style="{ backgroundImage: `url(${d.image_url})` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <template v-slot:modal-footer>
        <div class="w-100"></div>
      </template>
    </b-modal>

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
      PreviewMedia
    },
    data: () => ({
      emojiIndex: new EmojiIndex(data),
      text: '',
      link: '',
      accounts: [],
      isAutoDelete: false,
      runDt: '',
      deleteDt: '',
      calendarOptions: [],
      media: [],
      postId: null,
      status: 'new',
      isOld: false, // Дата поста уже прошла значит нельзя редактировать
      previewMedia: null,
      loadMedia: false,
      tasks: [], // Задачи на выкладку внутри поста
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
    sockets: {
      updatePost(data) {
        console.log(111, data);
      }
    },
    mounted () {
      this.$bus.$on('modal:post', (post) => {
        const tasksKeys = Object.keys(post.tasks);
        for (let key of tasksKeys) {
          post.tasks[key].social_account = post.social_accounts.find(acc => acc._id === key);
        }
        this.tasks = Object.values(post.tasks);
        this.isOld = false;
        this.$nextTick(() => {
          if (!post._id) {
            this.status = 'new';
            this.postId = null;
            let copyAccounts = Array.from(this.$store.getters['user/currentProject'].social_accounts);
            this.accounts = copyAccounts.map(a => {
              a.checked = true;
              return a;
            });
            if (post.run_dt) {
              this.runDt = DateTime.fromISO(post.run_dt).toString();
            } else {
              this.runDt = DateTime.local().setZone(this.currentProject.timezone).set({seconds: 0, milliseconds: 0}).toString();
            }
            this.media = [];
            this.text = '';
          } else {
            // this.$router.push({ name: this.$route.name, params: { postId: post._id } });
            this.status = post.status;
            this.text = post.text;
            this.media = post.media || [];
            this.postId = post._id;
            let copyAccounts = Array.from(this.$store.getters['user/currentProject'].social_accounts);
            this.runDt = DateTime.fromISO(post.run_dt).toString();
            if (DateTime.local().toMillis() > DateTime.fromISO(post.run_dt).toMillis()) {
              this.isOld = true;
            }
            this.accounts = copyAccounts.map(a => {
              let isCheck = false;
              post.social_accounts.forEach(acc => {
                if (acc._id === a._id) isCheck = true;
              });
              a.checked = isCheck;
              return a;
            });
          }
          this.$refs['post-modal'].show();
        });
      });
    },
    beforeDestroy () {
      this.$bus.$off('modal:post');
      this.$bus.$off('video:cropped');
    },
    methods: {
      getMediaPreview (media) {
        if (media.type === 'video') return 'url(' + media.preview + ')';
        return 'url(' + media.src + ')';
      },
      previewClose () {
        this.previewMedia = null;
      },
      showPreviewMedia (media) {
        this.previewMedia = media;
      },
      selectDesign (design) {
        const size = {};
        let ratio = 0;

        if (!design.image_url.includes('http')) {
          design.image_url = `http://localhost:8080${design.image_url}`;
        }

        if (design.format === 'square') {
          size.width = 1080;
          size.height = 1080;
          ratio = 1;
        }
        this.media.push({
          type: 'image',
          size: size,
          ratio: ratio,
          src: design.image_url
        });
        this.$refs['photo-editor'].hide();
      },
      showEditorPhoto () {
        this.$refs['photo-editor'].show();
      },
      handleFileUpload () {
        let file = this.$refs.file.files[0];
        if (file.size > 52428800) {
          this.$swal({
            title: `Ошибка`,
            html: `Максимальный размер файла 50 мегабайт`,
            type: 'error'
          });
          return;
        }
        if (file.type.indexOf('video') !== -1) {
          this.createVideo(file);
        } else {
          this.createImage(file);
        }
      },
      createImage (file) {
        // if (this.stories) {
        //   this.aspectRatio = 9 / 16;
        // }
        this.loadMedia = true;
        let fd = new FormData();
        fd.append('file', file);
        this.$store.dispatch('user/savePostImage', {
          project_id: this.currentProject._id,
          file: fd
        })
        .then(data => {
          this.media.push({
            type: 'image',
            size: {
              width: data.meta.width,
              height: data.meta.height,
            },
            ratio: data.ratio,
            src: data.image_url
          })
        })
        .finally(() => {
          this.loadMedia = false;
        })
      },
      createVideo (video) {
        this.loadMedia = true;
        let fd = new FormData();
        fd.append('file', video);
        this.$store.dispatch('user/savePostVideo', {
          project_id: this.currentProject._id,
          file: fd
        })
        .then((data) => {
          this.media.push({
            type: 'video',
            src: data.file_url,
            preview: data.preview_url
          })
        })
        .finally(() => {
          this.loadMedia = false;
        })
      },
      selectEmoji (emoji) {
        this.text += emoji.native;
        this.$refs['emojidropdown'].hide(true)
      },
      checkAccount (account, index) {
        let acc = this.accounts[index];
        acc.checked = !acc.checked;
        this.$set(this.accounts, index, acc);
      },
      deleteMedia (index) {
        this.media.splice(index, 1);
      },
      savePost () {
        let postData = {
          social_accounts: this.accounts.filter(acc => {
            if (acc.checked) return acc._id;
          }),
          text: this.text,
          project_id: this.currentProject._id,
          run_dt: this.runDt,
          media: this.media
        };
        if (this.postId) {
          postData.post_id = this.postId;
        }
        if (this.deleteDt) {
          postData.delete_dt = this.deleteDt;
        }
        this.$store.dispatch('user/savePost', postData)
          .then((res) => {
            this.$swal({
              title: `Пост сохранен`,
              type: 'success',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000
            });
            this.$refs['post-modal'].hide();
            this.$bus.$emit('calendar:reload');

            // Сбрасываем данные на дефолт, т.к. окно не пересоздается
            this.text = '';
            this.link = '';
            let copyAccounts = Array.from(this.$store.getters['user/currentProject'].social_accounts);
            this.accounts = copyAccounts.map(a => {
              a.checked = true;
              return a;
            });
            this.runDt = DateTime.local().setZone(this.currentProject.timezone).set({seconds: 0, milliseconds: 0}).toString();
            // this.$router.push({ name: 'calendar', params: { projectId: res.project_id } });
          })
      },

      deletePost () {
        this.$swal({
          title: `Удалить пост?`,
          html: `Пост будет удален навсегда. Собранная по нему аналитика сохранится`,
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Удалить',
          cancelButtonText: 'Отмена',
        }).then(res => {
          if (res.value) {
            this.$store.dispatch('user/deletePost', {
              post_id: this.postId,
              project_id: this.currentProject._id
            })
            .then(res => {
              this.$swal({
                title: `Пост удален`,
                type: 'success',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000
              });
              this.$bus.$emit('calendar:reload');
              this.$refs['post-modal'].hide();
            });
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../variables";
  .editor {
    padding: 20px;

    &__empty {
      padding: 20px;
      border-radius: 10px;
      background-color: $color-bg-3;
      color: $color-font-gray;
      margin-bottom: 20px;
    }

    &__items {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 15px;
    }
  }

  .editor-item {
    margin-right: 15px;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
    position: relative;

    &:hover {
      .editor-item__img {
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
      }
    }

    &__delete {
      display: none;
      position: absolute;
      right: 0;
      top: 0;
      color: $color-danger;
      padding: 10px;
      background-color: $color-bg-0;
      font-size: 14px;
      border-radius: 0 0 0 5px;
    }

    &__img {
      width: 230px;
      height: 230px;
      background-color: $color-bg-4;
      margin-bottom: 10px;
      transition: all 0.2s;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__title {
      font-weight: normal;
      font-size: 16px;
    }

    &__type {
      background-color: white;
      background-size: cover;
      background-position: center;

      &._square {
        width: 230px;
        height: 230px;
      }

      &._horizontal {
        width: 250px;
        height: 140px;
      }

      &._vertical {
        width: 140px;
        height: 200px;
      }

      &._stories {
        width: 130px;
        height: 250px;
      }
    }
  }

  .post-editor {
    background-color: $color-bg-4;
    padding: 10px;
    position: relative;

    textarea {
      padding-right: 40px;
    }

    textarea:focus {
      box-shadow: none;
      outline: none;
    }

    &__emoji {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    &__date {
      display: flex;
      margin: 20px 0;
      align-items: center;
      min-height: 46px;
      user-select: none;
    }

    &__date-text {
      margin-right: 20px;
      min-width: 150px;
    }

    &__timezone {
      font-size: 14px;
      margin-left: 20px;
      color: $color-font-gray;

      .fas {
        margin-left: 5px;
        color: $color-info;
      }
    }

    &__info {
      //border-top: 1px solid $color-success;
      //border-bottom: 1px solid $color-success;
      background-color: rgba($color-success, 0.1);
      color: lighten($color-success, 10%);
      padding: 20px;
      width: calc(100% + 32px);
      margin-left: -16px;
      display: flex;

    }

    &__info-emoji {
      font-size: 60px;
      margin-right: 10px;
    }

    &__info-title {
      font-size: 24px;
    }
  }

  .media {
    display: flex;
    flex-wrap: wrap;
  }
  .media-item {
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

    &:nth-child(5n) {
      margin-right: 0;
    }

    &__close {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $color-danger;
      color: white;
      cursor: pointer;
      border-radius: 3px;
      font-size: 14px;

      &:hover {
        background-color: $color-danger-hover;
      }
    }

    &._load {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40px;
      background-color: $color-bg-9;
    }
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

  .post-editor-delete {
    margin-right: 10px;
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

  .post-modal-status {
    width: 100%;
    padding: 20px;

    &__reboot {
      margin-top: 5px;
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
  }
</style>