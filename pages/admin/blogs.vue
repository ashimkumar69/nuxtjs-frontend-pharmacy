<template>
  <div>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
export default {
  name: "Blogs-Parent",
  middleware: "allowSuperAdminOrAdmin",
};
</script>

<style>
</style>