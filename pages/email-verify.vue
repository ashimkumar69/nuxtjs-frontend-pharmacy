<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title class="d-flex justify-center">Verify Your Email</v-card-title>

            <v-card-actions class="d-flex justify-center">
              <v-btn
                @click="VerifyMail"
                depressed
                dark
                color="light-blue lighten-2"
                class="text-capitalize"
              >Send a Link to Verify Your Email</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Email-Verify",
  layout: "emailverifylayout",
  created() {
    this.$store.dispatch("user/fetchUser");
  },
  methods: {
    async VerifyMail() {
      try {
        await this.$axios.$get("/auth/email/resend").then((res) => {
          this.$toast.success(res.message, {
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

<style></style>
