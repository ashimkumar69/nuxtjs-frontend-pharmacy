<template>
  <div>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
export default {
  name: "Contacts-Parent",
  middleware: "allowSuperAdminOrAdmin",
};
</script>

<style>
</style>