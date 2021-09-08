<template>
  <div>
    <v-app-bar app>
      <v-container class="d-flex align-center">
        <a @click.stop="goIndexPage" class="d-flex align-center text-decoration-none">
          <v-img
            v-if="footer.logo"
            alt="Logo"
            class="mr-2"
            :src="footer.logo"
            width="30px"
            height="30px"
          />
          <span v-if="footer.name" class="black--text">{{ footer.name }}</span>
        </a>

        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click="drawer = true" class="hidden-md-and-up"></v-app-bar-nav-icon>
        <v-sheet class="hidden-sm-and-down">
          <template v-for="item in navs">
            <v-btn
              active-class="light-blue--text text--lighten-2"
              text
              class="mr-2"
              :key="item.id"
              :to="item.to"
            >
              <v-icon small>{{ item.icon }}</v-icon>
              <span class="ml-2 text-capitalize">{{ item.name }}</span>
            </v-btn>
          </template>
          <template v-if="this.$auth.loggedIn">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-badge
                  bordered
                  bottom
                  color="light-blue lighten-2"
                  dot
                  offset-x="25"
                  offset-y="20"
                >
                  <v-list-item-avatar size="40" role="button">
                    <v-img v-if="user.avatar" v-bind="attrs" v-on="on" :src="user.avatar"></v-img>
                  </v-list-item-avatar>
                </v-badge>
              </template>

              <v-list dense>
                <v-list-item to="/admin">
                  <v-list-item-content>
                    <v-list-item-title class="text-capitalize">Dashbord</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click.stop="logout">
                  <v-list-item-content>
                    <v-list-item-title class="text-capitalize">Logout</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
          <template v-else>
            <v-btn outlined color="light-blue lighten-2" :to="{name:'login'}">
              <v-icon small>fas fa-sign-in-alt</v-icon>
              <span class="ml-2 text-capitalize">Login</span>
            </v-btn>
          </template>
        </v-sheet>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-item>
          <v-list-item-icon class="mr-2">
            <v-img src="/images/favicon/favicon.webp" width="30px"></v-img>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Pharmacy</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
      <v-list>
        <v-list-item-group v-model="model" color="light-blue lighten-2">
          <v-list-item v-for="(item, i) in drawerNavs" :key="i" @click.stop="goPage(item.to)">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
      model: null,
      navs: [
        {
          id: 1,
          name: "All Medicine",
          icon: "fas fa-file-medical",
          to: "/products",
        },
        { id: 2, name: "Blogs", icon: "fas fa-blog", to: "/blogs" },
        {
          id: 3,
          name: "Contact Us",
          icon: "fas fa-address-card",
          to: "/contact",
        },
      ],
      drawerNavs: [
        {
          id: 1,
          name: "Home",
          icon: "fas fa-home",
          to: "/",
        },
        {
          id: 2,
          name: "All Medicine",
          icon: "fas fa-file-medical",
          to: "/products",
        },
        { id: 3, name: "Blogs", icon: "fas fa-blog", to: "/blogs" },
        {
          id: 4,
          name: "Contact Us",
          icon: "fas fa-address-card",
          to: "/contact",
        },
        {
          id: 5,
          name: "Login",
          icon: "fas fa-sign-in-alt",
          to: "/login",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({ user: "user/getUser", footer: "footer/getFooter" }),
  },
  methods: {
    goIndexPage() {
      this.$router.push("/");
    },
    goPage(to) {
      this.$router.push(`${to}`);
    },
    logout() {
      this.$auth.logout("local").then(() => {
        this.$toast.success("Successfully Logout", {
          duration: 5000,
          action: {
            text: "Cancel",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>