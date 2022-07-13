<template>
  <div class="relative">
    <input
      id="fileinput"
      type="file"
      class=" relative  bg-slate-600 text-transparent  hover:border-gray-300  w-full h-24 lg:h-32 rounded-md border-2 border-dashed border-gray-400 outline-none focus:ring-0 focus:outline-none cursor-pointer text-sm transition-all"
      @change="GetFileName($event)"
      @dragenter="ChangeFileInputBg(true)"
      @dragleave="ChangeFileInputBg(false)"
      accept="application/json , application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    />
    <div
      class="absolute top-8 left-1/2 transform -translate-x-1/2 pointer-events-none text-slate-200 "
    >
      <div id="fileName" class="text-sm font-semibold">
        Dosya seçilmedi
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 block mx-auto mt-3 uploadicon "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        id="uploadicon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 block mx-auto mt-3 okicon d-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        id="okicon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M5 13l4 4L19 7"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 block mx-auto  erroricon mb-2 d-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        id="erroricon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
        <div class=" text-sm text-center mb-5 d-none" id="errormessage">
          Yanlış dosya türü, Json ya da Excel formatında dosya yükleyiniz.
        </div>
      </svg>
    </div>
    <span
      class="clear-icon-container rounded-full p-2 absolute right-2 bottom-2 cursor-pointer d-none"
      id="cleariconcontainer"
      @click="ClearFileInput"
      @mouseenter="DisplayTooltip(true, 'clear-tooltip')"
      @mouseleave="DisplayTooltip(false, 'clear-tooltip')"
    >
      <Tooltip id="clear-tooltip" class="d-none">Temizle</Tooltip>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6  clear-icon  rounded-full cursor-pointer d-none relative"
        id="clearicon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="rgba(254, 202, 202,1) "
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </span>
    <span
      class="save-icon-container rounded-full p-2 absolute right-16 bottom-2 cursor-pointer d-none"
      id="saveiconcontainer"
      @click="SendFileName"
      @mouseenter="DisplayTooltip(true, 'save-tooltip')"
      @mouseleave="DisplayTooltip(false, 'save-tooltip')"
    >
      <Tooltip id="save-tooltip" class="d-none">Kaydet</Tooltip>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6  save-icon  rounded-full cursor-pointer d-none relative "
        id="saveicon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="rgba(147, 197, 253,1) "
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
    </span>
  </div>
</template>

<script>
import Tooltip from "../components/Tooltip.vue";
import * as XLSX from "xlsx";
export default {
  components: {
    Tooltip,
  },
  data: function() {
    return {
      filetypeaccept: "application/json",
    };
  },
  methods: {
    GetFileName(e) {
      e.preventDefault();
      console.log(e.target.files[0].type);
      var file = e.target.files[0];
      var reader = new FileReader();
      var fileName = document.getElementById("fileName");
      if (e.target.files[0].type == "application/json") {
        fileName.innerHTML = file.name;

        reader.onload = this.logFile;

        reader.readAsText(file);
        this.DropFile();
      } else if (
        e.target.files[0].type ==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        file = e.target.files[0];
        reader = new FileReader();
        fileName = document.getElementById("fileName");
        fileName.innerHTML = file.name;
        reader.onload = this.LogExcel;

        reader.readAsBinaryString(file);
        this.DropFile();
      } else {
        this.ShowErrorMessage();
        localStorage.setItem("json_data", null);
        this.$emit("jsonTextData", null);
        this.$store.state.selectedCityData = [];
      }
    },
    LogExcel(event) {
      var data = event.target.result;
      var workbook = XLSX.read(data, {
        type: "binary",
      });
      var jsonObj = "";
      workbook.SheetNames.forEach((sheet) => {
        var rowObj = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );
        jsonObj = JSON.stringify(rowObj, undefined, 4);
        console.log(jsonObj);
        console.log(rowObj);
        localStorage.setItem("json_data", jsonObj);
      });
      this.$emit("jsonTextData", jsonObj);
    },
    ShowErrorMessage() {
      var errormessage = document.getElementById("errormessage");
      var erroricon = document.getElementById("erroricon");
      var fileInput = document.getElementById("fileinput");
      var uploadicon = document.getElementById("uploadicon");
      var fileName = document.getElementById("fileName");
      var okicon = document.getElementById("okicon");
      var clearicon = document.getElementById("clearicon");
      var saveicon = document.getElementById("saveicon");
      var cleariconcontainer = document.getElementById("cleariconcontainer");
      var saveiconcontainer = document.getElementById("saveiconcontainer");

      fileInput.style.border = "2px solid rgba(220, 38, 38,1)";
      fileInput.style.backgroundColor = null;
      uploadicon.classList.add("d-none");
      okicon.classList.add("d-none");
      clearicon.classList.add("d-none");
      saveicon.classList.add("d-none");
      erroricon.classList.add("animate_animated", "animate__bounceIn");
      erroricon.classList.remove("d-none");
      errormessage.classList.add("animate_animated", "animate__bounceIn");
      errormessage.classList.remove("d-none");
      cleariconcontainer.classList.add("d-none");
      saveiconcontainer.classList.add("d-none");
      fileName.classList.add("d-none");
      fileInput.value = null;
      console.log(fileInput.value);
    },
    logFile(event) {
      let str = event.target.result;
      localStorage.setItem("json_data", str);

      this.$emit("jsonTextData", str);
    },
    ChangeFileInputBg(isFileEntered) {
      var fileInput = document.getElementById("fileinput");
      if (isFileEntered) {
        fileInput.style.backgroundColor = "rgba(30, 41, 59,1)";
      } else {
        fileInput.style.backgroundColor = null;
      }
    },
    DropFile() {
      var fileInput = document.getElementById("fileinput");
      var okicon = document.getElementById("okicon");
      var uploadicon = document.getElementById("uploadicon");
      var clearicon = document.getElementById("clearicon");
      var saveicon = document.getElementById("saveicon");
      var errormessage = document.getElementById("errormessage");
      var erroricon = document.getElementById("erroricon");
      var fileName = document.getElementById("fileName");
      var cleariconcontainer = document.getElementById("cleariconcontainer");
      var saveiconcontainer = document.getElementById("saveiconcontainer");

      fileInput.style.backgroundColor = "rgba(71, 85, 105,1)";
      fileInput.style.border = "2px solid rgba(16, 185, 129,1)";
      okicon.classList.add("animate_animated", "animate__bounceIn");
      okicon.classList.remove("d-none");
      uploadicon.classList.add("d-none");
      clearicon.classList.remove("d-none");
      clearicon.classList.add("animate_animated", "animate__bounceIn");
      saveicon.classList.remove("d-none");
      saveicon.classList.add("animate_animated", "animate__bounceIn");
      erroricon.classList.add("d-none");
      errormessage.classList.add("d-none");
      fileName.classList.remove("d-none");
      cleariconcontainer.classList.remove("d-none");
      saveiconcontainer.classList.remove("d-none");
    },
    ClearFileInput() {
      var fileInput = document.getElementById("fileinput");
      var okicon = document.getElementById("okicon");
      var uploadicon = document.getElementById("uploadicon");
      var clearicon = document.getElementById("clearicon");
      var saveicon = document.getElementById("saveicon");
      var errormessage = document.getElementById("errormessage");
      var erroricon = document.getElementById("erroricon");
      var fileName = document.getElementById("fileName");
      var cleariconcontainer = document.getElementById("cleariconcontainer");
      var saveiconcontainer = document.getElementById("saveiconcontainer");
      fileInput.style.backgroundColor = null;
      fileInput.style.border = null;

      okicon.classList.add("d-none");
      uploadicon.classList.add("animate_animated", "animate__bounceIn");
      uploadicon.classList.remove("d-none");
      clearicon.classList.add("d-none");
      saveicon.classList.add("d-none");
      erroricon.classList.add("d-none");
      errormessage.classList.add("d-none");
      fileName.classList.remove("d-none");
      cleariconcontainer.classList.add("d-none");
      saveiconcontainer.classList.add("d-none");
      localStorage.setItem("json_data", null);
      this.$emit("jsonTextData", null);
      fileInput.value = null;
      fileName.innerHTML = "Dosya seçilmedi";
    },
    DisplayTooltip(display, id) {
      var tooltip = document.getElementById(id);

      if (display) {
        tooltip.classList.remove("d-none");
      } else {
        tooltip.classList.add("d-none");
      }
    },
    SendFileName() {
      var fileNameHtml = document.getElementById("fileName");
      var fileNameVal = fileNameHtml.innerHTML;
      this.$emit("SaveFile", fileNameVal);
    },
  },
};
</script>

<style scoped>
.file-input-container {
  height: fit-content;
  width: 600px;
}
#fileinput::-webkit-file-upload-button {
  display: none;
}
#fileinput {
  color: transparent;
}
.d-none {
  display: none;
}
.save-icon-container,
.clear-icon-container {
  transition: background-color 0.3s;
}
.clear-icon-container:hover {
  background-color: rgba(127, 29, 29, 0.4);
}
.save-icon-container:hover {
  background-color: rgba(30, 58, 138, 0.6);
}
</style>
