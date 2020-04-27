<template>
  <b-modal ref="post-modal" size="lg">
<!--    no-close-on-esc no-close-on-backdrop-->
    <template v-slot:modal-header-close>
      <img src="@/assets/img/icons/times.svg">
    </template>
    <template v-slot:modal-title>
      Создание поста
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
                   v-b-tooltip.hover title="Фото или видео"
              >
                <i class="fas fa-photo-video"></i>
              </div>
              <input id="file"
                     type="file"
                     accept=".jpg,.jpeg,.png"
                     hidden
                     ref="file"
                     @change="handleFileUpload"
              />
            </label>
            <b-button variant="link" v-b-tooltip.hover title="Фото из редактора">
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
          <div class="post-editor__date">
            <div class="post-editor__date-text">
              <b-form-checkbox
                v-model="isAutoDelete"
              >
                Автоудаление
              </b-form-checkbox>
            </div>
            <div v-if="isAutoDelete">
              <datetime type="datetime"
                        class="theme-dark"
                        title="Дата и время автоудаления:"
                        placeholder="Дата и время"
                        v-model="deleteDt"
                        :value-zone="currentProject.timezone"
                        :zone="currentProject.timezone"
                        :phrases="{ok: 'Ок', cancel: 'Отмена'}"
                        :min-datetime="runDt"
              ></datetime>
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
    </div>
    <template v-slot:modal-footer>
      <div class="w-100">
        <div class="float-left">
          <b-dropdown class="dropdown-calendar" variant="black" toggle-class="text-decoration-none" no-caret>
            <template v-slot:button-content>
              Рубрика <i class="fas fa-chevron-down ml-2"></i>
            </template>
            <b-dropdown-text>
              123
            </b-dropdown-text>
          </b-dropdown>
        </div>
        <b-button
          variant="primary"
          class="float-right"
          @click="savePost"
        >
          Запланировать
        </b-button>
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
      this.$bus.$on('modal:post', (data) => {
        this.$nextTick(() => {
          this.$refs['post-modal'].show();
          let copyAccounts = Array.from(this.$store.getters['user/currentProject'].social_accounts);
          this.accounts = copyAccounts.map(a => {
            a.checked = true;
            return a;
          });
          this.runDt = DateTime.local().setZone(this.currentProject.timezone).set({seconds: 0, milliseconds: 0}).toString();
        });
      })
    },
    beforeDestroy () {
      this.$bus.$off('modal:post')
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

        if (file.type.indexOf('video') !== -1) {
          // this.createVideo(files[0]);
        } else {
          this.createImage(file);
        }
        // let fd = new FormData();
        // fd.append('file', file);
        // this.$store.dispatch('user/uploadPattern', {
        //   project_id: this.currentProject._id,
        //   form_data: fd
        // }).then(() => {
        //   this.$swal({
        //     title: `Текстура загружена`,
        //     type: 'success',
        //     toast: true,
        //     position: 'top-end',
        //     showConfirmButton: false,
        //     timer: 5000
        //   });
        // }).catch(() => {
        //   this.$swal({
        //     title: `Ошибка загрузки`,
        //     type: 'error',
        //     toast: true,
        //     position: 'top-end',
        //     showConfirmButton: false,
        //     timer: 5000
        //   });
        // }).finally(() => {
        //   this.patternLoading = false;
        // })
      },
      createImage (file) {
        // if (this.stories) {
        //   this.aspectRatio = 9 / 16;
        // }

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = (e) => {
          this.$bus.$emit('modal:crop', e.target.result);
        };
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
      savePost () {
        let postData = {
          social_accounts: this.accounts.filter(acc => {
            if (acc.checked) return acc._id;
          }),
          text: this.text,
          project_id: this.currentProject._id,
          run_dt: this.runDt
        };
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
          // .catch(e => {
          //   if (e.response && e.response.data.errors) this.errors = e.response.data.errors;
          // })
          // .finally(() => {
          //   this.loading = false;
          // })
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
</style>