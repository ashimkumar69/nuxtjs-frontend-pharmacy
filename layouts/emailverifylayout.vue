<template>
  <v-app>
    <EmailVerifyNavbar></EmailVerifyNavbar>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import EmailVerifyNavbar from "@/components/backend/EmailVerifyNavbar";

export default {
  name: "Blank-Layout",
  components: {
    EmailVerifyNavbar
  }
};
</script>