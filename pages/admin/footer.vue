<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-toolbar flat color="white">
              <v-toolbar-title>Footer</v-toolbar-title>

              <v-spacer></v-spacer>
              <v-btn
                color="light-blue lighten-2"
                dark
                class="mr-3 text-capitalize"
                @click="editItem"
              >Edit</v-btn>
              <v-dialog v-model="dialog" max-width="700px">
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
                  <v-form ref="form">
                    <v-card-text>
                      <v-file-input
                        color="light-blue lighten-2"
                        type="file"
                        accept="image/*"
                        @change="getFile"
                        label="Logo"
                        outlined
                        dense
                        show-size
                        :error-messages="serverErrors.logo"
                      ></v-file-input>

                      <v-text-field
                        color="light-blue lighten-2"
                        outlined
                        v-model="editedItem.name"
                        label="Pharmacy Name"
                        :error-messages="serverErrors.name"
                        dense
                      ></v-text-field>

                      <span class="black--text">Description</span>
                      <client-only>
                        <vue-editor v-model="editedItem.description" :editorToolbar="customToolbar"></vue-editor>
                      </client-only>
                      <span
                        v-if="serverErrors.description"
                        class="red--text"
                      >{{serverErrors.description[0]}}</span>
                      <v-text-field
                        class="mt-6"
                        color="light-blue lighten-2"
                        outlined
                        v-model="editedItem.f_link"
                        label="Facebook Link"
                        :error-messages="serverErrors.f_link"
                        dense
                      ></v-text-field>
                      <v-text-field
                        color="light-blue lighten-2"
                        outlined
                        v-model="editedItem.t_link"
                        label="Twitter Link"
                        :error-messages="serverErrors.t_link"
                        dense
                      ></v-text-field>
                      <v-text-field
                        color="light-blue lighten-2"
                        outlined
                        v-model="editedItem.y_link"
                        label="Youtube Link"
                        :error-messages="serverErrors.y_link"
                        dense
                      ></v-text-field>
                      <v-text-field
                        color="light-blue lighten-2"
                        outlined
                        v-model="editedItem.phone"
                        label="Phone"
                        :error-messages="serverErrors.phone"
                        dense
                      ></v-text-field>
                      <v-text-field
                        color="light-blue lighten-2"
                        outlined
                        v-model="editedItem.houre"
                        label="Open And Close Houre"
                        :error-messages="serverErrors.houre"
                        dense
                      ></v-text-field>
                      <v-text-field
                        color="light-blue lighten-2"
                        outlined
                        v-model="editedItem.email"
                        label="Email"
                        :error-messages="serverErrors.email"
                        dense
                      ></v-text-field>
                      <v-text-field
                        color="light-blue lighten-2"
                        outlined
                        v-model="editedItem.address"
                        label="Address"
                        :error-messages="serverErrors.address"
                        dense
                      ></v-text-field>
                    </v-card-text>
                  </v-form>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="light-blue lighten-2" text @click="close">Cancel</v-btn>
                    <v-btn color="light-blue lighten-2" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </v-card>
        </v-col>
        <v-col cols="12" lg="4">
          <v-card class="text-center text-lg-left">
            <v-list>
              <v-list-item class="d-flex justify-center justify-lg-start">
                <v-list-item-icon>
                  <v-img :src="footer.logo" width="30px"></v-img>
                  <span class="ml-2 black--text">{{ footer.name }}</span>
                </v-list-item-icon>
              </v-list-item>
            </v-list>

            <v-card-text class="pt-0" v-html="footer.description"></v-card-text>
            <v-card-title class="d-flex justify-center justify-lg-start">Follow Us</v-card-title>
            <v-card-text>
              <v-list class="text-center text-lg-left">
                <v-list-item>
                  <v-list-item-icon class="mr-2">
                    <v-icon color="light-blue lighten-2">fab fa-facebook-f</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-subtitle>{{ footer.f_link }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon class="mr-2">
                    <v-icon color="light-blue lighten-2">mdi-twitter</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-subtitle>{{ footer.t_link }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon class="mr-2">
                    <v-icon color="light-blue lighten-2">mdi-youtube</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-subtitle>{{ footer.y_link }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" lg="4">
          <v-card>
            <v-card-title class="d-flex justify-center justify-lg-start">Manually Contact Us</v-card-title>
            <v-list class="text-center text-lg-left">
              <v-list-item>
                <v-list-item-icon class="mr-2">
                  <v-icon color="light-blue lighten-2">mdi-phone</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-subtitle>{{ footer.phone }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon class="mr-2">
                  <v-icon color="light-blue lighten-2">mdi-clock</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-subtitle>Hotline Hours: {{ footer.houre }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon class="mr-2">
                  <v-icon color="light-blue lighten-2">mdi-email</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-subtitle>{{ footer.email }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon class="mr-2">
                  <v-icon color="light-blue lighten-2">fas fa-map-marker-alt</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-card-text class="pt-0 px-0 text--secondary">{{ footer.address }}</v-card-text>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>



<script>
import { mapGetters } from "vuex";
export default {
  name: "Footer",
  middleware: "allowSuperAdminOrAdmin",
  data() {
    return {
      dialog: false,

      editedIndex: -1,
      editedItem: {
        logo: null,
        name: null,
        description: null,
        f_link: null,
        t_link: null,
        y_link: null,
        phone: null,
        houre: null,
        email: null,
        address: null,
      },
      defaultItem: {
        logo: null,
        name: null,
        description: null,
        f_link: null,
        t_link: null,
        y_link: null,
        phone: null,
        houre: null,
        email: null,
        address: null,
      },
      itemId: null,

      customToolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],

        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme

        [{ align: [] }],

        ["clean"], // remove formatting button
      ],
    };
  },
  async fetch({ store, $axios }) {
    try {
      const footer = await $axios.$get("/footer");
      store.dispatch("footer/setFooter", footer.data);
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    ...mapGetters({
      footer: "footer/getFooter",
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New Footer" : "Edit Footer";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  methods: {
    editItem() {
      this.editedIndex = 1;
      // this.editedItem = this.footer;
      this.dialog = true;
      this.itemId = this.footer.id;
      this.editedItem.logo = null;
    },

    deleteItem(item) {
      const index = this.products.indexOf(item);

      this.$toast.error("Are you sure you want to delete this item?", {
        action: [
          {
            text: "Delete",
            onClick: (e, toastObject) => {
              this.$axios
                .$delete(`/product/${item.id}`)
                .then((res) => {
                  this.$store.dispatch("products/setProducts", res.data);
                  this.$store.dispatch("categories/fetchCategories");
                  toastObject.goAway(0);
                  this.$toast.success("Successfully Product Deleted", {
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
        if (this.editedItem.logo) {
          form.append("logo", this.editedItem.logo);
        }
        if (this.editedItem.name) {
          form.append("name", this.editedItem.name);
        }
        if (this.editedItem.description) {
          form.append("description", this.editedItem.description);
        }
        if (this.editedItem.f_link) {
          form.append("f_link", this.editedItem.f_link);
        }
        if (this.editedItem.t_link) {
          form.append("t_link", this.editedItem.t_link);
        }
        if (this.editedItem.y_link) {
          form.append("y_link", this.editedItem.y_link);
        }
        if (this.editedItem.phone) {
          form.append("phone", this.editedItem.phone);
        }
        if (this.editedItem.houre) {
          form.append("houre", this.editedItem.houre);
        }
        if (this.editedItem.email) {
          form.append("email", this.editedItem.email);
        }
        if (this.editedItem.address) {
          form.append("address", this.editedItem.address);
        }

        this.$axios
          .$post(`/footer/${this.itemId}`, form)
          .then((res) => {
            this.$store.dispatch("footer/setFooter", res.data);
            this.$toast.success("Successfully Footer Updated", {
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
        if (this.editedItem.logo) {
          form.append("logo", this.editedItem.logo);
        }
        if (this.editedItem.name) {
          form.append("name", this.editedItem.name);
        }
        if (this.editedItem.description) {
          form.append("description", this.editedItem.description);
        }
        if (this.editedItem.f_link) {
          form.append("f_link", this.editedItem.f_link);
        }
        if (this.editedItem.t_link) {
          form.append("t_link", this.editedItem.t_link);
        }
        if (this.editedItem.y_link) {
          form.append("y_link", this.editedItem.y_link);
        }
        if (this.editedItem.phone) {
          form.append("phone", this.editedItem.phone);
        }
        if (this.editedItem.houre) {
          form.append("houre", this.editedItem.houre);
        }
        if (this.editedItem.email) {
          form.append("email", this.editedItem.email);
        }
        if (this.editedItem.address) {
          form.append("address", this.editedItem.address);
        }

        this.$axios
          .$post("/footer", form)
          .then((res) => {
            if (res == "haveFooter") {
              this.$toast.error("Already Footer Created", {
                duration: 5000,
                action: {
                  text: "Cancel",
                  onClick: (e, toastObject) => {
                    toastObject.goAway(0);
                  },
                },
              });
            } else {
              this.$store.dispatch("footer/setFooter", res.data);

              this.$toast.success("Successfully Footer Created", {
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
      }
    },

    getFile(e) {
      const file = e;
      let imageType = /image.*/;

      if (file !== undefined) {
        if (file.type.match(imageType)) {
          this.editedItem.logo = file;
        }
      }
    },
  },
};
</script>