<template>
  <div>
    <apexchart type="bar" height="350" :options="chartOptions" :series="series" class="chart"/>
  </div>
</template>

<script>
import restMethods from "../restMethods.js";
import { log } from 'util';
const rest = new restMethods();
export default {
  data() {
    return {
      series: this.getDollars(),
      t: this.getCantidades(),
      chartOptions: {
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },

        xaxis: {
          categories: ["Cantidades","Dolares"],
          labels: {
            style: {
              colors: "white"
            }
          }
        },
        yaxis: {
          title: {
            text: "Total",
            style: {
              color: "white"
            }
          },
          labels: {
            style: {
              color: "white"
            }
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function(val) {
              console.log(val);
              
              return val;
            }
          }
        }
      }
    };
  },
  methods: {
    getDollars() {
      rest
        .getJson("detalleorden/stats")
        .then(r => {
          // this.series = r;
          this.series = r.data.map(m => {
            return {
              name: m[0],
              data: [m[2]]
            };
          });
        })
        .catch(e => {
          this.series = [];
        });
    },
    getCantidades() {
      rest
        .getJson("detalleorden/stats")
        .then(r => {
          // this.series = r;
          this.series = r.data.map(m => {
            return {
              name: m[0],
              data: [m[1],m[2]]
            };
          });
        })
        .catch(e => {
          this.series = [];
        });
    }
  }
};
</script>

<style>
.chart {
  color: black;
}
</style>


