<template>
  <div>
    <BannerCarousel></BannerCarousel>
    <AboutOrder></AboutOrder>
    <MedicineSlider></MedicineSlider>
    <CustomerFeedback></CustomerFeedback>
  </div>
</template>

<script>
import BannerCarousel from "@/components/fontend/BannerCarousel";
import AboutOrder from "@/components/fontend/AboutOrder";
import MedicineSlider from "@/components/fontend/MedicineSlider";
import CustomerFeedback from "@/components/fontend/CustomerFeedback";

export default {
  name: "Home",
  auth: false,
  components: {
    BannerCarousel,
    AboutOrder,
    MedicineSlider,
    CustomerFeedback,
  },
};
</script>

<style>
</style>