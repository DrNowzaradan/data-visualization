<template>
  <div
    class="map-container w-3/4 h-full block mx-auto mt-20 "
    @mousemove="UpdatePos($event)"
  >
    <div id="tooltip" :style="{ top: posY + 'px', left: posX + 'px' }"></div>
    <svg version="1.1" id="svg-turkiye-haritasi" viewBox="0 0 2500 2500">
      <g
        v-for="(city, name, index) in GetCities.data"
        :key="index"
        :id="city.ilce_isim"
      >
        <path
          style="fill: tomato"
          :d="city.ilce_path"
          @mouseover="TooltipText(city.ilce_isim)"
          @mouseleave="TooltipClose()"
          @click="OpenDetailCard(city)"
        ></path>
      </g>
    </svg>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      posX: null,
      posY: null,
    };
  },
  methods: {
    TooltipText(sehir_isim) {
      let tooltip = document.getElementById("tooltip");
      tooltip.innerHTML = '<div class="tooltip-text ">' + sehir_isim + "</div>";
      tooltip.style.display = "block";
    },
    UpdatePos(e) {
      this.posX = e.clientX + 10;
      this.posY = e.clientY + 20;
    },
    TooltipClose() {
      let tooltip = document.getElementById("tooltip");
      tooltip.style.display = "none";
    },
    OpenDetailCard(city) {
      var strCity = JSON.stringify(city);
      localStorage.setItem("city", strCity);
      this.$store.state.labels = [];
      this.$store.state.values = [];
      this.$store.dispatch("ChangeDetailCard");
    },
  },

  mounted() {
    this.$store.dispatch("GetCities");
  },
  computed: {
    GetCities() {
      return this.$store.getters.GetCities;
    },
  },
};
</script>

<style scoped>
#svg-turkiye-haritasi path {
  cursor: pointer;
  transition: all 0.2s;
}

#svg-turkiye-haritasi path:hover {
  fill: #fff !important;
}

#tooltip {
  position: fixed;
  display: none;
  background: #000;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  color: #f2f2f2;
  text-align: center;
  font-weight: 600;
}
</style>
