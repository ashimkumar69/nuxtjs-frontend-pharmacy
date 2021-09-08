<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" v-if="productMedicine.length > 0">
          <v-sheet color="transparent" class="d-flex py-3">
            <v-icon small color="light-blue lighten-2" class="mr-2">fas fa-file-medical</v-icon>
            <div class="font-weight-bold text-h6">Medicine</div>

            <v-spacer></v-spacer>
            <v-sheet color="transparent" class="hidden-xs-only">
              <v-btn
                color="light-blue lighten-2"
                outlined
                @click="$refs.medicineCarousel.prev()"
                class="mr-1"
              >
                <v-icon small>fas fa-chevron-left</v-icon>
              </v-btn>

              <v-btn
                class="mr-1"
                color="light-blue lighten-2"
                outlined
                @click="$refs.medicineCarousel.next()"
              >
                <v-icon small>fas fa-chevron-right</v-icon>
              </v-btn>
              <v-btn
                color="light-blue lighten-2"
                class="text-capitalize"
                to="/products"
                outlined
              >See All</v-btn>
            </v-sheet>
            <v-sheet color="transparent" class="hidden-sm-and-up">
              <v-btn
                small
                color="light-blue lighten-2"
                outlined
                @click="$refs.medicineCarousel.prev()"
              >
                <v-icon small>fas fa-chevron-left</v-icon>
              </v-btn>

              <v-btn
                small
                color="light-blue lighten-2"
                outlined
                @click="$refs.medicineCarousel.next()"
              >
                <v-icon small>fas fa-chevron-right</v-icon>
              </v-btn>
              <v-btn
                small
                color="light-blue lighten-2"
                class="text-capitalize"
                outlined
                to="/products"
              >See All</v-btn>
            </v-sheet>
          </v-sheet>

          <VueSlickCarousel v-bind="settings" ref="medicineCarousel">
            <div v-for="item in productMedicine" :key="item.id" class="width focuseOutlineNone">
              <v-card outlined>
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
            </div>
          </VueSlickCarousel>
          <div class="text-center">
            <v-dialog v-model="dialog" width="600px">
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
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MedicineSlider",
  data() {
    return {
      settings: {
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        pauseOnHover: true,
        rows: 2,

        responsive: [
          {
            breakpoint: 1263,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              dots: false,
              arrows: false,
            },
          },
          {
            breakpoint: 959,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              dots: false,
              arrows: false,
            },
          },
          {
            breakpoint: 599,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
              arrows: false,
            },
          },
        ],
      },

      dialog: false,
      product: null,
    };
  },
  computed: {
    ...mapGetters({
      productMedicine: "products/getProducts",
    }),
  },
  methods: {
    openDialog(id) {
      this.dialog = true;

      this.productMedicine.map((product) => {
        if (product.id === id) {
          this.product = product;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$sm-breakpoint: 600px;
$md-breakpoint: 960px;

@mixin xs {
  @media only screen and (max-width: $sm-breakpoint - 1) {
    @content;
  }
}

@include xs {
  .width {
    width: 100% !important;
  }
}

@mixin sm {
  @media screen and (min-width: $sm-breakpoint) and (max-width: $md-breakpoint - 1) {
    @content;
  }
}

@include sm {
  .width {
    width: 99% !important;
  }
}

@mixin md-up {
  @media only screen and (min-width: $md-breakpoint) {
    @content;
  }
}

@include md-up {
  .width {
    width: 99% !important;
  }
}

.focuseOutlineNone:focus {
  outline: none;
}
</style>