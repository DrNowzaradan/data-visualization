<template>
  <Nav class=" z-10">
    <NavItem href="/Home" isActive>Anasayfa</NavItem>
    <NavItem href="/Map_graphics">Harita</NavItem>
    <NavItem href="/Contact">İletişim</NavItem>
    <NavItem href="/Sign">Giriş yap</NavItem>
  </Nav>
  <div class="landing-content flex items-center ">
    <video class="videoBG" poster="poster.JPG" autoplay muted loop>
      <source src="../assets/landing_footage.mp4" type="video/mp4" />
    </video>
    <div class="landing-text-area ml-32">
      <div class="landing-text text-6xl text-white font-medium ">
        Verinle istediğin grafiği oluştur.
      </div>
      <div class=" text-white text-xl mt-5">
        Verini onlarca farklı grafik üzerinde görüntüleyebilir ve kopyasını
        indirebilirsin.
      </div>
      <a
        type="button"
        href="/map_graphics"
        class="transition ease-in-out px-6 py-3 mt-10 text-lg font-medium text-blue-50 bg-teal-600 rounded-md shadow-lg hover:bg-teal-100 hover:text-teal-900"
      >
        Hemen Başla
      </a>
    </div>
  </div>
</template>

<script>
import Nav from "../articles/Nav.vue";
import NavItem from "../components/NavItem.vue";
export default {
  components: { Nav, NavItem },
};
</script>

<style>
.landing-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 70%,
    rgba(0, 0, 0, 0) 100%
  );
}
video {
  position: fixed;
  width: 100%;
  z-index: -1;
  filter: brightness(50%);
  top: -60px;
}
</style>
