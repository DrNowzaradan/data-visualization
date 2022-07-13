<template>
  <router-view></router-view>
</template>

<script>
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap");

* {
  scroll-behavior: smooth;
  font-family: "Nunito", sans-serif;
}
*::-webkit-scrollbar {
  width: 5px;
}

*::-webkit-scrollbar-thumb {
  border-radius: 50px;
  background: #b3b3b3;
}

*::-webkit-scrollbar-thumb:hover {
  background: #666666;
}
</style>
