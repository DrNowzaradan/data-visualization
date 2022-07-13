<template>
  <div class="wrapper bg-slate-900 h-screen overflow-hidden" id="wrapper">
    <Toast id="toast"></Toast>
    <Nav class=" z-10">
      <div class="flex space-x-3">
        <NavItem href="/Home">Anasayfa</NavItem>
        <NavItem href="/Map_graphics">Harita</NavItem>
        <NavItem href="/Contact">İletişim</NavItem>
        <NavItem href="/Sign" isActive>Giriş yap</NavItem>
      </div>

      <div class="dropdown-container absolute right-40 ">
        <button
          type="button"
          id="dropdown-btn"
          class="relative px-4 py-3 bg-violet-300 rounded-md flex"
        >
          Profil
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <ul
          id="dropdown-list"
          class=" w-32 bg-white p-1 block rounded-md absolute left-0 mt-2 d-none animate_animated animate__bounceIn animate__faster"
        >
          <li
            class="text-sm flex w-full justify-between hover:bg-blue-500 hover:text-white rounded-md px-2 py-1 cursor-pointer mb"
          >
            Ayarlar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-6 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </li>
          <li
            class="text-sm flex w-full justify-between hover:bg-red-500 hover:text-white rounded-md px-2 py-1 cursor-pointer mt-1"
          >
            Çıkış yap
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </li>
        </ul>
      </div>
    </Nav>

    <div
      id="signInform"
      class=" w-1/4 bg-slate-700 py-4 px-8 block mx-auto mt-20 rounded-md relative form animate_animated animate__fadeInUp"
    >
      <div class="text-slate-300 text-xl text-center mt-3 mb-8">Giriş yap</div>
      <div class="text-lg text-slate-300 mb-3">Email</div>
      <input
        type="email"
        class="w-full bg-slate-500 rounded-md mb-4 text-white "
        required
        v-model="signInemail"
        autocomplete="new-email"
      />
      <div class="text-lg text-slate-300 mb-3">Şifre</div>
      <input
        type="password"
        class="w-full bg-slate-500 rounded-md mb-10 text-white "
        required
        v-model="signInpass"
        autocomplete="new-password"
      />
      <button
        @click="SignIn"
        class="w-1/2 bg-violet-300 rounded-md p-2 block mx-auto mb-10 hover:bg-violet-500 hover:text-white transition-all"
      >
        Giriş yap
      </button>
      <fieldset><legend class="px-2 text-slate-300">ya da</legend></fieldset>
      <div class="text-center text-slate-300 mb-3">
        Hesabın yok mu?
        <button
          @click="SwitchForms('signUpform')"
          class="text-violet-300 hover:underline"
        >
          Kayıt ol.
        </button>
      </div>
      <span
        class="absolute top-7 right-7 text-violet-300 cursor-pointer"
        @mouseenter="DisplayTooltip(true, 'signIninfo')"
        @mouseleave="DisplayTooltip(false, 'signIninfo')"
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
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <Tooltip id="signIninfo" class="d-none ">
          Uygulamayı kullanmak için hesap oluşturmanız ya da giriş yapmanız
          zorunlu değildir.
        </Tooltip>
      </span>
    </div>

    <div
      id="signUpform"
      class=" w-1/4 bg-slate-700 py-4 px-8 block mx-auto mt-20 rounded-md relative form  d-none animate_animated animate__fadeInUp"
    >
      <div class="text-slate-300 text-xl text-center mt-3 mb-8">Kayıt ol</div>

      <div class="text-lg text-slate-300 mb-3">İsim</div>
      <input
        type="text"
        class="w-full bg-slate-500 rounded-md mb-4 text-white "
        v-model="signUp_name"
        required
      />
      <div class="text-lg text-slate-300 mb-3">Soyisim</div>
      <input
        type="text"
        class="w-full bg-slate-500 rounded-md mb-4 text-white "
        v-model="signUp_surname"
        required
      />
      <div class="text-lg text-slate-300 mb-3">Email</div>
      <input
        type="email"
        class="w-full bg-slate-500 rounded-md mb-4 text-white "
        v-model="signUp_email"
        required
        autocomplete="new-email"
      />
      <div class="text-lg text-slate-300 mb-3">Şifre</div>
      <input
        type="password"
        class="w-full bg-slate-500 rounded-md mb-10 text-white "
        v-model="signUp_pass"
        required
        autocomplete="new-password"
      />
      <button
        class="w-1/2 bg-violet-300 rounded-md p-2 block mx-auto mb-10 hover:bg-violet-500 hover:text-white transition-all"
        @click="CheckUser"
      >
        Kayıt ol
      </button>

      <div class="text-center text-slate-300 mb-3">
        Hesabın var mı?
        <button
          @click="SwitchForms('signInform')"
          class="text-violet-300 hover:underline"
        >
          Giriş yap.
        </button>
      </div>
      <span
        class=" absolute top-7 right-7 text-violet-300 cursor-pointer"
        @mouseenter="DisplayTooltip(true, 'signUpinfo')"
        @mouseleave="DisplayTooltip(false, 'signUpinfo')"
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
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <Tooltip id="signUpinfo" class="d-none ">
          Uygulamayı kullanmak için hesap oluşturmanız ya da giriş yapmanız
          zorunlu değildir.
        </Tooltip>
      </span>
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
import axios from "axios";
import "../../node_modules/animate.css";
import Nav from "../articles/Nav.vue";
import NavItem from "../components/NavItem.vue";
import Tooltip from "../components/Tooltip.vue";
import Toast from "../components/Toast.vue";
import CryptoJs from "../../node_modules/crypto-js";
export default {
  components: {
    Nav,
    NavItem,
    Tooltip,
    Toast,
  },

  data: function() {
    return {
      signUp_name: "",
      signUp_surname: "",
      signUp_email: "",
      signUp_pass: "",
      signIn_email: "",
      signIn_pass: "",
      userExist: null,
    };
  },
  mounted() {
    var dropdown_btn = document.getElementById("dropdown-btn");
    var dropdown_list = document.getElementById("dropdown-list");
    dropdown_btn.addEventListener("focusin", () => {
      dropdown_list.classList.remove("d-none");
    });
    dropdown_btn.addEventListener("focusout", () => {
      dropdown_list.classList.add("d-none");
    });
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
    SwitchForms(id) {
      var forms = document.getElementsByClassName("form");
      var formToDisplay = document.getElementById(id);
      for (let i = 0; i < forms.length; i++) {
        forms[i].classList.add("d-none");
      }
      formToDisplay.classList.remove("d-none");
    },
    SignIn() {
      //;
    },
    SignUp() {
      var config = {
        headers: { "Content-Type": "application/json; charset=utf-8" },
      };
      var kullanici_isim = this.signUp_name;
      var kullanici_soyisim = this.signUp_surname;
      var kullanici_email = this.signUp_email;
      var kullanici_sifre = CryptoJs.HmacSHA1(
        this.signUp_pass,
        this.$store.getters.getCryptoKey
      ).toString();
      var kullanici_data = {
        kullanici_isim,
        kullanici_soyisim,
        kullanici_email,
        kullanici_sifre,
      };
      var strKullanici = JSON.stringify(kullanici_data);
      axios
        .post("http://localhost:9000/api/adduser", strKullanici, config)
        .then((response) => {
          console.log(response);
        });

      this.DisplayToast(
        "Kaydınız başarıyla Gerçekleşti 👍",
        "rgba(110, 231, 183,1)"
      );
      location.href = "/Map_graphics";
    },
    async CheckUser() {
      var kullanici_email = this.signUp_email;
      var config = {
        headers: { "Content-Type": "application/json; charset=utf-8" },
      };
      var email = { kullanici_email };
      var strCheckingEmail = JSON.stringify(email);
      await axios
        .post("http://localhost:9000/api/checkuser", strCheckingEmail, config)
        .then((response) => {
          this.userExist = response.data;
        });
      if (this.userExist) {
        this.DisplayToast(
          "Bu email ile kayıtlı bir hesap zaten mevcut!",
          "rgba(252, 165, 165,1)"
        );
      } else {
        this.SignUp();
      }
    },
    DisplayToast(toastMessage, bgColor) {
      var toast = document.getElementById("toast");
      toast.innerHTML = toastMessage;
      toast.classList.remove("d-none");
      toast.classList.add("animate_animated", "animate__bounceIn");
      toast.style.backgroundColor = bgColor;
      setTimeout(function() {
        toast.classList.add("d-none");
      }, 3000);
    },
  },
};
</script>

<style scoped>
.d-none {
  display: none;
}

.form {
  z-index: 10;
  animation-duration: 0.5s;
}
fieldset {
  border: 1px solid transparent;
  border-top-color: rgba(100, 116, 139, 1);
  box-sizing: border-box;
  grid-area: 1 / 1;
  padding: 10px;
  text-align: center;
  width: 100%;
}
#dropdown-btn:focus #dropdown-list {
  display: block;
}
#dropdown-list {
  --animate-duration: 800ms;
}
</style>
<!--
<div class="bg-slate-900 h-screen overflow-hidden">
    <Nav class=" z-10">
      <NavItem href="/Home">Anasayfa</NavItem>
      <NavItem href="/Map_graphics">Harita</NavItem>
      <NavItem href="/Contact">İletişim</NavItem>
      <NavItem href="/Sign" isActive>Giriş yap</NavItem>
    </Nav>
    <div class="flex justify-center items-center w-full  gap-36">
      <div class="text-center ">
        <div class="text-white text-4xl ">
          Yakında geliyor
        </div>
        <div class=" text-xl text-slate-300 mt-10">
          Bu sayfa henüz hazır değil. Ama en kısa sürede kullanıma sunulacak.
          <br />
          Anlayışınız için teşekkürler 👍.
        </div>
      </div>
      <img src="../assets/web_development.png" alt="" class=" w-2/5" />
    </div>
    <div
      class=" w-56 h-56 absolute rounded-full bottom-0 left-1/3 transform -translate-x-1/2  filter blur-3xl bg-blue-900 brightness-75"
    ></div>
    <div
      class=" w-56 h-56 absolute rounded-full top-0 right-0 transform -translate-x-1/2  filter blur-3xl bg-blue-900 brightness-75"
    ></div>
  </div>

  


    
-->
