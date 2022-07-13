<template>
  <div class="wrapper w-full  ">
    <div
      v-if="GetSelectedCity != ''"
      class="rounded-md bg-slate-600 overflow-y-auto full w-full p-6 text-slate-200 border border-gray-500 relative"
      id="card"
    >
      <div class="card-body ">
        <h4 class="card-title text-center mb-4 text-xl  ">
          {{ GetNoneCity }}
        </h4>

        <div
          class="flex items-center mb-3"
          v-for="(value, keys, index) in GetSelectedCity"
          :key="index"
        >
          <input
            class=" checkboxes p-3 rounded-md bg-slate-400 transition-all "
            type="checkbox"
            @click="StyleCheckboxes(keys)"
            @keydown="KeyDown"
            @keyup="KeyUp"
            checked
          />
          <div class="check-label">
            <span class="font-bold ml-6 ">{{ GetSelectedCity[keys][0] }}</span
            >:
            <span class="ml-1">{{ GetSelectedCity[keys][1] }}</span>
          </div>
        </div>
      </div>
      <UpdatedMessage id="updated-checks"></UpdatedMessage>
    </div>
    <div
      v-if="GetSelectedCity == '' && GetNoneCity != ''"
      class=" rounded-md bg-slate-600 overflow-y-auto w-full p-6 text-slate-200 border border-slate-500"
      id="card"
    >
      <div class="card-body ">
        <h4 class="card-title text-center mb-4 text-xl ">
          {{ GetNoneCity }}
        </h4>

        <div class="card-text text-center font">
          İstediğiniz şehire ait veri bulunamadı.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  outline: none;
  border: none;
  cursor: pointer;
}

input[type="checkbox"]:checked {
  outline: none;
  border: none;
  background-color: rgba(52, 211, 153, 1);
}
</style>

<script>
import UpdatedMessage from "../articles/UpdatedMessage.vue";
export default {
  components: { UpdatedMessage },
  data: function() {
    return {
      renderChart: 0,
    };
  },
  computed: {
    GetSelectedCity() {
      return this.$store.getters.GetSelectedCity;
    },
    GetNoneCity() {
      return this.$store.getters.GetNoneCity;
    },
  },
  mounted() {
    this.$store.dispatch("ChangeDetailCard");
  },
  methods: {
    StyleCheckboxes(i) {
      var checkboxes = document.getElementsByClassName("checkboxes");
      var labels = document.getElementsByClassName("check-label");
      var updated_checks = document.getElementById("updated-checks");
      console.log(i);

      console.log(checkboxes[i]);

      if (!checkboxes[i].checked) {
        labels[i].style.color = "rgba(100, 116, 139,1)";
        var itemIndex = this.$store.state.labels.findIndex(
          (label) => label == labels[i].childNodes[0].innerHTML
        );
        this.$store.state.labels.splice(itemIndex, 1);
        this.$store.state.values.splice(itemIndex, 1);
        updated_checks.innerHTML =
          labels[i].childNodes[0].innerHTML + " kaldırıldı!";
      } else {
        labels[i].style.color = "rgba(226, 232, 240,1)";
        this.$store.state.labels.push(labels[i].childNodes[0].innerHTML);
        this.$store.state.values.push(
          parseInt(labels[i].childNodes[2].innerHTML)
        );
        updated_checks.innerHTML =
          labels[i].childNodes[0].innerHTML + " eklendi!";
      }
      this.renderChart++;
      this.$emit("renderChart", this.renderChart);
      updated_checks.style.display = "none";
      setTimeout(this.Display, 100);
    },

    Display() {
      var item = document.getElementById("updated-checks");
      item.style.display = "inline-block";
    },
  },
};
</script>
