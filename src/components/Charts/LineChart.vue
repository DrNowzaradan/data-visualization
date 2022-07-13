<template>
  <div class=" w-4/6 mx-auto mt-16">
    <VueApexCharts
      id="chart"
      width="700"
      ref="line"
      :options="options"
      :series="series"
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
          show: false,
        },
        theme: {
          mode: "dark",
        },
        xaxis: {
          categories: store.state.labels,
        },
        chart: {
          id: "chart",
          background: "#0f172a",
          height: 500,
          type: "line",
        },
        title: {
          text: store.state.noneCityData + " verisi",
        },
      }),
      series: [
        {
          data: store.state.values,
        },
      ],
    };
  },
  updated() {
    this.SetChartData();
  },
  methods: {
    SetChartData() {
      this.series[0].data = store.state.values;
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
