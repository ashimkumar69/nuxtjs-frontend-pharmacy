<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :search="search"
            :headers="headers"
            :items="userfeedback"
            class="elevation-1"
            show-expand
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>All Feedback</v-toolbar-title>
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
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-toolbar>
            </template>
            <template v-slot:item.published="{ item }">
              <v-chip v-if="item.published" class="ma-2" color="green" text-color="white">Approved</v-chip>
              <v-chip v-else class="ma-2" color="red" text-color="white">Unapproved</v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon
                v-if="item.published"
                small
                class="mr-2"
                @click="approveOrNot(item)"
              >fas fa-thumbs-down</v-icon>
              <v-icon v-else small class="mr-2" @click="approveOrNot(item)">fas fa-thumbs-up</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:no-data>No Data</template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <v-card flat color="grey lighten-4">
                  <v-card-subtitle>User Feedback Details</v-card-subtitle>
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
                          <v-list-item-title>
                            Stars:
                            <v-rating
                              half-increments
                              readonly
                              color="light-blue lighten-2"
                              :value="item.stars"
                            ></v-rating>
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>
                            Published:
                            <v-chip
                              v-if="item.published"
                              class="ma-2"
                              color="green"
                              text-color="white"
                            >Approved</v-chip>
                            <v-chip v-else class="ma-2" color="red" text-color="white">Unapproved</v-chip>
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>comment:</v-list-item-title>
                          {{item.comment}}
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
  name: "UserFeedback-Chield",
  middleware: "allowSuperAdminOrAdmin",
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
        {
          text: "Created At",
          value: "created_at",

          filterable: false,
        },
        {
          text: "Published",
          value: "published",
          sortable: false,
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

      editedIndex: -1,
      editedItem: {
        stars: null,
        comment: "Max 200 characters",
      },
      defaultItem: {
        stars: null,
        comment: "Max 200 characters",
      },
      userfeedback: [],
    };
  },
  async asyncData({ store, $axios }) {
    try {
      const userfeedback = await $axios.$get("/allFeedbackIndex");

      return {
        userfeedback: userfeedback.data,
      };
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    approveOrNot(item) {
      this.$axios
        .$post("/approveOrNot", { id: item.id })
        .then((res) => {
          this.$store.dispatch("feedback/fetchFeedbacks");
          this.userfeedback = res.data;
          this.$toast.success("Successfully Approved Feedback", {
            duration: 5000,
            action: {
              text: "Cancel",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          });
          this.close();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteItem(item) {
      this.$toast.error("Are you sure you want to delete this item?", {
        action: [
          {
            text: "Delete",
            onClick: (e, toastObject) => {
              this.$axios
                .$post("/delete", { id: item.id })
                .then((res) => {
                  this.$store.dispatch("feedback/fetchFeedbacks");
                  this.userfeedback = res.data;
                  toastObject.goAway(0);
                  this.$toast.success("Successfully Feedback Deleted", {
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
  },
};
</script>