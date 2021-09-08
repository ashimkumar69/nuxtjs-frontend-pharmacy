<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-row>
              <v-col cols="12" sm="6" lg="3" v-for="item in howToOrder" :key="item.id">
                <v-card flat>
                  <v-card-text>
                    <v-btn fab small color="light-blue lighten-2" dark>
                      <v-icon small>{{ item.icon }}</v-icon>
                    </v-btn>
                    <span class="ml-1 text-body-1 font-weight-bold">{{ item.name }}</span>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12">
                <v-card flat class="d-flex justify-center">
                  <v-card-title>Call Us to Know Delivery Charge, Free Delivery for First Orders!</v-card-title>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" lg="4" v-for="item  in orderService" :key="item.name">
                <v-card flat>
                  <v-card-text class="pb-0">
                    <v-btn fab small color="light-blue lighten-2" dark>
                      <v-icon small>{{ item.icon }}</v-icon>
                    </v-btn>

                    <span class="ml-1 text-body-1 font-weight-regular" v-html="item.name"></span>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-alert
            border="top"
            colored-border
            type="info"
            color="light-blue lighten-2"
            elevation="2"
          >
            *For your safety, we require a prescription for non-OTC medicine.
            Email your prescription to example@example.com, or call us at 01928374565 for help.
          </v-alert>
          <v-alert border="top" colored-border type="error" elevation="2">
            Studies show
            <strong>open market medicine</strong> may not be managed properly and maybe expired or counterfeit. Intake of such medicine may
            <strong>risk</strong>
            the patient's life.
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "AboutOrder",
  data() {
    return {
      howToOrder: [
        { id: 1, icon: "fas fa-question", name: "How To Order" },
        { id: 2, icon: "fas fa-comments", name: "Order By SMS" },
        { id: 3, icon: "fab fa-facebook-f", name: "Order By Facebook" },
        { id: 4, icon: "fas fa-envelope", name: "Order By Email" },
      ],
      orderService: [
        {
          id: 1,
          icon: "fas fa-check",
          name: "Only <strong>certified</strong> medicine available",
        },
        {
          id: 2,
          icon: "far fa-money-bill-alt",
          name: "Payment: <strong>Cash</strong> on Delivery",
        },
        {
          id: 3,
          icon: "fas fa-map-marker-alt",
          name: "Delivery anywhere in <strong>Bangladesh</strong>.",
        },
        {
          id: 4,
          icon: "fas fa-clock",
          name: "Order <strong>Same day</strong> delivery",
        },
        {
          id: 5,
          icon: "fas fa-user-md",
          name: "<strong>Pharmacist</strong> available for consultation",
        },
        {
          id: 6,
          icon: "fas fa-lock",
          name:
            "<strong>Confidential</strong> delivery to ensure <strong>privacy</strong>",
        },
      ],
    };
  },
};
</script>

<style>
</style>