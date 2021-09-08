<template>
  <v-app>
    <Navbar></Navbar>
    <v-main>
      <nuxt />
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Navbar from "@/components/backend/Navbar";
import Footer from "@/components/backend/Footer";
export default {
  name: "AdminDefaultLayout",
  components: {
    Navbar,
    Footer
  }
};
</script>