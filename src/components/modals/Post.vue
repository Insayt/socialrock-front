<template>
  <b-modal ref="post-modal" size="lg" no-close-on-esc no-close-on-backdrop>
    <template v-slot:modal-header-close>
      <img src="@/assets/img/icons/times.svg">
    </template>
    <template v-slot:modal-title>
      Создание поста {{ isOld }}
<!--      <i class="fa fa-trash post-modal-trash" v-b-tooltip.hover title="Очистить форму"></i>-->
    </template>
    <div class="post-modal">
      <b-tabs>
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
          <!--<b-button variant="black" v-b-tooltip.hover>-->
          <!--Выбрать все-->
          <!--</b-button>-->
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
                  :style="{ backgroundImage: 'url(' + item.src + ')' }"
              >
                <div class="media-item__close" @click="deleteMedia(index)">
                  <i class="fas fa-times"></i>
                </div>
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
                      v-b-tooltip.hover title="Фото из редактора">
              <i class="fas fa-paint-brush"></i>
            </b-button>
<!--            <b-button variant="link" v-b-tooltip.hover title="Геолокация">-->
<!--              <i class="fas fa-map-marker-alt"></i>-->
<!--            </b-button>-->
<!--            <b-button variant="link" v-b-tooltip.hover title="Опрос">-->
<!--              <i class="fas fa-list-ul"></i>-->
<!--            </b-button>-->
          </div>
<!--          <b-button variant="black" block class="mt-3">-->
<!--            Добавить версию для некоторых страниц-->
<!--          </b-button>-->
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
<!--          <div class="post-editor__date">-->
<!--            <div class="post-editor__date-text">-->
<!--              <b-form-checkbox-->
<!--                v-model="isAutoDelete"-->
<!--              >-->
<!--                Автоудаление-->
<!--              </b-form-checkbox>-->
<!--            </div>-->
<!--            <div v-if="isAutoDelete">-->
<!--              <datetime type="datetime"-->
<!--                        class="theme-dark"-->
<!--                        title="Дата и время автоудаления:"-->
<!--                        placeholder="Дата и время"-->
<!--                        v-model="deleteDt"-->
<!--                        :value-zone="currentProject.timezone"-->
<!--                        :zone="currentProject.timezone"-->
<!--                        :phrases="{ok: 'Ок', cancel: 'Отмена'}"-->
<!--                        :min-datetime="runDt"-->
<!--              ></datetime>-->
<!--            </div>-->
<!--          </div>-->
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
    </div>
    <template v-slot:modal-footer>
      <div class="w-100">
<!--        <div class="float-left">-->
<!--          <b-dropdown class="dropdown-calendar" variant="black" toggle-class="text-decoration-none" no-caret>-->
<!--            <template v-slot:button-content>-->
<!--              Рубрика <i class="fas fa-chevron-down ml-2"></i>-->
<!--            </template>-->
<!--            <b-dropdown-text>-->
<!--              123-->
<!--            </b-dropdown-text>-->
<!--          </b-dropdown>-->
<!--        </div>-->
        <div class="float-right">
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
<!--        <b-button-->
<!--          variant="black"-->
<!--          class="float-right mr-3"-->
<!--        >-->
<!--          Отмена-->
<!--        </b-button>-->
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
      this.$bus.$on('modal:post', (post) => {
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
      this.$bus.$on('image:upload', (data) => {
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
    },
    beforeDestroy () {
      this.$bus.$off('modal:post');
      this.$bus.$off('image:upload');
    },
    methods: {
      handleFileUpload () {
        let file = this.$refs.file.files[0];
        if (file.size > 15728640) {
          this.$swal({
            title: `Ошибка`,
            html: `Максимальный размер файла 15 мегабайт`,
            type: 'error'
          });
          return;
        }

        console.log(file);
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

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = (e) => {
          this.$bus.$emit('modal:crop', { file: e.target.result, firstMedia: this.media[0] });
        };
      },
      createVideo (video) {
        let fd = new FormData();
        fd.append('file', video);
        this.$store.dispatch('user/savePostVideo', {
          project_id: this.currentProject._id,
          file: fd
        })
          .then((res) => {
            this.$bus.$emit('modal:crop', { file: res.preview, firstMedia: this.media[0] });
            console.log(res);
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

  .post-editor-delete {
    margin-right: 10px;
  }
</style>