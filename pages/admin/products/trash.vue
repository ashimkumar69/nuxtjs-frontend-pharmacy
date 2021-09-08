
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
            :items="products"
            sort-by="name"
            class="elevation-1"
            show-expand
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Products Trash</v-toolbar-title>
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
                    label="Search by Products and Generic"
                    type="text"
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="productRestore(item.id)">fas fa-trash-restore</v-icon>
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
                          <v-list-item-title>Category: {{item.category_id}}</v-list-item-title>
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
  name: "Products-Trash",
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
        { text: "Category", value: "category_id", filterable: false },
        { text: "Price", value: "mrp", filterable: false },
        { text: "Generic", value: "generic" },
        { text: "Manufactured", value: "manufactured", filterable: false },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          filterable: false,
        },
        { text: "", value: "data-table-expand" },
      ],
      products: [],
      selected: [],
    };
  },
  async asyncData({ $axios }) {
    try {
      const product = await $axios.$get("/producttrash");

      return { products: product.data };
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
                .$post("/productForceDelete", { selected: selected })
                .then((res) => {
                  this.products = res.data;
                  this.selected = [];
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
    productRestore(id) {
      try {
        this.$axios.$post("/productrestore", { id: id }).then((res) => {
          this.products = res.data;
          this.$store.dispatch("products/fetchProducts");
          this.$store.dispatch("fontendAllProducts/fetchProducts");
          this.$toast.success("Successfully Product Restore", {
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