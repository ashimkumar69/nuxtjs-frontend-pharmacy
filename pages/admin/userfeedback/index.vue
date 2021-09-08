<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-data-table :headers="headers" :items="userfeedback" class="elevation-1" show-expand>
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>User Feedback</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-sheet color="transparent" class="hidden-sm-and-up">
                      <v-btn
                        small
                        color="light-blue lighten-2"
                        dark
                        class="mb-2 text-capitalize"
                        v-bind="attrs"
                        v-on="on"
                      >Give Feedback</v-btn>
                    </v-sheet>
                    <v-sheet color="transparent" class="hidden-xs-only">
                      <v-btn
                        color="light-blue lighten-2"
                        dark
                        class="mb-2 text-capitalize"
                        v-bind="attrs"
                        v-on="on"
                      >Give Feedback</v-btn>
                    </v-sheet>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-form ref="form">
                              <span>Give Rate</span>
                              <v-rating
                                color="light-blue lighten-2"
                                half-increments
                                hover
                                name="stars"
                                v-model="editedItem.stars"
                              ></v-rating>
                              <span
                                v-if="serverErrors.stars"
                                class="red--text"
                              >{{serverErrors.stars[0]}}</span>
                              <v-textarea
                                class="mt-3"
                                counter
                                clearable
                                v-model="editedItem.comment"
                                color="light-blue lighten-2"
                                outlined
                                name="comment"
                                label="Give Comment"
                                :error-messages="serverErrors.comment"
                              ></v-textarea>
                            </v-form>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="light-blue lighten-2" text @click="close">Cancel</v-btn>
                      <v-btn color="light-blue lighten-2" text @click="save">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.published="{ item }">
              <v-chip v-if="item.published" class="ma-2" color="green" text-color="white">Approved</v-chip>
              <v-chip v-else class="ma-2" color="red" text-color="white">Unapproved</v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
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
  middleware: "allowUser",
  data() {
    return {
      dialog: false,

      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
          sortable: false,
        },
        {
          text: "Created At",
          value: "created_at",
          sortable: false,
        },
        { text: "Published", value: "published", sortable: false },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
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
      itemId: null,
    };
  },
  async asyncData({ store, $axios }) {
    try {
      const userfeedback = await $axios.$get("/userfeedback");

      return {
        userfeedback: userfeedback.data,
      };
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Feedback" : "Edit Feedback";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.userfeedback.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.itemId = item.id;
    },

    deleteItem(item) {
      this.$toast.error("Are you sure you want to delete this item?", {
        action: [
          {
            text: "Delete",
            onClick: (e, toastObject) => {
              this.$axios
                .$delete(`/userfeedback/${item.id}`)
                .then((res) => {
                  this.userfeedback = [];
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

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.$store.dispatch("serverValidationErrors/clearErrors");
    },

    save() {
      if (this.editedIndex > -1) {
        if (this.editedItem.stars && this.editedItem.comment) {
          this.$axios
            .$patch(`/userfeedback/${this.itemId}`, this.editedItem)
            .then((res) => {
              this.userfeedback = res.data;

              this.$toast.success("Successfully Feedback Updated", {
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
        }
      } else {
        if (this.editedItem.stars && this.editedItem.comment) {
          this.$axios
            .$post("/userfeedback", this.editedItem)
            .then((res) => {
              if (res.error) {
                this.$toast.error(res.error, {
                  duration: 5000,
                  action: {
                    text: "Cancel",
                    onClick: (e, toastObject) => {
                      toastObject.goAway(0);
                    },
                  },
                });
              } else {
                this.$refs.form.reset();
                // this.$store.dispatch("categories/setCategories", res.data);
                this.userfeedback = res.data;
                this.$toast.success("Successfully Feedback Given", {
                  duration: 5000,
                  action: {
                    text: "Cancel",
                    onClick: (e, toastObject) => {
                      toastObject.goAway(0);
                    },
                  },
                });
                this.close();
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
  },
};
</script>