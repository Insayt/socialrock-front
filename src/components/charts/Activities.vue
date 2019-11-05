<template>
  <apexchart type=bar height=350 :options="chartOptions" :series="series" />
</template>

<script>
  import VueApexCharts from 'vue-apexcharts';
  export default {
    components: {
      'apexchart': VueApexCharts
    },
    data: () => ({
      chartOptions: {
        colors: ['#5388EA', '#5AA75F', '#D84F42', '#F1BF4F'],
        chart: {
          fontFamily: 'Roboto',
          foreColor: '#A2A2A2',
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350
            }
          },
          stacked: true,
          toolbar: {
            show: false,
          }
        },
        xaxis: {
          type: 'datetime',
          categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
            '01/05/2011 GMT', '01/06/2011 GMT'
          ],
        },
        theme: {
          mode: 'dark',
          palette: 'palette1',
          monochrome: {
            enabled: false,
            color: '#255aee',
            shadeTo: 'light',
            shadeIntensity: 0.65
          },
        },
        dataLabels: {
          style: {
            fontSize: '13px',
          },
        },
      },
      series: [{
        name: 'Переходы по ссылкам',
        data: [44, 55, 41, 67, 22, 43]
      }, {
        name: 'Репосты',
        data: [13, 23, 20, 8, 13, 27]
      }, {
        name: 'Лайки',
        data: [11, 17, 15, 15, 21, 14]
      }, {
        name: 'Комментарии',
        data: [21, 7, 25, 13, 22, 8]
      }, {
        name: 'Сохранения',
        data: [21, 7, 25, 13, 22, 8]
      }]
    })
  }
</script>

<style scoped>

</style>