<template>
  <div class="images">
    <div class="controls-title">Загрузить картинку</div>
    <label class="input-file" for="image-file">
      <div class="btn btn-success btn-sm" :disabled="imageLoading" :class="{ disabled: imageLoading }">
        <i class="fas fa-upload" v-show="!imageLoading"></i>
        <i class="fas fa-spinner fa-spin" v-show="imageLoading"></i>
        Выбрать файл
      </div>
      <input id="image-file"
             type="file"
             accept=".jpg,.jpeg,.png"
             hidden
             ref="pattern"
             @change.stop="handleImageUpload"
             :disabled="imageLoading"
      />
    </label>
    <div class="controls-title">Картинки проекта</div>
    <div class="image">
      <div class="image__item"
           v-for="img in currentProject.images"
           :style="{ backgroundImage: `url(${img})` }"
           @click="changeBgImage(img)"
      >
        <div class="image__delete">
          <i class="fa fa-times"
             v-b-tooltip.hover
             title="Удалить"
             @click.stop="deleteImage(img)"
          ></i>
        </div>
      </div>
    </div>
    <div class="controls-title">Фотосток <span class="badge badge-success">unsplash</span></div>
    <b-form-select class="image-select" v-model="selectedCategory" :options="options" @change="getStockImages"></b-form-select>
    <div class="image">
      <div class="image__item"
           v-for="img in stockImages"
           :style="{ backgroundImage: `url(${img.urls.regular})` }"
           @click="changeBgImage(img.urls.regular)"
      >
      </div>
      <infinite-loading spinner="spiral":identifier="infiniteId" @infinite="infiniteHandler">
        <div slot="no-more">
          <span class="scroll-no-more"></span>
        </div>
      </infinite-loading>
    </div>
  </div>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading';
  export default {
    components: {
      InfiniteLoading
    },
    data: () => ({
      loading: false,
      imageLoading: false,
      selectedCategory: 'pop',
      stockImages: [],
      imagePage: 1, // Страница поиска
      infiniteId: Date.now(),
      options: [
        {value: 'pop', text: 'Выберите категорию'},
        {value: 'business', text: 'Бизнес'},
        {value: 'office', text: 'Офис'},
        {value: 'meeting', text: 'Собрание'},
        {value: 'work', text: 'Работа'},
        {value: 'things', text: 'Предметы'},
        {value: 'table', text: 'Стол'},
        {value: 'laptop', text: 'Ноутбук'},
        {value: 'tablet', text: 'Планшет'},
        {value: 'screen', text: 'Экран'},
        {value: 'time', text: 'Время'},
        {value: 'technology', text: 'Технологии'},
        {value: 'idea', text: 'Идея'},
        {value: 'design', text: 'Дизайн'},
        {value: 'art', text: 'Искусство'},
        {value: 'process', text: 'Процесс'},
        {value: 'plane', text: 'Самолет'},
        {value: 'flying', text: 'Полет'},
        {value: 'flying', text: 'Полет'},
        {value: 'workspace', text: 'Рабочее место'},
        {value: 'shopping', text: 'Покупки'},
        {value: 'shop', text: 'Магазины'},
        {value: 'store', text: 'Витрины'},
        {value: 'interior', text: 'Интерьер'},
        {value: '', text: '------', disabled: true},
        {value: 'people', text: 'Люди'},
        {value: 'help', text: 'Помощь'},
        {value: 'team', text: 'Команда'},
        {value: 'face', text: 'Лицо'},
        {value: 'smile', text: 'Улыбка'},
        {value: 'happy', text: 'Счастье'},
        {value: 'love', text: 'Любовь'},
        {value: 'hand', text: 'Руки'},
        {value: 'emotion', text: 'Эмоция'},
        {value: 'model', text: 'Модель'},
        {value: 'family', text: 'Семья'},
        {value: 'child', text: 'Дети'},
        {value: 'woman', text: 'Девушка'},
        {value: 'man', text: 'Мужчина'},
        {value: '', text: '------', disabled: true},
        {value: 'mountain', text: 'Горы'},
        {value: 'forest', text: 'Лес'},
        {value: 'friends', text: 'Друзья'},
        {value: 'food', text: 'Еда'},
        {value: 'landscape', text: 'Пейзаж'},
        {value: 'sky', text: 'Небо'},
        {value: 'sea', text: 'Море'},
        {value: 'sea', text: 'Море'},
        {value: 'space', text: 'Космос'},
        {value: 'sunset', text: 'Закат'},
        {value: 'nature', text: 'Природа'},
        {value: 'universe', text: 'Вселенная'},
        {value: 'abstract', text: 'Абстракция'},
        {value: 'cats', text: 'Кошка'},
        {value: 'dogs', text: 'Собака'},
        {value: 'flowers', text: 'Цветы'},
        {value: 'water', text: 'Вода'},
        {value: 'fire', text: 'Огонь'},
        {value: '', text: '------', disabled: true},
        {value: 'fitness', text: 'Фитнес'},
        {value: 'sport', text: 'Спорт'},
        {value: 'city', text: 'Город'},
        {value: 'medicine', text: 'Медицина'},
        {value: 'health', text: 'Здоровье'},
        {value: 'texture', text: 'Текстуры'},
        {value: 'portrait', text: 'Портрет'},
        {value: 'fashion', text: 'Мода'},
        {value: 'street', text: 'Улица'},
        {value: 'car', text: 'Машина'},
        {value: 'driving', text: 'Вождение'},
        {value: 'photography', text: 'Фото'},
        {value: 'education', text: 'Образование'},
        {value: 'school', text: 'Школа'},
        {value: 'speed', text: 'Скорость'},
        {value: 'road', text: 'Дорога'},
        {value: 'travel', text: 'Путешествия'},
      ]
    }),
    computed: {
      currentProject() {
        return this.$store.getters['user/currentProject'];
      },
      user() {
        return this.$store.getters['user/user'];
      },
    },
    mounted() {
      this.getStockImages();
    },
    methods: {
      infiniteHandler ($state) {
        this.imagePage += 1;
        this.$store.dispatch('user/getStockImages', {
          category: this.selectedCategory,
          page: this.imagePage
        }).then(res => {
          if (res.results.length) {
            this.stockImages.push(...res.results);
            $state.loaded();
          } else {
            $state.complete();
          }
        })
      },
      getStockImages() {
        this.imagePage = 1;
        this.infiniteId += 1;
        this.$store.dispatch('user/getStockImages', {
          category: this.selectedCategory,
          page: this.imagePage
        }).then(res => {
          this.stockImages = res.results;
        });
      },
      changeBgImage(img) {
        this.$bus.$emit('editor:changeBgImage', img);
      },
      handleImageUpload() {
        this.imageLoading = true;
        this.$bus.$emit('loading:start');
        let file = this.$refs.pattern.files[0];
        if (file.size > 10000000) {
          this.$swal({
            title: `Ошибка`,
            html: `Максимальный размер файла 10 мегабайт`,
            type: 'error'
          });
          return;
        }
        let fd = new FormData();
        fd.append('file', file);
        this.$store.dispatch('user/uploadImage', {
          project_id: this.currentProject._id,
          form_data: fd
        }).then(() => {
          this.$swal({
            title: `Картинка загружена`,
            type: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000
          });
        }).catch(() => {
          this.$swal({
            title: `Ошибка загрузки`,
            type: 'error',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000
          });
        }).finally(() => {
          this.imageLoading = false;
          this.$bus.$emit('loading:stop');
        })
      },
      deleteImage(img) {
        this.$swal({
          title: `Удалить картинку?`,
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Удалить',
          cancelButtonText: 'Отмена',
        }).then(res => {
          if (res.value) {
            this.$store.dispatch('user/deleteImage', {
              project_id: this.currentProject._id,
              image: img
            }).then(() => {
              this.$swal({
                title: `Картинка удалена`,
                type: 'success',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000
              });
            }).catch(() => {
              this.$swal({
                title: `Ошибка удаления`,
                type: 'error',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000
              });
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../variables';

  .controls-title {
    text-align: left;
    color: $color-font-gray;
    font-size: 16px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
  }

  .input-file {
    margin-bottom: 15px;
  }

  .image {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 15px;

    &__item {
      width: 125px;
      height: 125px;
      border-radius: 2px;
      cursor: pointer;
      margin-right: 10px;
      margin-bottom: 10px;
      background-color: $color-bg-1;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;

      &:nth-child(2n) {
        margin-right: 0;
      }

      &:hover {
        .image__delete i {
          display: block;
        }
      }
    }

    &__delete {
      color: $color-danger;
      align-items: center;
      justify-content: center;
      height: 100%;
      border-radius: 1px;
      font-size: 14px;
      position: relative;

      i {
        display: none;
        position: absolute;
        right: 0;
        padding: 10px;
        background-color: lighten($color-danger, 20%);
        border-radius: 0 0 0 10px;
      }
    }
  }

  .image-select {
    margin-bottom: 15px;
  }

</style>