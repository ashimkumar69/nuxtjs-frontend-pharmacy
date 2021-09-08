<template>
  <div>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
export default {
  name: "User-Parent",
  middleware: "allowSuperAdminOrAdmin",
};
</script>

<style>
</style>