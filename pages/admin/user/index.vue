<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :search="search"
            :headers="headers"
            :items="users"
            class="elevation-1"
            show-expand
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>All User</v-toolbar-title>
              </v-toolbar>
              <v-toolbar flat color="white">
                <v-spacer></v-spacer>
                <v-col cols="12" sm="10" md="8" lg="6">
                  <v-text-field
                    v-model="search"
                    color="light-blue lighten-2"
                    append-icon="mdi-magnify"
                    outlined
                    dense
                    clear-icon="mdi-close-circle"
                    clearable
                    label="Search by Name"
                    type="text"
                    class="mr-2"
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-icon small @click="userSetting(item)">fas fa-user-cog</v-icon>
            </template>
            <template v-slot:no-data>No Data</template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <v-card flat color="grey lighten-4">
                  <v-card-subtitle>User Details</v-card-subtitle>
                  <v-avatar tile size="100" class="ml-7">
                    <v-img :src="item.avatar"></v-img>
                  </v-avatar>

                  <v-card-text>
                    <v-list color="grey lighten-4">
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Name: {{item.name}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Role: {{item.role}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Email: {{item.email}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Phone: {{item.phone}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Address: {{item.address}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Created: {{item.created_at}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </td>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>



<script>
export default {
  name: "User-Chield",

  data() {
    return {
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        { text: "Email", value: "email", sortable: false, filterable: false },
        { text: "Phone", value: "phone", sortable: false, filterable: false },
        {
          text: "Created At",
          value: "created_at",

          filterable: false,
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          filterable: false,
        },
        { text: "", value: "data-table-expand" },
      ],
      users: [],
    };
  },
  async asyncData({ store, $axios }) {
    try {
      const userIndex = await $axios.$get("/userIndex");

      return {
        users: userIndex.data,
      };
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    userSetting(item) {
      if (this.$auth.user.role == "Super Admin") {
        this.$router.push({ name: "admin-user-id", params: { id: item.id } });
      } else {
        this.$toast.error("You Are not Authorished", {
          duration: 5000,
          action: {
            text: "Cancel",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        });
      }
    },
  },
};
</script>