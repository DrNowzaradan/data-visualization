<template>
  <li
    class=" w-10 h-10 text-center cursor-pointer  rounded-full transition-all flex justify-center items-center  relative "
  >
    <span
      :id="id"
      class="inline-block py-2 px-2  font-medium text-center transition-all "
      ><slot></slot
    ></span>
  </li>
</template>

<script>
export default {};
</script>

<style></style>
