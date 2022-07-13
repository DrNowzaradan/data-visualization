<template>
  <span
    :id="id"
    class=" whitespace-nowrap inline-flex h-10 tooltip-info py-2 px-4 text-xs absolute -top-12 left-1/2 transform -translate-x-1/2 bg-violet-200 text-slate-900  justify-center items-center rounded-md font-bold"
  >
    <span
      class="absolute w-2 h-2 -bottom-1 left-1/2 transform -translate-x-1/2 bg-violet-200 rotate-45"
    ></span>
    <slot></slot>
  </span>
</template>

<script>
import "../../node_modules/animate.css";
export default {};
</script>

<style></style>
