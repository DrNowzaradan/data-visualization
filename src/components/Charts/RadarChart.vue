<template>
  <div class=" w-4/6 mx-auto mt-16 h-full">
    <VueApexCharts
      id="chart"
      width="700"
      ref="chart"
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
        yaxis: {
          show: false,
        },
        xaxis: {
          categories: store.state.labels,
          labels: {
            show: true,
            style: {
              colors: ["#f2f2f2"],
              fontSize: "12px",
            },
          },
        },

        plotOptions: {
          radar: {
            polygons: {
              strokeColors: "transparent",
              connectorColors: "transparent",
              fill: {
                colors: ["#444444", "#333333"],
              },
            },
          },
        },
        chart: {
          id: "chart",
          height: 500,
          type: "radar",
          background: "#0f172a",
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
  mounted() {
    this.SetChartData();
  },
  updated() {
    this.SetChartData();
    console.log("updated çalıştı");
  },
  methods: {
    SetChartData() {
      this.series[0].data = store.state.values;

      for (let index = 0; index < store.state.labels.length; index++) {
        this.options.xaxis.labels.style.colors.push("#f2f2f2");
      }
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
