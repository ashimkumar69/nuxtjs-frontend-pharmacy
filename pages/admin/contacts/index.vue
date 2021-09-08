<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :search="search"
            :headers="headers"
            :items="contacts"
            class="elevation-1"
            show-expand
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Contacts</v-toolbar-title>
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
                    label="Search by Name and Subject"
                    type="text"
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:no-data>No Data</template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <v-card flat color="grey lighten-4">
                  <v-card-text>
                    <v-list color="grey lighten-4">
                      <v-subheader>Contact Details</v-subheader>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Name: {{item.name}}</v-list-item-title>
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
                          <v-list-item-title>Subject: {{item.subject}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Comment:</v-list-item-title>
                          <v-list-item-title v-html="item.comment"></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      v-if="item.file.file !== null"
                      dark
                      color="light-blue lighten-2"
                      @click="getContactFile(item.file)"
                    >
                      <v-icon class="mr-2">fas fa-cloud-download-alt</v-icon>
                      <span>Download</span>
                    </v-btn>
                  </v-card-actions>
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
// import { mapGetters } from "vuex";
export default {
  name: "Contacts-Child",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        { text: "Subject", value: "subject" },
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
      contacts: [],
    };
  },
  async asyncData({ store, $axios }) {
    try {
      const contacts = await $axios.$get("/contact");
      return {
        contacts: contacts.data,
      };
    } catch (error) {
      console.log(error);
    }
  },
  // created() {
  //   this.$store.dispatch("contacts/fetchContacts");
  // },
  // computed: {
  //   ...mapGetters({ contacts: "contacts/getContacts" }),
  // },
  methods: {
    deleteItem(item) {
      this.$toast.error("Are you sure you want to delete this item?", {
        action: [
          {
            text: "Delete",
            onClick: (e, toastObject) => {
              this.$axios
                .$delete(`/contact/${item.id}`)
                .then((res) => {
                  this.contacts = res.data;

                  toastObject.goAway(0);
                  this.$toast.success("Successfully Contact Deleted", {
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
          {
            text: "Cancel",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        ],
      });
    },
    getContactFile(file) {
      this.$axios
        .$get(`contactFileDownload/${file.id}`, {
          responseType: "blob",
        })
        .then((res) => {
          let blob = new Blob([res], { type: "application/zip" });
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = file.file;
          link.click();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>