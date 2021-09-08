<template>
  <div>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
export default {
  name: "Admin-Parent",
  layout: "adminDefault",
  middleware: "isEmailVerifyed"
  
};
</script>

<style>
</style>