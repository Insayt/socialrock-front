<template>
  <div class="calendar">
    <div class="calendar-content">
      <div class="calendar-rows">
        <div class="calendar-rows__item">
          <div class="calendar-rows__day">
            <span>Понедельник,</span> 23 октября
          </div>
          <div class="calendar-rows__posts">
            <post :post="{ id: 1 }" @click="showPostModal"></post>
            <post :post="{}"></post>
            <post :post="{}"></post>
            <post :post="{ id: 1 }" @click="showPostModal"></post>
            <post :post="{}"></post>
          </div>
        </div>

        <div class="calendar-rows__item">
          <div class="calendar-rows__day">
            <span>Вторник,</span> 23 октября
          </div>
          <div class="calendar-rows__posts">
            <post :post="{}"></post>
            <post :post="{}"></post>
            <post :post="{}"></post>
            <post :post="{}"></post>
            <post :post="{}"></post>
          </div>
        </div>

        <div class="calendar-rows__item">
          <div class="calendar-rows__day">
            <span>Вторник,</span> 23 октября
          </div>
          <div class="calendar-rows__posts">
            <post :post="{}"></post>
            <post :post="{}"></post>
            <post :post="{}"></post>
            <post :post="{}"></post>
            <post :post="{}"></post>
          </div>
        </div>

        <div class="calendar-rows__item">
          <div class="calendar-rows__day">
            <span>Вторник,</span> 23 октября
          </div>
          <div class="calendar-rows__posts">
            <post :post="{}"></post>
            <post :post="{}"></post>
            <post :post="{}"></post>
            <post :post="{}"></post>
          </div>
        </div>
      </div>
    </div>
    <b-modal ref="post-modal" size="lg" no-close-on-esc no-close-on-backdrop>
      <template v-slot:modal-header-close>
        <img src="../assets/img/icons/times.svg">
      </template>
      <template v-slot:modal-title>
        Создание поста
        <i class="fa fa-trash post-modal-trash" v-b-tooltip.hover title="Очистить форму"></i>
      </template>
      <div class="post-modal">
        <b-tabs>
          <b-tab title="Пост" active>
            <div class="post-modal__networks">
              <div class="network _active" style="background-image: url('/test1.jpg')">
                <div class="network__bg">
                  <div class="network__check">
                    <i class="fas fa-check"></i>
                  </div>
                </div>
                <div class="network__icon" style="background-color: #4680C2">
                  <i class="fab fa-vk"></i>
                </div>
              </div>
              <div class="network" style="background-image: url('/test1.jpg')">
                <div class="network__icon" style="background-color: #4680C2">
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
                v-model="newPost.text"
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
                  id="checkbox-1"
                  name="checkbox-1"
                  value="accepted"
                  unchecked-value="not_accepted"
                >
                  Автоудаление
                </b-form-checkbox>
              </div>
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
  </div>
</template>

<script>
  import Post from '@/components/Post';
  export default {
    components: {
      Post,
    },
    data: () => ({
      newPost: {
        text: ''
      }
    }),
    methods: {
      showPostModal () {
        this.$refs['post-modal'].show()
      }
    }
  }
</script>

<style lang="scss">
  @import '../variables';

  .calendar {
    display: flex;
  }

  .calendar-sidebar {
    width: 240px;
    background-color: #313033;
    padding-top: 20px;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
  }

  .calendar-rows {
    padding: 20px;

    &__day {
      margin-bottom: 20px;
      font-weight: bold;
      color: #F0F0F0;
      span {
        color: #A2A2A2;
      }
    }

    &__posts {
      display: flex;
      flex-wrap: wrap;
    }

    &__item {}
  }
</style>