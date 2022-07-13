<template>
  <div class="wrapper w-full bg-slate-900 overflow-hidden h-screen">
    <Nav class=" z-10 ">
      <NavItem href="/Home">Anasayfa</NavItem>
      <NavItem href="/Map_graphics" isActive>Harita</NavItem>
      <NavItem href="/Contact">İletişim</NavItem>
      <NavItem href="/Sign">Giriş yap</NavItem>
    </Nav>
    <div class="block w-full h-full">
      <div class="pl-6  text-slate-300 text-2xl font-semibold">
        {{ timeMessage }}
      </div>
      <div
        class="pr-10 pl-6 py-10 flex content-container justify-between w-full h-full"
      >
        <UploadFile
          class="max-w-2xl z-10"
          @renderChart="RenderChart"
        ></UploadFile>
        <div class="z-10 w-full block h-full">
          <IconNav>
            <IconNavItem
              v-for="(chart, keys, index) in GetChartTypes.data"
              :key="index"
              :id="chart.chart_id"
              class=" bg-violet-500 text-white bg-opacity-50 hover:text-violet-900 hover:bg-violet-100 hover:bg-opacity-100"
              @mouseenter="DisplayTooltip(true, chart.tooltip_id)"
              @mouseleave="DisplayTooltip(false, chart.tooltip_id)"
              @click="DisplayChartsBody(chart.comp_id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  :d="chart.icon_path"
                />
              </svg>
              <Tooltip :id="chart.tooltip_id" class="d-none">{{
                chart.tooltip_text
              }}</Tooltip>
            </IconNavItem>
          </IconNav>
          <Suspense>
            <template #default>
              <Cities
                id="map"
                class="charts"
                v-if="activeComponent == 'map'"
              ></Cities>
            </template>
            <template #fallback>
              <span class=" text-white z-50">Harita yükleniyor...👋</span>
            </template>
          </Suspense>
          <BarChart
            id="barChart"
            class=" charts "
            v-if="activeComponent == 'barChart'"
            :renderChart="renderCounter"
          ></BarChart>
          <PieChart
            id="pieChart"
            class=" charts "
            v-if="activeComponent == 'pieChart'"
            :renderChart="renderCounter"
          ></PieChart>
          <DonutChart
            id="donutChart"
            class=" charts "
            v-if="activeComponent == 'donutChart'"
            :renderChart="renderCounter"
          ></DonutChart>
          <LineChart
            id="lineChart"
            class=" charts "
            v-if="activeComponent == 'lineChart'"
            :renderChart="renderCounter"
          ></LineChart>
          <AreaChart
            id="areaChart"
            class=" charts "
            v-if="activeComponent == 'areaChart'"
            :renderChart="renderCounter"
          ></AreaChart>
          <RadarChart
            id="radarChart"
            class=" charts"
            v-if="activeComponent == 'radarChart'"
            :renderChart="renderCounter"
          ></RadarChart>
        </div>
      </div>
    </div>
    <div
      class=" w-56 h-56 absolute rounded-full bottom-0 left-1/3 transform -translate-x-1/2  filter blur-3xl bg-blue-900 brightness-75"
    ></div>
    <div
      class=" w-56 h-56 absolute rounded-full top-0 right-0 transform -translate-x-1/2  filter blur-3xl bg-blue-900 brightness-75"
    ></div>
  </div>
</template>

<script>
import Cities from "../components/Cities.vue";
import Nav from "../articles/Nav.vue";
import NavItem from "../components/NavItem.vue";
import UploadFile from "../components/UploadFile.vue";
import IconNav from "../articles/IconNav.vue";
import IconNavItem from "../components/IconNavItem.vue";
import Tooltip from "../components/Tooltip.vue";

import BarChart from "../components/Charts/BarChart.vue";
import PieChart from "../components/Charts/PieChart.vue";
import DonutChart from "../components/Charts/DonutChart.vue";
import LineChart from "../components/Charts/LineChart.vue";
import AreaChart from "../components/Charts/AreaChart.vue";
import RadarChart from "../components/Charts/RadarChart.vue";

export default {
  components: {
    Cities,
    Nav,
    NavItem,
    UploadFile,
    IconNav,
    IconNavItem,
    Tooltip,
    BarChart,
    PieChart,
    DonutChart,
    LineChart,
    AreaChart,
    RadarChart,
  },
  data() {
    return {
      activeComponent: "map",
      timeMessage: "",
      renderCounter: 0,
    };
  },
  methods: {
    DisplayTooltip(display, id) {
      var tooltip = document.getElementById(id);

      if (display) {
        tooltip.classList.remove("d-none");
      } else {
        tooltip.classList.add("d-none");
      }
    },
    DisplayChartsBody(id) {
      this.activeComponent = id;
    },
    SetTimeMessage() {
      var today = new Date();
      var time = today.getHours();
      if (time <= 11 && time > 6) {
        this.timeMessage = "Günaydın 👋";
      } else if (time > 11 && time <= 17) {
        this.timeMessage = "Tünaydın 👋";
      } else if (time > 17 && time <= 21) {
        this.timeMessage = "İyi akşamlar 👋";
      } else {
        this.timeMessage = "İyi geceler 🌙";
      }
    },
    RenderChart(event) {
      this.renderCounter = event;
    },
  },
  mounted() {
    this.$store.dispatch("GetChartTypes");
    this.SetTimeMessage();
  },
  computed: {
    GetChartTypes() {
      return this.$store.getters.GetChartTypes;
    },
  },
};
</script>

<style scoped>
.d-none {
  display: none;
}
</style>
