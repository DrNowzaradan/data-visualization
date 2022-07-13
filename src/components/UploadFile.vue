<template>
  <div
    class="file-input-container bg-slate-700 rounded-md float-left py-5 px-5 relative w-full"
  >
    <Toast id="success-alert">
      Dosyanın bir kopyası masaüstüne kaydedildi.</Toast
    >
    <Tabs class=" ">
      <Tab id="Json" @click="ChangeBodytoJson" class="active">Dosya yükle</Tab>
      <Tab id="Data" @click="ChangeBodytoData">Veri</Tab>
    </Tabs>
    <div id="Json-body" class="mt-3 relative">
      <div class="mb-3 text-slate-200 text-center">
        Json yada Excel formatında dosya yükleyebilirsiniz.
      </div>
      <FileInput
        @jsonTextData="SetTextData($event)"
        @SaveFile="SaveFile($event)"
      ></FileInput>
      <div class="relative">
        <textarea
          name=""
          id="jsontext-area"
          class=" resize-none w-full h-96 bg-slate-600 rounded-md border border-slate-500 mt-3 font-mono text-slate-200 placeholder-slate-200 "
          placeholder="Json formatındaki verinizi bu alana kopyalayın.."
          v-model="jsonText"
          @input="ChangeJsonData(jsonText)"
          @keyup="KeyUp"
          @keydown="KeyDown"
          spellcheck="false"
        >
        </textarea>
        <UpdatedMessage id="updated-text">Güncellendi!</UpdatedMessage>
      </div>
    </div>

    <div id="Data-body" class="d-none mt-3">
      <Card @renderChart="RenderChart"></Card>
    </div>
  </div>
</template>

<script>
import "animate.css";
import Tabs from "../articles/Tabs.vue";
import Tab from "./Tab.vue";
import Card from "../components/Card.vue";
import FileInput from "../articles/FileInput.vue";
import Toast from "../components/Toast.vue";
import UpdatedMessage from "../articles/UpdatedMessage.vue";
import axios from "axios";

export default {
  data: function() {
    return {
      jsonText: "",
      typingTimer: "",
      saveButton: false,
      file_name: "",
      responseText: "",
      PanelBody: "jsonbody",
      renderChart: 0,
    };
  },
  components: { Tabs, Tab, Card, FileInput, Toast, UpdatedMessage },
  methods: {
    ChangeBodytoExcel() {
      var json_tab = document.getElementById("Json");
      var json_body = document.getElementById("Json-body");
      var data_tab = document.getElementById("Data");
      var data_body = document.getElementById("Data-body");

      json_tab.classList.remove("active");
      json_body.classList.add("d-none");
      data_tab.classList.remove("active");
      data_body.classList.add("d-none");
    },
    ChangeBodytoJson() {
      var json_tab = document.getElementById("Json");
      var json_body = document.getElementById("Json-body");
      var data_tab = document.getElementById("Data");
      var data_body = document.getElementById("Data-body");

      json_tab.classList.add("active");
      json_body.classList.remove("d-none");
      data_tab.classList.remove("active");
      data_body.classList.add("d-none");
    },
    ChangeBodytoData() {
      var json_tab = document.getElementById("Json");
      var json_body = document.getElementById("Json-body");
      var data_tab = document.getElementById("Data");
      var data_body = document.getElementById("Data-body");

      json_tab.classList.remove("active");
      json_body.classList.add("d-none");
      data_tab.classList.add("active");
      data_body.classList.remove("d-none");
    },
    SetTextData(text) {
      this.jsonText = text;
    },
    ChangeJsonData(text) {
      document.getElementById("updated-text").style.display = "inline-block";
      localStorage.setItem("json_data", text);
      this.$store.dispatch("ChangeDetailCard");
      this.saveButton = true;
      this.renderChart++;
      this.$emit("renderChart", this.renderChart);
    },
    KeyUp() {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(this.DisplayNone, 3000, "updated-text");
    },
    KeyDown() {
      clearTimeout(this.typingTimer);
    },
    DisplayNone(id) {
      var item = document.getElementById(id);
      item.style.display = "none";
    },
    SaveFile(fileName) {
      var config = {
        headers: { "Content-Type": "application/json; charset=utf-8" },
      };

      var file_name = "";
      file_name = fileName;
      var file_content = localStorage.getItem("json_data");

      var jsonFileFormat = { file_name, file_content };

      var stringFile = JSON.stringify(jsonFileFormat);
      console.log(stringFile, file_content);
      axios
        .post("http://localhost:9000/api/savefile", stringFile, config)
        .then((response) => this.ToggleAlert(response.status));
    },
    ToggleAlert(status) {
      if (status == 200) {
        console.log("çalışıyor");
        var alert = document.getElementById("success-alert");
        alert.classList.remove("d-none");
        alert.classList.add("animate_animated", "animate__bounceIn");
        setTimeout(function() {
          alert.classList.add("d-none");
        }, 3000);
      }
    },
    RenderChart(event) {
      this.$emit("renderChart", event);
    },
  },
};
</script>

<style scoped>
.d-none {
  display: none;
}
.active {
  background-color: rgba(71, 85, 105, 1);
  color: rgba(147, 197, 253, 1);
  border-bottom: 1px solid rgba(37, 99, 235, 1);
}
.file-input-container {
  height: fit-content;
}
</style>
