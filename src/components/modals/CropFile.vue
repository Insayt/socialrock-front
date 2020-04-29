<template>
  <b-modal ref="crop" size="lg" no-close-on-backdrop no-close-on-esc>
    <template v-slot:modal-header-close>
      <img src="../../assets/img/icons/times.svg">
    </template>
    <template v-slot:modal-title>
      Загрузка
    </template>
    <div class="modal-info">
      Подгоните файл по формату для всех социальных сетей. <br> Все прикрепленные файлы должны иметь одинаковое соотношение сторон
    </div>
    <div class="crop">
      <img class="crop__image" ref="cropimage">
    </div>
    <div class="modal-info aspectratio" v-show="!hideRatio">
      Соотношение сторон:
      <b-button-group>
        <b-button type="submit" @click="setAspectRatio(1, '1:1')" :variant="aspectRatioTxt === '1:1' ? 'success' : 'black'">1:1</b-button>
        <b-button type="submit" @click="setAspectRatio(16 / 9, '16:9')" :variant="aspectRatioTxt === '16:9' ? 'success' : 'black'">16:9</b-button>
        <b-button type="submit" @click="setAspectRatio(8 / 10, '8:10')" :variant="aspectRatioTxt === '8:10' ? 'success' : 'black'">8:10</b-button>
      </b-button-group>
    </div>
    <template v-slot:modal-footer>
      <b-button type="submit" variant="primary" @click="saveImage" :disabled="loading">
        <i v-show="loading" class="fas fa-cog fa-spin"></i>
        Сохранить
      </b-button>
    </template>
  </b-modal>
</template>

<script>
  import 'cropperjs/dist/cropper.min.css';
  import Cropper from 'cropperjs';

  export default {
    data: () => ({
      loading: false,
      cropper: {},
      aspectRatio: 1,
      aspectRatioTxt: '1:1',
      hideRatio: false
    }),
    computed: {
      currentProject () {
        return this.$store.getters['user/currentProject'];
      },
    },
    mounted () {
      this.$bus.$on('modal:crop', ({ file, firstMedia }) => {
        if (this.$refs['crop']) {
          this.$refs['crop'].show();
          setTimeout(() => {
            const image = this.$refs['cropimage'];
            const settings = {
              viewMode: 1,
              aspectRatio: this.aspectRatio
            };
            if (firstMedia && firstMedia.ratio) {
              settings.aspectRatio = firstMedia.ratio;
              this.hideRatio = true;
            }
            image.src = file;
            this.cropper = new Cropper(image, settings);
          }, 500);
        }
      });
    },
    beforeDestroy () {
      this.$bus.$off('modal:crop');
    },
    methods: {
      setAspectRatio (ratio, txt) {
        this.aspectRatio = ratio;
        this.aspectRatioTxt = txt;
        this.cropper.setAspectRatio(ratio);
      },
      saveImage () {
        let url = this.cropper.getCroppedCanvas().toDataURL('image/jpg');
        this.loading = true;
        fetch(url)
          .then(res => res.blob())
          .then((blob) => {
            let fd = new FormData();
            fd.append('file', blob);
            this.$store.dispatch('user/savePostImage', {
              project_id: this.currentProject._id,
              file: fd
            }).then((data) => {
              this.loading = false;
              data.ratio = this.aspectRatio;
              this.$bus.$emit('image:upload', data);
              this.$refs['crop'].hide();
            }).catch((e) => {
              this.loading = false;
              console.log('Ошибка загрузки фото ', e);
              this.$swal({
                title: `Ошибка`,
                html: `Не удалось загрузить изображение`,
                type: 'error'
              });
            })
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../variables";
  .crop {

    &__image {
      display: block;
      max-width: 100%;
      max-height: 400px;
    }
  }

  .aspectratio {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>