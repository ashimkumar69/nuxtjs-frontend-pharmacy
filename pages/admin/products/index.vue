<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :search="search"
            :headers="headers"
            :items="products"
            class="elevation-1"
            show-expand
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Products</v-toolbar-title>

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
                    <v-form ref="form">
                      <v-card-text>
                        <v-select
                          v-model="editedItem.category_id"
                          :items="categories"
                          item-text="name"
                          item-value="id"
                          label="Select Category"
                          dense
                          outlined
                          clearable
                          :error-messages="serverErrors.category_id"
                        ></v-select>
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
                          v-model="editedItem.name"
                          label="Product Name"
                          :error-messages="serverErrors.name"
                          dense
                        ></v-text-field>

                        <v-text-field
                          color="light-blue lighten-2"
                          outlined
                          v-model="editedItem.generic"
                          label="Generic Name"
                          :error-messages="serverErrors.generic"
                          dense
                        ></v-text-field>
                        <v-text-field
                          color="light-blue lighten-2"
                          outlined
                          v-model="editedItem.type"
                          label="Type"
                          :error-messages="serverErrors.type"
                          dense
                        ></v-text-field>
                        <v-text-field
                          color="light-blue lighten-2"
                          outlined
                          v-model="editedItem.manufactured"
                          label="Manufactured"
                          :error-messages="serverErrors.manufactured"
                          dense
                        ></v-text-field>
                        <v-text-field
                          color="light-blue lighten-2"
                          outlined
                          v-model="editedItem.size"
                          label="Size"
                          :error-messages="serverErrors.size"
                          dense
                        ></v-text-field>
                        <v-text-field
                          color="light-blue lighten-2"
                          outlined
                          v-model="editedItem.quantity"
                          label="Quantity"
                          :error-messages="serverErrors.quantity"
                          dense
                        ></v-text-field>
                        <v-text-field
                          color="light-blue lighten-2"
                          outlined
                          v-model="editedItem.pieces_per_pata"
                          label="Pieces Per Pata"
                          :error-messages="serverErrors.pieces_per_pata"
                          dense
                        ></v-text-field>
                        <v-text-field
                          color="light-blue lighten-2"
                          outlined
                          v-model="editedItem.dose"
                          label="Dose"
                          :error-messages="serverErrors.dose"
                          dense
                        ></v-text-field>
                        <v-text-field
                          color="light-blue lighten-2"
                          outlined
                          v-model="editedItem.old_mrp"
                          label="Old MRP"
                          :error-messages="serverErrors.old_mrp"
                          dense
                        ></v-text-field>
                        <v-text-field
                          color="light-blue lighten-2"
                          outlined
                          v-model="editedItem.mrp"
                          label="MRP"
                          :error-messages="serverErrors.mrp"
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
                    label="Search by Products, Generic and Manufactured"
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
                      <v-subheader>Product Details</v-subheader>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Category: {{item.category}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Product: {{item.name}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Generic: {{item.generic}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Type: {{item.type}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Manufactured: {{item.manufactured}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Size: {{item.size}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Quantity: {{item.quantity}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Pieces Per Pata: {{item.pieces_per_pata}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Dose: {{item.dose}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Old MRP: {{item.old_mrp}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>MRP: {{item.mrp}}</v-list-item-title>
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
  name: "Products-Child",
  data() {
    return {
      dialog: false,
      search: "",
      headers: [
        {
          text: "Products",
          align: "start",
          value: "name",
        },
        { text: "Category", value: "category", filterable: false },
        { text: "Price", value: "mrp", filterable: false },
        { text: "Generic", value: "generic" },
        { text: "Manufactured", value: "manufactured" },
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
        category_id: null,
        picture: null,
        name: null,
        generic: null,
        type: null,
        manufactured: null,
        size: null,
        quantity: null,
        pieces_per_pata: null,
        dose: null,
        old_mrp: null,
        mrp: null,
      },
      defaultItem: {
        category_id: null,
        picture: null,
        name: null,
        generic: null,
        type: null,
        manufactured: null,
        size: null,
        quantity: null,
        pieces_per_pata: null,
        dose: null,
        old_mrp: null,
        mrp: null,
      },
      itemId: null,
    };
  },
  computed: {
    ...mapGetters({
      categories: "categories/getCategories",
      products: "products/getProducts",
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New Product" : "Edit Product";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.itemId = item.id;
      this.editedItem.category_id = null;
      this.editedItem.picture = null;
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
                  this.$store.dispatch("fontendAllProducts/fetchProducts");
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
        if (this.editedItem.category_id) {
          form.append("category_id", this.editedItem.category_id);
        }
        if (this.editedItem.picture) {
          form.append("picture", this.editedItem.picture);
        }
        if (this.editedItem.name) {
          form.append("name", this.editedItem.name);
        }
        if (this.editedItem.generic) {
          form.append("generic", this.editedItem.generic);
        }
        if (this.editedItem.type) {
          form.append("type", this.editedItem.type);
        }
        if (this.editedItem.manufactured) {
          form.append("manufactured", this.editedItem.manufactured);
        }
        if (this.editedItem.size) {
          form.append("size", this.editedItem.size);
        }
        if (this.editedItem.quantity) {
          form.append("quantity", this.editedItem.quantity);
        }
        if (this.editedItem.pieces_per_pata) {
          form.append("pieces_per_pata", this.editedItem.pieces_per_pata);
        }
        if (this.editedItem.dose) {
          form.append("dose", this.editedItem.dose);
        }
        if (this.editedItem.old_mrp) {
          form.append("old_mrp", this.editedItem.old_mrp);
        }
        if (this.editedItem.mrp) {
          form.append("mrp", this.editedItem.mrp);
        }

        this.$axios
          .$post(`/product/${this.itemId}`, form)
          .then((res) => {
            this.$store.dispatch("products/setProducts", res.data);
            this.$store.dispatch("fontendAllProducts/fetchProducts");
            this.$toast.success("Successfully Product Updated", {
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
        if (this.editedItem.category_id) {
          form.append("category_id", this.editedItem.category_id);
        }
        if (this.editedItem.picture) {
          form.append("picture", this.editedItem.picture);
        }
        if (this.editedItem.name) {
          form.append("name", this.editedItem.name);
        }
        if (this.editedItem.generic) {
          form.append("generic", this.editedItem.generic);
        }
        if (this.editedItem.type) {
          form.append("type", this.editedItem.type);
        }
        if (this.editedItem.manufactured) {
          form.append("manufactured", this.editedItem.manufactured);
        }
        if (this.editedItem.size) {
          form.append("size", this.editedItem.size);
        }
        if (this.editedItem.quantity) {
          form.append("quantity", this.editedItem.quantity);
        }
        if (this.editedItem.pieces_per_pata) {
          form.append("pieces_per_pata", this.editedItem.pieces_per_pata);
        }
        if (this.editedItem.dose) {
          form.append("dose", this.editedItem.dose);
        }
        if (this.editedItem.old_mrp) {
          form.append("old_mrp", this.editedItem.old_mrp);
        }
        if (this.editedItem.mrp) {
          form.append("mrp", this.editedItem.mrp);
        }

        this.$axios
          .$post("/product", form)
          .then((res) => {
            this.editedItem.picture = null;
            this.$refs.form.reset();
            this.$store.dispatch("products/setProducts", res.data);
            this.$store.dispatch("categories/fetchCategories");
            this.$store.dispatch("fontendAllProducts/fetchProducts");
            this.$toast.success("Successfully Product Created", {
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