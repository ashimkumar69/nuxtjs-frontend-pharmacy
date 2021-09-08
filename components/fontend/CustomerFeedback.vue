<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" v-if="feedbacks.length > 0">
          <v-sheet color="transparent" class="d-flex py-3">
            <v-icon small color="light-blue lighten-2" class="mr-2">fas fa-comments</v-icon>
            <div class="font-weight-bold text-h6">Customer Feedback</div>

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
            </v-sheet>
            <v-sheet color="transparent" class="hidden-sm-and-up">
              <v-btn
                x-small
                color="light-blue lighten-2"
                outlined
                @click="$refs.medicineCarousel.prev()"
              >
                <v-icon small>fas fa-chevron-left</v-icon>
              </v-btn>

              <v-btn
                x-small
                color="light-blue lighten-2"
                outlined
                @click="$refs.medicineCarousel.next()"
              >
                <v-icon small>fas fa-chevron-right</v-icon>
              </v-btn>
            </v-sheet>
          </v-sheet>

          <VueSlickCarousel v-bind="settings" ref="medicineCarousel">
            <div v-for="(item,i) in feedbacks" :key="i" class="width focuseOutlineNone">
              <v-card outlined height="220px">
                <v-list-item>
                  <v-list-item-avatar color="grey">
                    <v-img :src="item.avatar"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="headline">{{item.name}}</v-list-item-title>
                    <v-list-item-subtitle>
                      <v-rating
                        half-increments
                        readonly
                        color="light-blue lighten-2"
                        :value="item.stars"
                      ></v-rating>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-card-text v-html="item.comment"></v-card-text>
              </v-card>
            </div>
          </VueSlickCarousel>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CustomerFeedback",
  data() {
    return {
      settings: {
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        pauseOnHover: true,

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
    };
  },
  computed: {
    ...mapGetters({
      feedbacks: "feedback/getFeedbacks",
    }),
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