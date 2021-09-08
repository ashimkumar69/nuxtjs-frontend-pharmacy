<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-sheet color="transparent">
          <v-row>
            <v-col lg="3" class="py-0 py-lg-2">
              <v-list color="transparent" dark>
                <v-list-item class="pl-0">
                  <v-list-item-icon class="mr-0">
                    <v-icon small color="light-blue lighten-2">fas fa-file-medical</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="text--primary text-h6">All Medicine</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>

            <v-col cols="12" lg="4" class="py-0 py-lg-2">
              <v-select
                color="light-blue lighten-2"
                :items="categories"
                item-text="name"
                item-value="tag"
                return-object
                label="Medicien Categories"
                dense
                outlined
                clearable
                hide-details
                @change="selectItem"
              ></v-select>
            </v-col>
            <v-col cols="12" lg="5" class="py-0 py-lg-2">
              <v-text-field
                v-model="form.message"
                color="light-blue lighten-2"
                append-icon="mdi-magnify"
                outlined
                dense
                clear-icon="mdi-close-circle"
                clearable
                label="Search By Name"
                type="text"
                hide-details
                @input="seachProduct"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-sheet>

        <transition-group
          name="list-complete"
          class="list-complete"
          tag="section"
          mode="out-in"
          :duration="{ enter: 800, leave: 800 }"
        >
          <v-card outlined v-for="item in filteredItems" :key="item.id" class="list-complete-item">
            <v-img height="200px" :src="item.picture"></v-img>
            <v-card-subtitle class="pb-0 text-capitalize">{{ item.category}}</v-card-subtitle>
            <v-card-title
              class="font-weight-bold text-subtitle-2 pb-0 pt-0"
            >{{ item.name | str_limit(34) }}</v-card-title>
            <v-card-title
              v-if="item.old_mrp"
              class="font-weight-bold text-subtitle-2 text-decoration-line-through pt-0 pb-0"
            >MRP: {{ item.old_mrp }}</v-card-title>
            <v-card-title
              v-else
              class="font-weight-bold text-subtitle-2 text-decoration-line-through pt-0 pb-0"
            >MRP: 0</v-card-title>
            <v-card-title class="font-weight-bold text-subtitle-2 pt-0 pb-0">MRP: {{ item.mrp }}</v-card-title>

            <v-card-actions class="pt-0">
              <v-row align="center" justify="end" class="px-2">
                <v-btn
                  color="light-blue lighten-2 "
                  class="text-capitalize"
                  outlined
                  @click.stop="openDialog(item.id)"
                >Details</v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </transition-group>
        <div class="text-center">
          <v-dialog v-model="dialog" width="500">
            <v-card>
              <v-card-title>Product Details</v-card-title>
              <v-img v-if="product" :src="product.picture"></v-img>
              <v-card-text>
                <v-simple-table>
                  <tbody v-if="product">
                    <tr>
                      <td>Category: {{ product.category }}</td>
                    </tr>
                    <tr>
                      <td>Name: {{ product.name }}</td>
                    </tr>
                    <tr v-if="product.old_mrp">
                      <td class="text-decoration-line-through">MRP: {{ product.old_mrp }}</td>
                    </tr>
                    <tr v-else>
                      <td class="text-decoration-line-through">MRP: 0</td>
                    </tr>
                    <tr>
                      <td>MRP: {{ product.mrp }}</td>
                    </tr>
                    <tr>
                      <td>Generic: {{ product.generic }}</td>
                    </tr>
                    <tr>
                      <td>Type: {{ product.type }}</td>
                    </tr>
                    <tr>
                      <td>Manufactured: {{ product.manufactured }}</td>
                    </tr>
                    <tr>
                      <td>Size: {{ product.size }}</td>
                    </tr>
                    <tr>
                      <td>Quantity: {{ product.quantity }}</td>
                    </tr>
                    <tr>
                      <td>Pieces Per Pata: {{ product.pieces_per_pata }}</td>
                    </tr>
                    <tr>
                      <td>Dose: {{ product.dose }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="light-blue lighten-2" text @click="dialog = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
      <v-col cols="12">
        <div class="text-center">
          <v-pagination
            dark
            color="light-blue lighten-2"
            v-model="meta.current_page"
            :length="meta.last_page"
            total-visible="8"
            @input="changePage"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Products",
  auth: false,
  data() {
    return {
      page: 1,
      meta: {},
      category: "ALL",
      dialog: false,
      product: null,
      form: {
        message: null,
      },
      search: null,
    };
  },
  computed: {
    ...mapGetters({
      filterProducts: "fontendAllProducts/getProducts",
      categories: "fontendCategories/getCategories",
    }),
    filteredItems() {
      const category = this.category;
      const searchProduct = this.form.message ? this.form.message : "";

      if (this.search == "SEARCH") {
        if (category == "ALL") {
          const products = this.filterProducts.filter(function (item) {
            return item;
          });
          return products.filter(function (item) {
            return item.name.toLowerCase().match(searchProduct.toLowerCase());
          });
        } else {
          const products = this.filterProducts.filter(function (item) {
            return item.category.toLowerCase() == category.toLowerCase();
          });
          return products.filter(function (item) {
            return item.name.toLowerCase().match(searchProduct.toLowerCase());
          });
        }
      } else {
        if (category == "ALL") {
          return this.filterProducts.filter(function (item) {
            return item;
          });
        } else {
          return this.filterProducts.filter(function (item) {
            return item.category.toLowerCase() == category.toLowerCase();
          });
        }
      }
    },
  },
  created() {
    this.fetchAllProducts();
  },
  methods: {
    openDialog(id) {
      this.dialog = true;

      this.filterProducts.map((product) => {
        if (product.id === id) {
          this.product = product;
        }
      });
    },
    selectItem(categories) {
      if (categories == undefined) {
        this.category = "ALL";
      } else {
        this.category = categories.name;
      }
    },
    seachProduct(search) {
      if (search == undefined || search == "" || search == null) {
        this.search = null;
      } else {
        this.search = "SEARCH";
      }
    },
    fetchAllProducts(page) {
      let url = page ? `/allProductIndex?page=${page}` : "/allProductIndex";
      this.$axios
        .$get(url)
        .then((res) => {
          this.$store.dispatch("fontendAllProducts/setProducts", res.data);
          this.meta = res.meta;
        })
        .catch((errors) => console.log(errors));
    },
    changePage(page) {
      this.fetchAllProducts(page);
    },
  },
};
</script>

<style lang="scss" scoped>
$sm-breakpoint: 600px;
$md-breakpoint: 960px;
$lg-breakpoint: 1264px;

@mixin xs {
  @media only screen and (max-width: $sm-breakpoint - 1) {
    @content;
  }
}

@include xs {
  .list-complete-item {
    width: 100%;
  }
}

@mixin sm {
  @media screen and (min-width: $sm-breakpoint) and (max-width: $md-breakpoint - 1) {
    @content;
  }
}

@include sm {
  .list-complete-item {
    width: 49%;
  }
}

@mixin md-up {
  @media screen and (min-width: $md-breakpoint) and (max-width: $lg-breakpoint - 1) {
    @content;
  }
}

@include md-up {
  .list-complete-item {
    width: 24.7%;
  }
}

@mixin lg-up {
  @media only screen and (min-width: $lg-breakpoint) {
    @content;
  }
}

@include lg-up {
  .list-complete-item {
    width: 24.8%;
  }
}

// filter

.list-complete {
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
}

.list-complete-item {
  transition: transform 1s;
  margin: 1px;
}
//filter trnanzition animation

.list-complete-enter {
  transform: scale(0.8) translateY(-80px);
  opacity: 0;
}

.list-complete-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

.list-complete-leave-active {
  position: absolute;
  z-index: -1;
}
</style>
