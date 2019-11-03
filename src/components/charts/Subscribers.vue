<template>
  <apexchart type=line height=350 :options="chartOptions" :series="series" />
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
        colors: ['#5388EA'],
        chart: {
          locales: [ru],
          defaultLocale: 'ru',
          fontFamily: 'Roboto',
          foreColor: '#A2A2A2',
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 1,
          dataLabels: {
            enabled: true,
          },
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
          toolbar: {
            show: false,
          }
        },
        markers: {
          size: 6
        },
        stroke: {
          curve: 'smooth'
        },
        grid: {
          show: true,
          borderColor: '#2D2D2D',
        },
        xaxis: {
          categories: ['10.01', '11.01', '12.01', '13.01', '14.01', '15.01', '16.01', '17.01']
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
      series: [{
        name: 'Подписчики',
        data: [44, 55, 41, 67, 22, 43]
      }]
    })
  }
</script>

<style scoped>

</style>