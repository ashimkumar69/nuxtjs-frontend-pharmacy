<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card color="light-blue lighten-2">
            <v-card-title class="white--text">Welcome {{user.name}}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "UserDashbord",
  middleware: "allowUser",
  created() {
    this.$store.dispatch("user/fetchUser");
  },
  computed: {
    ...mapGetters({
      user: "user/getUser",
    }),
  },
};
</script>

<style>
</style>