<template>
  <div>
    <div class="calendar-loading" v-if="loading">
      <i class="fas fa-cog fa-spin"></i>
    </div>
    <div class="access-denied" v-if="!currentProject.access.posts">
      <img src="../assets/img/access_denied.svg">
      <div class="access-denied__header">
        Oops.. 🤭
      </div>
      У вас нет доступа к этому разделу.
      <br> Обратитесь к администратору проекта,
      <br> если вам очень нужно сюда попасть :)
    </div>
    <div class="calendar" v-else>
      <div class="calendar-content">
        <div class="calendar-rows">
          <div class="calendar-rows__item" v-for="day in days">
            <div class="calendar-rows__day">
              <span>{{ dayName(day.dt) }},</span> {{ dayDate(day.dt) }}
              <span class="calendar-rows__today" v-if="isToday(day.dt)"></span>
            </div>
            <div class="calendar-rows__posts">
              <post
                  v-for="post in day.posts"
                  :key="post._id"
                  :post="post"
                  @click="showPostModal(post)"
              ></post>
              <div class="empty-post" @click="showPostModal({})" v-if="isShowDefaultSlot(day)">
                <div class="empty-post__icon">
                  <img src="../assets/img/icons/plus-round.svg">
                  <div>Запланировать пост</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { DateTime } from 'luxon';
  import { sortBy } from 'lodash';
  import Post from '@/components/Post';
  export default {
    components: {
      Post,
    },
    data: () => ({
      days: [],
      loading: false,
    }),
    computed: {
      currentProject () {
        return this.$store.getters['user/currentProject'];
      },
    },
    mounted () {
      this.$bus.$on('calendar:reload', this.loadPosts);
      this.loadPosts({});
    },
    beforeDestroy () {
      this.$bus.$off('calendar:reload');
    },
    methods: {
      isShowDefaultSlot(day) {
        const currentDay = DateTime.local().startOf('day');
        const dtDay = DateTime.fromISO(day.dt).startOf('day');
        return dtDay.toMillis() >= currentDay.toMillis();
      },
      loadPosts (params = {}) {
        this.loading = true;
        let start = params.startDt || DateTime.local().startOf('week').set({hours: 0, minutes: 0, seconds: 0, milliseconds: 0});
        let end = params.endDt ? params.endDt.plus({ days: 1 }) : DateTime.local().startOf('week').set({hours: 0, minutes: 0, seconds: 0, milliseconds: 0}).plus({ weeks: 1 });
        this.$store.dispatch('user/getPosts', {
          start: start.toString(),
          end: end.toString(),
          project_id: this.currentProject._id
        })
          .then(async (data) => {
            let daysCount = end.diff(start, ['days']).toObject().days; // Берем кол-во дней между датами

            let results = [];

            for (let index of new Array(Math.round(daysCount)).keys()) { // Цикл на кол-во дней
              let dt = start.plus({ days: index }); // Получаем день
              let day = {
                dt: dt.toISO(),
                posts: []
              };
              let dayOfWeek = dt.toFormat('E'); // Номер дня недели
              if (this.currentProject.slots[dayOfWeek]) {
                Object.keys(this.currentProject.slots[dayOfWeek]).forEach(time => {
                  let times = time.split('_');
                  let run_dt = dt.set({ hours: times[0], minutes: times[1] }).toISO();
                  let currentDay = DateTime.local().startOf('day');
                  let runDtDay = DateTime.fromISO(run_dt).startOf('day');
                  if (runDtDay.toMillis() >= currentDay.toMillis()) {
                    day.posts.push({
                      time: `${times[0]}:${times[1]}`,
                      hours: times[0],
                      minutes: times[1],
                      category: null,
                      run_dt: run_dt
                    })
                  }
                });
              }

              data.forEach(post => { // Проходим по постам и сохраняем те что выходят в этот день
                let postRunDay = DateTime.fromISO(post.run_dt);
                if (postRunDay.hasSame(dt, 'days')) {
                  // Если есть слот на такое время - заменяем на пост, если нет - просто добавим в масив
                  let postTime = postRunDay.toFormat('HH:mm');
                  // post.time = postTime;
                  let slotForThisTime = day.posts.findIndex(el => el.time === postTime);
                  if (slotForThisTime !== -1) {
                    day.posts.splice(slotForThisTime, 1, post);
                  } else {
                    day.posts.push(post);
                  }
                }
              });
              day.posts = sortBy(day.posts, 'run_dt');
              results.push(day)
            }
            this.days = results;
          })
          .finally(() => {
            this.loading = false;
          })
      },
      dayName (dt) {
        return DateTime.fromISO(dt).setLocale('ru').toFormat('EEEE');
      },
      dayDate (dt) {
        return DateTime.fromISO(dt).setLocale('ru').toFormat('d MMMM');
      },
      isToday (dt) {
        return DateTime.fromISO(dt).hasSame(DateTime.local(), 'day');
      },
      showPostModal (post) {
        this.$bus.$emit('modal:post', post);
        // if (post.status === 'error' || post.status === 'finish' || post.status === 'pending') {
        //   this.$bus.$emit('modal:post-status', post);
        // } else {
        //   this.$bus.$emit('modal:post', post);
        // }
      }
    }
  }
</script>

<style lang="scss">
  @import '../variables';

  .calendar {
    display: flex;
    position: relative;
  }

  .calendar-loading {
    position: absolute;
    background: $color-bg-0;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    color: white;
    padding-left: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    opacity: 0.7;
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

      &:first-letter {text-transform: capitalize;}

      span {
        color: #A2A2A2;
      }
    }

    &__today {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: $color-success;
      margin-left: 8px;
      position: relative;
      top: -1px;
    }

    &__posts {
      display: flex;
      flex-wrap: wrap;
    }

    &__item {}
  }

  .empty-post {
    position: relative;
    width: 200px;
    height: 200px;
    background-color: $color-bg-1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;
    margin-right: 20px;
    margin-bottom: 20px;
    color: lighten($color-bg-0, 50%);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    &:hover {
      background-color: $color-bg-2;
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    }

    &__icon {
      text-align: center;
      img {
        margin-bottom: 10px;
      }
    }
  }
</style>