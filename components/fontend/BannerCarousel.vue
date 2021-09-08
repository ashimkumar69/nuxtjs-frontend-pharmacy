<template>
  <div>
    <v-carousel height="500" hide-delimiters show-arrows-on-hover cycle interval="3000">
      <v-carousel-item v-for="(slide, i) in bannercarousel" :key="i" :src="slide.picture">
        <v-overlay :opacity="opacity" :absolute="absolute"></v-overlay>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "BannerCarousel",
  data() {
    return {
      absolute: true,
      opacity: 0.1,
    };
  },
  computed: {
    ...mapGetters({ bannercarousel: "banners/getBanners" }),
  },
};
</script>