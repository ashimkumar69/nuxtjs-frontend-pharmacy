<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :search="search"
            :headers="headers"
            :items="user"
            sort-by="name"
            class="elevation-1"
            show-expand
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Role Management</v-toolbar-title>
              </v-toolbar>
            </template>
            <template v-slot:item.role="{ item }">
              <v-col cols="4">
                <v-select
                  v-model="form.role"
                  :items="role"
                  item-text="name"
                  item-value="id"
                  label="Select Role"
                  dense
                  outlined
                  clearable
                  hide-details
                ></v-select>
              </v-col>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="addRole(item)">fas fa-check</v-icon>
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
  name: "Single-User",

  data() {
    return {
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        { text: "Role", value: "role", filterable: false },

        {
          text: "Actions",
          value: "actions",
          sortable: false,
          filterable: false,
        },
        { text: "", value: "data-table-expand" },
      ],
      user: [],
      role: [
        { id: 2, name: "Admin" },
        { id: 3, name: "User" },
      ],
      form: {
        role: null,
      },
    };
  },

  async asyncData({ store, $axios, params }) {
    try {
      const user = await $axios.$get(`/getUser/${params.id}`);

      return {
        user: user.data,
      };
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    addRole(item) {
      this.$axios
        .$post("/addRoleToUsers", {
          id: item.id,
          role: this.form.role,
        })
        .then((res) => {
          this.user = res.data;

          this.$toast.success("Successfully Added Role", {
            duration: 5000,
            action: {
              text: "Cancel",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>