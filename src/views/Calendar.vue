<template>
  <div class="calendar">
    <div class="calendar-content">
      <div class="calendar-rows">
        <!--<div class="calendar-rows__item">-->
          <!--<div class="calendar-rows__day">-->
            <!--<span>Понедельник,</span> 23 октября-->
          <!--</div>-->
          <!--<div class="calendar-rows__posts">-->
            <!--<post :post="{ id: 1 }" @click="showPostModal"></post>-->
            <!--<post :post="{}"></post>-->
            <!--<post :post="{}"></post>-->
            <!--<post :post="{ id: 1 }" @click="showPostModal"></post>-->
            <!--<post :post="{}"></post>-->
          <!--</div>-->
        <!--</div>-->

        <div class="calendar-rows__item" v-for="day in days">
          <div class="calendar-rows__day">
            <span>{{ dayName(day.dt) }},</span> {{ dayDate(day.dt) }}
          </div>
          <div class="calendar-rows__posts">
            <post :post="post" v-for="post in day.posts" :key="post._id" @click="showPostModal"></post>
            <post :post="{}"></post>
            <post :post="{}"></post>
            <post :post="{}"></post>
            <!--<post :post="{}"></post>-->
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { DateTime } from 'luxon';
  import Post from '@/components/Post';
  export default {
    components: {
      Post,
    },
    data: () => ({
      days: []
    }),
    computed: {
      currentProject () {
        return this.$store.getters['user/currentProject'];
      },
    },
    mounted () {
      let start = DateTime.local().set({seconds: 0, milliseconds: 0});
      let end = DateTime.local().set({seconds: 0, milliseconds: 0}).plus({ days: 7 });
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
            data.forEach(post => { // Проходим по постам и сохраняем те что выходят в этот день
              let postRunDay = DateTime.fromISO(post.run_dt);
              if (postRunDay.hasSame(dt, 'days')) {
                day.posts.push(post);
              }
            });
            results.push(day)
          }

          console.log(results);
          this.days = results;
        })
    },
    methods: {
      dayName (dt) {
        return DateTime.fromISO(dt).setLocale('ru').toFormat('EEEE');
      },
      dayDate (dt) {
        return DateTime.fromISO(dt).setLocale('ru').toFormat('dd MMMM');
      },
      showPostModal () {
        this.$bus.$emit('modal:post');
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

      &:first-letter {text-transform: capitalize;}

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