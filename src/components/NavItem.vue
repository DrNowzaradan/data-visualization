<template>
  <li>
    <a
      :href="href"
      :class="[
        'block px-4  py-3 rounded-md transition ease-in-out ',
        isActive
          ? ' bg-indigo-500 text-white hover:bg-indigo-600 '
          : '  text-indigo-50 hover:bg-indigo-200 hover:text-indigo-900',
      ]"
      ><slot></slot
    ></a>
  </li>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true,
    },
    isActive: Boolean,
  },
};
</script>

<style></style>
