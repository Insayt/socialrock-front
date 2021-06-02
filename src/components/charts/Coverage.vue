<template>
  <apexchart type=bar height=350 :options="chartOptions" :series="series" />
</template>

<script>
  import VueApexCharts from 'vue-apexcharts';
  const ru = require("apexcharts/dist/locales/ru.json");
  export default {
    components: {
      'apexchart': VueApexCharts
    },
    data: () => ({
      chartOptions: {
        colors: ['#8C9EFF', '#536DFE'],
        chart: {
          zoom: {
            enabled: false,
          },
          locales: [ru],
          defaultLocale: 'ru',
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
          },
        },
        dataLabels: {
          style: {
            fontSize: '13px',
          },
        },
        // tooltip: {
        //   custom: function({series, seriesIndex, dataPointIndex}) {
        //     return '<div class="arrow_box">' +
        //       '<span>' + series[seriesIndex][dataPointIndex] + '</span>' +
        //       '</div>'
        //   }
        // },
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
        }
      },
      series: [ {
        name: 'Просмотры постов',
        data: [13, 23, 20, 8, 13, 27]
      }, {
        name: 'Просмотры сторис',
        data: [21, 7, 25, 13, 22, 8]
      }]
    })
  }
</script>

<style scoped>

</style>