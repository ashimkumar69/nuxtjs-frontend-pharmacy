<template>
  <div class="login">
    <div class="loginOverlay d-flex align-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6">
            <v-card>
              <v-card-title>Send Email</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <client-only>
                  <ValidationObserver ref="observer">
                    <v-form ref="form">
                      <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
                        <v-text-field
                          v-if="serverErrors.email"
                          color="light-blue lighten-2"
                          prepend-icon="mdi-email"
                          v-model="form.email"
                          :error-messages="serverErrors.email"
                          label="E-mail"
                          required
                        ></v-text-field>
                        <v-text-field
                          v-else
                          color="light-blue lighten-2"
                          prepend-icon="mdi-email"
                          v-model="form.email"
                          :error-messages="errors"
                          label="E-mail"
                          required
                        ></v-text-field>
                      </ValidationProvider>
                    </v-form>
                  </ValidationObserver>
                </client-only>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn text @click.stop="submit" class="text-capitalize">Send</v-btn>
                <v-spacer></v-spacer>
                <v-btn text @click.stop="clear" class="text-capitalize">Reset Form</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResetPasswordEmail",
  auth: "guest",
  // middleware: "isGuest",
  data() {
    return {
      form: {
        email: null,
      },
    };
  },
  methods: {
    submit() {
      this.$refs.observer.validate();

      this.$axios
        .$post("/auth/password/email", this.form)
        .then((res) => {
          this.$refs.form.reset();
          this.$toast.success(res.meassage, {
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
    clear() {
      this.$refs.form.reset();
      this.$refs.observer.reset();
      this.$store.dispatch("serverValidationErrors/clearErrors");
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  background-image: url("~assets/images/login/1.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}

.loginOverlay {
  height: 100%;
  background-color: rgba(245, 245, 245, 0.8);
}
</style>