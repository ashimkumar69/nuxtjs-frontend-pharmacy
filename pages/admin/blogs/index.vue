<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :search="search"
            :headers="headers"
            :items="blogs"
            class="elevation-1"
            show-expand
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Blogs</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-dialog v-model="dialog">
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
                    <v-form ref="form">
                      <v-card-text>
                        <v-file-input
                          color="light-blue lighten-2"
                          type="file"
                          accept="image/*"
                          @change="getFile"
                          label="Picture"
                          outlined
                          dense
                          show-size
                          :error-messages="serverErrors.picture"
                        ></v-file-input>

                        <v-text-field
                          color="light-blue lighten-2"
                          outlined
                          v-model="editedItem.title"
                          label="Title"
                          :error-messages="serverErrors.title"
                          dense
                        ></v-text-field>

                        <client-only>
                          <vue-editor v-model="editedItem.body" :editorToolbar="customToolbar"></vue-editor>
                        </client-only>
                        <span v-if="serverErrors.body" class="red--text">{{serverErrors.body[0]}}</span>
                        <v-menu
                          v-model="menu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              color="light-blue lighten-2"
                              v-model="editedItem.published_date"
                              label="Select Published Date"
                              prepend-icon="fas fa-calendar-week"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              :error-messages="serverErrors.published_date"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            dark
                            color="light-blue lighten-2"
                            v-model="editedItem.published_date"
                            @input="menu2 = false"
                          ></v-date-picker>
                        </v-menu>

                        <v-menu
                          ref="menu"
                          v-model="menu3"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="editedItem.published_time"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              color="light-blue lighten-2"
                              v-model="editedItem.published_time"
                              label="Select Published time"
                              prepend-icon="fas fa-clock"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              :error-messages="serverErrors.published_time"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            color="light-blue lighten-2"
                            v-if="menu3"
                            v-model="editedItem.published_time"
                            full-width
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="light-blue lighten-2" @click="menu3 = false">Cancel</v-btn>
                            <v-btn
                              text
                              color="light-blue lighten-2"
                              @click="$refs.menu.save(editedItem.published_time)"
                            >OK</v-btn>
                          </v-time-picker>
                        </v-menu>
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
                    label="Search by Title"
                    type="text"
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
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <v-card flat color="grey lighten-4">
                  <v-img contain aspect-ratio="1.7" :src="item.picture" height="400px"></v-img>
                  <v-card-text>
                    <v-list color="grey lighten-4">
                      <v-subheader>Blog Details</v-subheader>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Published Date: {{item.published_at}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Title: {{item.title}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Body:</v-list-item-title>
                          <v-list-item-title v-html="item.body"></v-list-item-title>
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
import { mapGetters } from "vuex";
export default {
  name: "Blogs-Child",
  data() {
    return {
      dialog: false,
      search: "",
      headers: [
        {
          text: "Title",
          align: "start",
          value: "title",
        },
        { text: "Published", value: "published_at", filterable: false },

        {
          text: "Actions",
          value: "actions",
          sortable: false,
          filterable: false,
        },
        { text: "", value: "data-table-expand" },
      ],
      // products: [],
      editedIndex: -1,
      editedItem: {
        picture: null,
        title: null,
        body: null,
        published_date: new Date().toISOString().substr(0, 10),
        published_time: null,
      },
      defaultItem: {
        picture: null,
        title: null,
        body: null,
        published_date: null,
        published_time: null,
      },
      itemId: null,
      menu2: false,

      menu3: false,
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

  computed: {
    ...mapGetters({
      blogs: "blogs/getBlogs",
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New Blog" : "Edit Blog";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.blogs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.itemId = item.id;
      this.editedItem.picture = null;
    },

    deleteItem(item) {
      this.$toast.error("Are you sure you want to delete this item?", {
        action: [
          {
            text: "Delete",
            onClick: (e, toastObject) => {
              this.$axios
                .$delete(`/blog/${item.id}`)
                .then((res) => {
                  this.$store.dispatch("blogs/setBlogs", res.data);
                  this.$store.dispatch("fontendBlogs/fetchBlogs");
                  toastObject.goAway(0);
                  this.$toast.success("Successfully blog Deleted", {
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
        if (this.editedItem.title) {
          form.append("title", this.editedItem.title);
        }
        if (this.editedItem.body) {
          form.append("body", this.editedItem.body);
        }
        if (this.editedItem.published_date) {
          form.append("published_date", this.editedItem.published_date);
        }
        if (this.editedItem.published_time) {
          form.append("published_time", this.editedItem.published_time);
        }

        this.$axios
          .$post(`/blog/${this.itemId}`, form)
          .then((res) => {
            this.$store.dispatch("blogs/setBlogs", res.data);
            this.$store.dispatch("fontendBlogs/fetchBlogs");
            this.$toast.success("Successfully Blog Updated", {
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

        if (this.editedItem.picture) {
          form.append("picture", this.editedItem.picture);
        }
        if (this.editedItem.title) {
          form.append("title", this.editedItem.title);
        }
        if (this.editedItem.body) {
          form.append("body", this.editedItem.body);
        }
        if (this.editedItem.published_date) {
          form.append("published_date", this.editedItem.published_date);
        }
        if (this.editedItem.published_time) {
          form.append("published_time", this.editedItem.published_time);
        }

        this.$axios
          .$post("/blog", form)
          .then((res) => {
            this.$refs.form.reset();
            this.$store.dispatch("blogs/setBlogs", res.data);
            this.$store.dispatch("fontendBlogs/fetchBlogs");

            this.$toast.success("Successfully Blog Created", {
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
      // this.close();
    },

    getFile(e) {
      const file = e;
      let imageType = /image.*/;

      if (file !== undefined) {
        if (file.type.match(imageType)) {
          this.editedItem.picture = file;
        }
      }
    },
  },
};
</script>