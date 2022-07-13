<template>
  <div class=" w-4/6 mx-auto mt-16 full">
    <VueApexCharts
      id="chart"
      width="700"
      :options="options"
      :series="series"
      ref="donut"
    ></VueApexCharts>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import store from "@/store/index.js";
import { ref } from "vue";
export default {
  name: "Vue Chart",
  components: { VueApexCharts },
  props: ["renderChart"],

  data: function() {
    return {
      options: ref({
        legend: {
          show: true,
        },
        labels: store.state.labels,
        theme: {
          mode: "dark",
        },
        stroke: {
          show: false,
        },
        chart: {
          id: "chart",
          background: "transparent",
          height: 500,
          type: "donut",
        },

        title: {
          text: store.state.noneCityData + " verisi",
        },
      }),
      series: store.state.values,
    };
  },

  updated() {
    this.SetChartData();
  },
  methods: {
    SetChartData() {
      this.series = store.state.values;
    },
  },
};
</script>

<style></style>
<!--
for (let i = 0; i < this.chart_labels.length; i++) {
        console.log(this.options.series[0].data[i].x);
        this.options.series[0].data.push({
          x: this.chart_labels[i],
          y: this.chart_data[i],
        });
      }
-->
