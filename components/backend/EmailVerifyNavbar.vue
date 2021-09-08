<template>
  <div>
    <v-app-bar app clipped-left>
      <v-toolbar-title>Pharmacy</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- 
        
       nav avator


      -->
      <v-menu offset-y transition="slide-x-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-badge bordered bottom color="light-blue lighten-2" dot offset-x="25" offset-y="20">
            <v-list-item-avatar size="40" role="button">
              <v-img v-bind="attrs" v-on="on" v-if="user.avatar" :src="user.avatar"></v-img>
            </v-list-item-avatar>
          </v-badge>
        </template>
        <v-btn class="text-capitalize" color="light-blue lighten-2" dark @click.stop="logout">
          <v-icon small>fas fa-sign-out-alt</v-icon>
          <span class="ml-2">Logout</span>
        </v-btn>
      </v-menu>
    </v-app-bar>

    <!-- end -->
  </div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  name: "Blank-Navbar",
  computed: {
    ...mapGetters({ user: "user/getUser" }),
  },
  methods: {
    logout() {
      this.$auth.logout("local").then(() => {
        this.$toast.success("Successfully Logout");
      });
    },
  },
};
</script>