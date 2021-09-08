
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
            :items="blogs"
            sort-by="title"
            class="elevation-1"
            show-expand
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Blogs Trash</v-toolbar-title>
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
              <v-icon small class="mr-2" @click="blogRestore(item.id)">fas fa-trash-restore</v-icon>
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
  name: "Blogs-Trash",
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
      blogs: [],
      selected: [],
    };
  },
  async asyncData({ $axios }) {
    try {
      const blogs = await $axios.$get("/blogTrash");

      return { blogs: blogs.data };
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
                .$post("/blogForceDelete", { selected: selected })
                .then((res) => {
                  this.blogs = res.data;
                  this.selected = [];
                  toastObject.goAway(0);
                  this.$toast.success("Successfully Blog Deleted", {
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
    blogRestore(id) {
      try {
        this.$axios.$post("/blogRestore", { id: id }).then((res) => {
          this.blogs = res.data;
          this.$store.dispatch("blogs/fetchBlogs");
          this.$store.dispatch("fontendBlogs/fetchBlogs");
          this.$toast.success("Successfully Blog Restore", {
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