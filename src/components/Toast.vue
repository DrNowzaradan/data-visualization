<template>
  <div
    class="px-5 py-3 text-center bg-emerald-300 rounded-md text-black absolute z-10 d-none top-5 right-5 flex"
    :id="id"
  >
    <slot></slot>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6   okicon "
      fill="none"
      viewBox="0 0 24 24"
      stroke="black"
      stroke-width="2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
