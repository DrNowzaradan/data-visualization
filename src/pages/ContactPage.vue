<template>
  <div class="bg-slate-900 h-screen overflow-hidden ">
    <Nav class=" z-10">
      <NavItem href="/Home">Anasayfa</NavItem>
      <NavItem href="/Map_graphics">Harita</NavItem>
      <NavItem href="/Contact" isActive>İletişim</NavItem>
      <NavItem href="/Sign">Giriş yap</NavItem>
    </Nav>
    <div class="block mx-auto mt-20 w-1/4">
      <div class="text-slate-300 text-center text-md flex justify-between">
        <div
          class=" bg-slate-600  rounded-md block py-3 px-5  transform hover:scale-105 hover:text-white hover:bg-slate-700 transition-all mb-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mx-auto mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <a href="tel:+905345687236" class=" hover:underline">+905345687236</a>
        </div>
        <div
          class=" bg-slate-600  rounded-md block py-3 px-5 transform hover:scale-105 hover:text-white hover:bg-slate-700 transition-all mb-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mx-auto mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
          <span>enesaltan2209@gmail.com</span>
        </div>
      </div>
      <form
        action="mailto:enesaltan1907@gmail.com"
        method="post"
        enctype="text/plain"
        class=" bg-slate-600 w-full py-4 px-8  rounded-md z-50 relative animate_animated animate__fadeInUp"
      >
        <div class="text-lg text-slate-300 mb-3">İsim</div>
        <input
          name="name"
          type="text"
          class="w-full bg-slate-500 rounded-md mb-4 text-white "
        />
        <div class="text-lg text-slate-300 mb-3">Email</div>
        <input
          name="mail"
          type="email"
          class="w-full bg-slate-500 rounded-md mb-4 text-white "
        />
        <div class="text-lg text-slate-300 mb-2">Yorum</div>
        <textarea
          name="comment"
          id="jsontext-area"
          class=" resize-none w-full h-44 bg-slate-500 rounded-md border border-slate-500 mt-2 font-mono text-slate-200 placeholder-slate-200 "
          placeholder="Yorum, istek veya şikayetinizi bu alanda belirtin.."
          spellcheck="false"
        >
        </textarea>
        <div class=" mt-4 w-full flex justify-center gap-10">
          <input
            class=" py-2 px-4 rounded-md bg-emerald-400 hover:bg-emerald-500 transition-all cursor-pointer"
            type="submit"
            value="Gönder"
          />
          <button
            class="py-2 px-4 rounded-md bg-amber-300 hover:bg-amber-500 transition-all cursor-pointer"
            type="button"
            @click="ResetForm"
          >
            Temizle
          </button>
        </div>
      </form>
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
import Nav from "../articles/Nav.vue";
import NavItem from "../components/NavItem.vue";
import "../../node_modules/animate.css";
export default {
  components: { Nav, NavItem },
};
</script>

<style></style>
