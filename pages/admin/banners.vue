<template>
  <div>
    <v-container fluid>
      <v-row v-resize="onResize">
        <v-col cols="12">
          <v-data-table :headers="headers" :items="banners" class="elevation-1">
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Banners</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="light-blue lighten-2"
                      dark
                      class="mb-2 text-capitalize"
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
                              <v-file-input
                                v-if="editedIndex > -1"
                                color="light-blue lighten-2"
                                type="file"
                                accept="image/*"
                                @change="getFile"
                                label="Banner Picture"
                                outlined
                                dense
                                show-size
                                :error-messages="serverErrors.picture"
                              ></v-file-input>
                              <v-file-input
                                v-else
                                color="light-blue lighten-2"
                                type="file"
                                accept="image/*"
                                @change="getFile"
                                label="Banner Picture"
                                outlined
                                dense
                                show-size
                                counter
                                multiple
                                :error-messages="serverErrors.picture"
                              ></v-file-input>
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
            <template v-slot:item.picture="{ item }">
              <v-avatar v-if="windowSize.x < 600" tile size="50">
                <v-img :src="item.picture"></v-img>
              </v-avatar>
              <v-avatar v-else tile size="200">
                <v-img :src="item.picture"></v-img>
              </v-avatar>
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
  name: "Banner",
  middleware: "allowSuperAdminOrAdmin",
  data() {
    return {
      dialog: false,
      search: "",
      headers: [
        {
          text: "Picture",
          align: "start",
          value: "picture",
        },
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
      ],

      editedIndex: -1,
      editedItem: {
        picture: [],
      },
      defaultItem: {
        picture: [],
      },
      itemId: null,
      windowSize: {
        x: 0,
      },
    };
  },
  async fetch({ store, $axios }) {
    try {
      const banners = await $axios.$get("/banner");

      store.dispatch("banners/setBanners", banners.data);
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    ...mapGetters({ banners: "banners/getBanners" }),
    formTitle() {
      return this.editedIndex === -1 ? "New Banner" : "Edit Banner";
    },
  },
  mounted() {
    this.onResize();
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth };
    },
    editItem(item) {
      this.editedIndex = this.banners.indexOf(item);
      this.itemId = item.id;
      this.editedItem.picture = [];
      this.dialog = true;
    },

    deleteItem(item) {
      this.$toast.error("Are you sure you want to delete this item?", {
        action: [
          {
            text: "Delete",
            onClick: (e, toastObject) => {
              this.$axios
                .$delete(`/banner/${item.id}`)
                .then((res) => {
                  this.$store.dispatch("banners/setBanners", res.data);
                  toastObject.goAway(0);
                  this.$toast.success("Successfully Banner Deleted", {
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
        const form = new FormData();
        form.append("_method", "PATCH");
        if (this.editedItem.picture) {
          form.append("picture", this.editedItem.picture);
        }
        this.$axios
          .$post(`/banner/${this.itemId}`, form)
          .then((res) => {
            this.$refs.form.reset();
            this.editedItem.picture = [];
            this.$store.dispatch("banners/setBanners", res.data);

            this.$toast.success("Successfully Banner Updated", {
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
      } else {
        const form = new FormData();
        if (this.editedItem.picture.length > 0) {
          this.editedItem.picture.forEach((file) => {
            form.append("picture[]", file);
          });
        }
        this.$axios
          .$post("/banner", form)
          .then((res) => {
            this.$refs.form.reset();
            this.editedItem.picture = null;
            this.$store.dispatch("banners/setBanners", res.data);

            this.$toast.success("Successfully Banner Created", {
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
    },
    getFile(e) {
      if (this.editedIndex > -1) {
        const file = e;

        let imageType = /image.*/;

        if (file !== undefined) {
          if (file.type.match(imageType)) {
            this.editedItem.picture = file;
          }
        }
      } else {
        const files = e;
        let imageType = /image.*/;
        if (files !== undefined) {
          files.forEach((file) => {
            if (file.type.match(imageType)) {
              this.editedItem.picture.push(file);
            }
          });
        }
      }
    },
  },
};
</script>