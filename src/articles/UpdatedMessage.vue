<template>
  <div
    :id="id"
    class="absolute top-10 right-10 font-semibold text-sm text-slate-300 animate_animated animate__bounceIn transition-all  d-none"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.d-none {
  display: none;
}
</style>
