export const actions = {
  async nuxtServerInit({ dispatch }) {
    try {
      if (this.$auth.loggedIn) {
        const user = await this.$axios.$get("/auth/user");

        dispatch("user/setUser", user.data);

        if (
          this.$auth.user.role == "Super Admin" ||
          this.$auth.user.role == "Admin"
        ) {
          const categories = await this.$axios.$get("/category");
          const products = await this.$axios.$get("/product");
          const blogs = await this.$axios.$get("/blog");

          dispatch("categories/setCategories", categories.data);
          dispatch("products/setProducts", products.data);
          dispatch("blogs/setBlogs", blogs.data);
        }
      }
      const banners = await this.$axios.$get("/bannerIndex");
      const footer = await this.$axios.$get("/footerIndex");
      const products = await this.$axios.$get("/productIndex");
      const allProducts = await this.$axios.$get("/allProductIndex");
      const categories = await this.$axios.$get("/categoryIndex");
      const userFeedback = await this.$axios.$get("/userFeedbackIndex");

      dispatch("banners/setBanners", banners.data);
      dispatch("footer/setFooter", footer.data);
      dispatch("products/setProducts", products.data);
      dispatch("fontendAllProducts/setProducts", allProducts.data);
      dispatch("fontendCategories/setCategories", categories.data);
      dispatch("feedback/setFeedbacks", userFeedback.data);
    } catch (error) {}
  }
};
