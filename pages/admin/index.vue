<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="3" lg="3">
          <v-card color="light-blue lighten-2">
            <v-card-title class="white--text">Total User</v-card-title>
            <v-card-subtitle class="white--text">{{ totalDetailsIndex.User }}</v-card-subtitle>
            <v-card-actions>
              <v-btn text class="white--text" to="/admin/user">See User</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3" lg="3">
          <v-card color="light-blue lighten-2">
            <v-card-title class="white--text">Total Product</v-card-title>
            <v-card-subtitle class="white--text">{{ totalDetailsIndex.Product }}</v-card-subtitle>
            <v-card-actions>
              <v-btn text class="white--text" to="/admin/products">See Product</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3" lg="3">
          <v-card color="light-blue lighten-2">
            <v-card-title class="white--text">Total Contact</v-card-title>
            <v-card-subtitle class="white--text">{{ totalDetailsIndex.Contact }}</v-card-subtitle>
            <v-card-actions>
              <v-btn text class="white--text" to="/admin/contacts">See Contact</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3" lg="3">
          <v-card color="light-blue lighten-2">
            <v-card-title class="white--text">Total Feedback</v-card-title>
            <v-card-subtitle class="white--text">{{ totalDetailsIndex.UserFeedback }}</v-card-subtitle>
            <v-card-actions>
              <v-btn text class="white--text" to="/admin/userfeedback/allfeedback">See Feedback</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Admin-Chield",
  middleware: "allowSuperAdminOrAdmin",
  data() {
    return {
      totalDetailsIndex: {},
    };
  },
  async asyncData({ store, $axios }) {
    try {
      const totalDetailsIndex = await $axios.$get("/totalDetailsIndex");
      store.dispatch("user/fetchUser");
      store.dispatch("categories/fetchCategories");
      store.dispatch("products/fetchProducts");
      store.dispatch("blogs/fetchBlogs");
      return {
        totalDetailsIndex: totalDetailsIndex,
      };
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style>
</style>