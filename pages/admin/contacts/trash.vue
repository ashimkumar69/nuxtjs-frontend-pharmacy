
<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-data-table
            v-model="selected"
            show-select
            :search="search"
            :headers="headers"
            :items="contacts"
            sort-by="title"
            class="elevation-1"
            show-expand
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Contacts Trash</v-toolbar-title>
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
              <v-icon small class="mr-2" @click="restore(item.id)">fas fa-trash-restore</v-icon>
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
            <template v-slot:body.append v-if="selected.length > 0">
              <v-btn icon class="ml-3">
                <v-icon color="red" small @click="deleteItem">fas fa-trash</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>



<script>
export default {
  name: "Contacts-Trash",
  data() {
    return {
      dialog: false,
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        { text: "Subject", value: "subject" },

        {
          text: "Actions",
          value: "actions",
          sortable: false,
          filterable: false,
        },
        { text: "", value: "data-table-expand" },
      ],
      contacts: [],
      selected: [],
    };
  },
  async asyncData({ $axios }) {
    try {
      const contacts = await $axios.$get("/contactTrash");

      return { contacts: contacts.data };
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    deleteItem() {
      const selected = this.selected.map((item) => item.id);
      this.$toast.error("Are you sure you want to delete this item?", {
        action: [
          {
            text: "Delete",
            onClick: (e, toastObject) => {
              this.$axios
                .$post("/contactForceDelete", { selected: selected })
                .then((res) => {
                  this.contacts = res.data;
                  this.selected = [];
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
    restore(id) {
      try {
        this.$axios.$post("/contactRestore", { id: id }).then((res) => {
          this.contacts = res.data;
          this.$toast.success("Successfully Contact Restore", {
            duration: 5000,
            action: {
              text: "Cancel",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>