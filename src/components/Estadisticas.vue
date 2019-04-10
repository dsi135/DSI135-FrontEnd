<template>
   <div>
      <apexchart type=bar height=350 :options="chartOptions" :series="series" class="chart"/> 
    </div>
</template>

<script>
export default {
    data() {
        return{
        series: [{
          name: 'Bebidas',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }, {
          name: 'Principal',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        }, {
          name: 'Postre',
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }],
        chartOptions: {
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'	
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },

          xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            labels: {
                style: {
                colors: 'white'
                }
            }
            
          },
          yaxis: {
            title: {
              text: '$ Dolares',
              style: {
                color: 'white'
                }
            },
            labels: {
                style: {
                color: 'white'
                }
            }
          },
          fill: {
            opacity: 1

          },
          tooltip: {
            y: {
              formatter: function (val) {
                return "$ " + val 
              }
            }
          }
        }
      }
    }
};
</script>

<style>

.chart {

    color: black;
}

</style>


