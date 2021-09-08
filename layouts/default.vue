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
import Navbar from "@/components/fontend/Navbar";
import Footer from "@/components/fontend/Footer";

export default {
  name: "DefaultLayout",
  components: {
    Navbar,
    Footer
  }
};
</script>