<template>
  <b-modal ref="post-modal" size="lg" no-close-on-esc no-close-on-backdrop>
    <template v-slot:modal-header-close>
      <img src="@/assets/img/icons/times.svg">
    </template>
    <template v-slot:modal-title>
      Создание поста
      <i class="fa fa-trash post-modal-trash" v-b-tooltip.hover title="Очистить форму"></i>
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
              <b-button variant="link" v-b-tooltip.hover title="Emoji">
                <i class="far fa-smile"></i>
              </b-button>
            </div>
            <b-button variant="link" v-b-tooltip.hover title="Ссылка">
              <i class="fas fa-link"></i>
            </b-button>
            <b-button variant="link" v-b-tooltip.hover title="Фото или видео">
              <i class="fas fa-photo-video"></i>
            </b-button>
            <b-button variant="link" v-b-tooltip.hover title="Фото из редактора">
              <i class="fas fa-paint-brush"></i>
            </b-button>
            <b-button variant="link" v-b-tooltip.hover title="Геолокация">
              <i class="fas fa-map-marker-alt"></i>
            </b-button>
            <b-button variant="link" v-b-tooltip.hover title="Опрос">
              <i class="fas fa-list-ul"></i>
            </b-button>
          </div>
          <b-button variant="black" block class="mt-3">
            Добавить версию для некоторых страниц
          </b-button>
          <div class="post-editor__date">
            <div class="post-editor__date-text">Дата публикации</div>
            <div>
              <b-dropdown class="dropdown-calendar" variant="black" toggle-class="text-decoration-none" no-caret>
                <template v-slot:button-content>
                  10 января 2019
                </template>
                <b-dropdown-text>
                  <v-date-picker
                    mode="range"
                    :value="null"
                    color="orange"
                    is-dark
                    is-inline
                    is-expanded
                  />
                </b-dropdown-text>
                <b-button variant="black" size="sm" block>
                  Сегодня
                </b-button>
              </b-dropdown>
              в
              <b-form-select value="00">
                <option value="00">00</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
              </b-form-select>
              :
              <b-form-select value="00">
                <option value="00">00</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
              </b-form-select>
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
              <b-dropdown class="dropdown-calendar" variant="black" toggle-class="text-decoration-none" no-caret>
                <template v-slot:button-content>
                  10 января 2019
                </template>
                <b-dropdown-text>
                  <v-date-picker
                    mode="range"
                    :value="null"
                    color="orange"
                    is-dark
                    is-inline
                    is-expanded
                  />
                </b-dropdown-text>
                <b-button variant="black" size="sm" block>
                  Сегодня
                </b-button>
              </b-dropdown>
              в
              <b-form-select value="00">
                <option value="00">00</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
              </b-form-select>
              :
              <b-form-select value="00">
                <option value="00">00</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
              </b-form-select>
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
        <b-button
          variant="black"
          class="float-right mr-3"
        >
          Отмена
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
  export default {
    data: () => ({
      text: '',
      accounts: [],
      isAutoDelete: false
    }),
    computed: {
      currentProject () {
        return this.$store.getters['user/currentProject'];
      },
      projects () {
        return this.$store.getters['user/projects'];
      },
    },
    mounted () {
      this.$bus.$on('modal:post', (data) => {
        this.$nextTick(() => {
          this.$refs['post-modal'].show();
          let copyAccounts = Array.from(this.$store.getters['user/currentProject'].social_accounts);
          this.accounts = copyAccounts.map(a => {
            a.checked = false;
            return a;
          });
        });
      })
    },
    beforeDestroy () {
      this.$bus.$off('modal:post')
    },
    methods: {
      checkAccount (account, index) {
        let acc = this.accounts[index];
        acc.checked = !acc.checked;
        this.$set(this.accounts, index, acc);
      },
      savePost () {
        let postData = {
          social_accounts: this.accounts.map(acc => {
            if (acc.checked) return acc._id;
          }),
          text: this.text,
          project_id: this.currentProject._id
        };
        console.log(postData);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../variables";
</style>