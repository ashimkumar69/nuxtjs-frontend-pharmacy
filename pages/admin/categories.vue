<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-data-table :search="search" :headers="headers" :items="categories" class="elevation-1">
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Categories</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="light-blue lighten-2"
                      dark
                      class="text-capitalize"
                      v-bind="attrs"
                      v-on="on"
                    >Create</v-btn>
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
                              <v-text-field
                                color="light-blue lighten-2"
                                outlined
                                v-model="editedItem.name"
                                label="Category Name"
                                :error-messages="serverErrors.name"
                                clearable
                              ></v-text-field>
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
              <v-toolbar flat color="white">
                <v-spacer></v-spacer>
                <v-col cols="12" sm="10" md="8" lg="6">
                  <v-text-field
                    v-model="search"
                    color="light-blue lighten-2 "
                    append-icon="mdi-magnify"
                    outlined
                    dense
                    clear-icon="mdi-close-circle"
                    clearable
                    label="Search by Categories"
                    type="text"
                    class="pl-0"
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:no-data>No Data</template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>



<script>
import { mapGetters } from "vuex";
export default {
  name: "Categories",
  middleware: "allowSuperAdminOrAdmin",
  data() {
    return {
      dialog: false,
      search: "",
      headers: [
        {
          text: "Categories",
          align: "start",
          value: "name",
        },
        { text: "Products", value: "categoryHaveProducts", filterable: false },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          filterable: false,
        },
      ],
      // categories: [],
      editedIndex: -1,
      editedItem: {
        name: null,
      },
      defaultItem: {
        name: null,
      },
      itemId: null,
    };
  },

  computed: {
    ...mapGetters({ categories: "categories/getCategories" }),
    formTitle() {
      return this.editedIndex === -1 ? "New Category" : "Edit Category";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.categories.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.itemId = item.id;
    },

    deleteItem(item) {
      // const index = this.categories.indexOf(item);
      // this.itemId = item.id;
      this.$toast.error("Are you sure you want to delete this item?", {
        action: [
          {
            text: "Delete",
            onClick: (e, toastObject) => {
              this.$axios
                .$delete(`/category/${item.id}`)
                .then((res) => {
                  toastObject.goAway(0);
                  if (res == "haveProduct") {
                    this.$toast.error("Category Have Product.", {
                      action: {
                        text: "Cancel",
                        onClick: (e, toastObject) => {
                          toastObject.goAway(0);
                        },
                      },
                    });
                  } else {
                    this.$store.dispatch("categories/setCategories", res.data);
                    this.$toast.success("Successfully Category Deleted", {
                      duration: 5000,
                      action: {
                        text: "Cancel",
                        onClick: (e, toastObject) => {
                          toastObject.goAway(0);
                        },
                      },
                    });
                  }
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
      this.$store.dispatch("serverValidationErrors/clearErrors");
      this.$refs.form.reset();
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        if (this.editedItem.name) {
          this.$axios
            .$patch(`/category/${this.itemId}`, this.editedItem)
            .then((res) => {
              this.$store.dispatch("categories/setCategories", res.data);

              this.$toast.success("Successfully Category Updated", {
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
        if (this.editedItem.name) {
          this.$axios
            .$post("/category", this.editedItem)
            .then((res) => {
              this.$refs.form.reset();
              this.$store.dispatch("categories/setCategories", res.data);

              this.$toast.success("Successfully Category Created", {
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
      }
      // this.close();
    },
  },
};
</script>