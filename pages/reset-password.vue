<template>
  <div class="login">
    <div class="loginOverlay d-flex align-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6">
            <v-card>
              <v-card-title>Reset Password</v-card-title>
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
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="password"
                        rules="required|min:8"
                        vid="confirmation"
                      >
                        <v-text-field
                          v-if="serverErrors.password"
                          color="light-blue lighten-2"
                          prepend-icon="mdi-lock"
                          v-model="form.password"
                          :error-messages="serverErrors.password"
                          :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="passwordShow ? 'text' : 'password'"
                          name="password"
                          label="New Password"
                          hint="At least 8 characters"
                          counter
                          @click:append="passwordShow = !passwordShow"
                        ></v-text-field>
                        <v-text-field
                          v-else
                          color="light-blue lighten-2"
                          prepend-icon="mdi-lock"
                          v-model="form.password"
                          :error-messages="errors"
                          :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="passwordShow ? 'text' : 'password'"
                          name="password"
                          label="New Password"
                          hint="At least 8 characters"
                          counter
                          @click:append="passwordShow = !passwordShow"
                        ></v-text-field>
                      </ValidationProvider>

                      <ValidationProvider
                        v-slot="{ errors }"
                        name="password_confirmation"
                        rules="confirmed:confirmation"
                      >
                        <v-text-field
                          color="light-blue lighten-2"
                          prepend-icon="mdi-lock"
                          v-model="form.password_confirmation"
                          :error-messages="errors"
                          :append-icon="password_confirmationShow ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="password_confirmationShow ? 'text' : 'password'"
                          name="password_confirmation"
                          label="Confirm Password"
                          counter
                          @click:append="password_confirmationShow = !password_confirmationShow"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-form>
                  </ValidationObserver>
                </client-only>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn text @click="submit" class="text-capitalize">Save</v-btn>
                <v-spacer></v-spacer>
                <v-btn text @click="clear" class="text-capitalize">Reset Form</v-btn>
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
  name: "ResetPassword",
  auth: "guest",
  // middleware: "isGuest",
  data() {
    return {
      form: {
        token: this.$route.query.token,
        email: null,
        password: null,
        password_confirmation: null,
      },
      passwordShow: false,
      password_confirmationShow: false,
    };
  },
  methods: {
    submit() {
      this.$refs.observer.validate();

      this.$axios
        .$post("/auth/password/reset", this.form)
        .then((res) => {
          this.$refs.form.reset();
          this.$router.push("/login");
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