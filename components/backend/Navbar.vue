<template>
  <div>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <a @click.stop="goIndexPage" class="d-flex align-center text-decoration-none">
        <v-img alt="Logo" class="mr-2" :src="footer.logo" width="30px" height="30px" />
        <span class="black--text">{{ footer.name }}</span>
      </a>

      <v-spacer></v-spacer>
      <template v-if="$auth.user.role == 'Super Admin' || $auth.user.role == 'Admin'">
        <v-btn icon to="/admin/notification">
          <v-badge
            v-if="user.notificationCount > 0"
            color="light-blue lighten-2"
            :content="user.notificationCount"
            overlap
          >
            <v-icon>fas fa-bell</v-icon>
          </v-badge>

          <v-icon v-else>fas fa-bell</v-icon>
        </v-btn>
       
      </template>
      <!-- 
        
       nav avator


      -->
      <v-menu offset-y transition="slide-x-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-badge bordered bottom color="light-blue lighten-2" dot offset-x="25" offset-y="20">
            <v-list-item-avatar size="40" role="button">
              <v-img v-if="user.avatar" v-bind="attrs" v-on="on" :src="user.avatar"></v-img>
            </v-list-item-avatar>
          </v-badge>
        </template>

        <v-card width="200px">
          <v-card-title class="d-flex justify-center">{{ user.name }}</v-card-title>

          <v-divider></v-divider>

          <v-list dense>
            <v-list-item-group v-model="model" color="light-blue lighten-2">
              <v-list-item dense v-for="(item, i) in adminNavs" :key="i" :to="item.to">
                <v-list-item-icon>
                  <v-icon small v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item dense @click.stop="logout">
                <v-list-item-icon>
                  <v-icon small>fas fa-sign-out-alt</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
    <!-- navigation -->

    <v-navigation-drawer v-model="drawer" clipped app>
      <v-list-item class="px-2 py-3">
        <v-badge bordered bottom color="light-blue lighten-2" dot offset-x="25" offset-y="20">
          <v-list-item-avatar size="40">
            <v-img v-if="user.avatar" :src="user.avatar"></v-img>
          </v-list-item-avatar>
        </v-badge>

        <v-list-item-title>{{ user.name }}</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <template v-for="(item, i) in adminDrawerNavs">
          <template v-if="item.children">
            <template v-if="item.role">
              <v-list-group
                color="light-blue lighten-2"
                :key="i"
                :prepend-icon="item.icon"
                no-action
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                  </v-list-item-content>
                </template>
                <template v-for="(subItem,i) in item.children">
                  <template v-if="subItem.role">
                    <v-list-item :key="i" @click.stop="goPage(subItem.to)">
                      <v-list-item-content>
                        <v-list-item-title v-text="subItem.name"></v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-icon>
                        <v-icon v-text="subItem.icon"></v-icon>
                      </v-list-item-icon>
                    </v-list-item>
                  </template>
                </template>
              </v-list-group>
            </template>
          </template>

          <template v-else>
            <template v-if="item.role">
              <v-list-item :key="i" @click.stop="goPage(item.to)">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </template>
        </template>
      </v-list>
    </v-navigation-drawer>

    <!-- end -->
  </div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  name: "Backend-Navbar",
  data() {
    return {
      model: null,
      drawer: true,
      adminNavs: [
        { name: "Profile", icon: "fas fa-user", to: "/admin/profile" },
        { name: "Settings", icon: "fas fa-cog", to: "/admin/setting" },
      ],
      adminDrawerNavs: [
        {
          name: "Dashboord",
          icon: "mdi-home-city",
          to: "/admin",
          role:
            this.$auth.user.role == "Super Admin" ||
            this.$auth.user.role == "Admin",
        },
        {
          name: "Dashboord",
          icon: "mdi-home-city",
          to: "/admin/userdashbord",
          role: this.$auth.user.role == "User",
        },
        {
          name: "Users",
          icon: "mdi-account-group-outline",
          to: "/admin/user",
          role:
            this.$auth.user.role == "Super Admin" ||
            this.$auth.user.role == "Admin",
        },
        {
          name: "Categories",
          icon: "fas fa-book",
          to: "/admin/categories",
          role:
            this.$auth.user.role == "Super Admin" ||
            this.$auth.user.role == "Admin",
        },
        {
          name: "Products",
          icon: "fas fa-box",
          children: [
            {
              icon: "fas fa-file",
              name: "Read",
              to: "/admin/products",
              role:
                this.$auth.user.role == "Super Admin" ||
                this.$auth.user.role == "Admin",
            },
            {
              icon: "fas fa-trash",
              name: "Trash",
              to: "/admin/products/trash",
              role:
                this.$auth.user.role == "Super Admin" ||
                this.$auth.user.role == "Admin",
            },
          ],
          role:
            this.$auth.user.role == "Super Admin" ||
            this.$auth.user.role == "Admin",
        },
        {
          name: "Blogs",
          icon: "fas fa-blog",
          children: [
            {
              icon: "fas fa-file",
              name: "Read",
              to: "/admin/blogs",
              role:
                this.$auth.user.role == "Super Admin" ||
                this.$auth.user.role == "Admin",
            },
            {
              icon: "fas fa-trash",
              name: "Trash",
              to: "/admin/blogs/trash",
              role:
                this.$auth.user.role == "Super Admin" ||
                this.$auth.user.role == "Admin",
            },
          ],
          role:
            this.$auth.user.role == "Super Admin" ||
            this.$auth.user.role == "Admin",
        },
        {
          name: "Contact",
          icon: "fas fa-address-card",
          children: [
            {
              icon: "fas fa-file",
              name: "Read",
              to: "/admin/contacts",
              role:
                this.$auth.user.role == "Super Admin" ||
                this.$auth.user.role == "Admin",
            },
            {
              icon: "fas fa-trash",
              name: "Trash",
              to: "/admin/contacts/trash",
              role:
                this.$auth.user.role == "Super Admin" ||
                this.$auth.user.role == "Admin",
            },
          ],
          role:
            this.$auth.user.role == "Super Admin" ||
            this.$auth.user.role == "Admin",
        },
        {
          name: "User Feedback",
          icon: "fas fa-comments",
          children: [
            {
              icon: "fas fa-file",
              name: "Give Feedback",
              to: "/admin/userfeedback",
              role: this.$auth.user.role == "User",
            },
            {
              icon: "fas fa-comments",
              name: "All Feedback",
              to: "/admin/userfeedback/allfeedback",
              role:
                this.$auth.user.role == "Super Admin" ||
                this.$auth.user.role == "Admin",
            },
          ],
          role:
            this.$auth.user.role == "Super Admin" ||
            this.$auth.user.role == "Admin" ||
            this.$auth.user.role == "User",
        },
        {
          name: "UI",
          icon: "fas fa-palette",
          children: [
            {
              icon: "fas fa-file",
              name: "Banner",
              to: "/admin/banners",
              role:
                this.$auth.user.role == "Super Admin" ||
                this.$auth.user.role == "Admin",
            },
            {
              icon: "fas fa-file",
              name: "Footer",
              to: "/admin/footer",
              role:
                this.$auth.user.role == "Super Admin" ||
                this.$auth.user.role == "Admin",
            },
          ],
          role:
            this.$auth.user.role == "Super Admin" ||
            this.$auth.user.role == "Admin",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({ user: "user/getUser", footer: "footer/getFooter" }),
  },
  methods: {
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
    goIndexPage() {
      this.$router.push("/");
    },
  },
};
</script>