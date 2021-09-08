<template>
  <div>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
export default {
  name: "Products-Parent",
  middleware: "allowSuperAdminOrAdmin",
};
</script>

<style>
</style>