<template>
  <div class="login">
    <div class="loginOverlay d-flex align-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6">
            <v-card>
              <v-card-title>Login</v-card-title>
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
                          label="Password"
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
                          label="Password"
                          hint="At least 8 characters"
                          counter
                          @click:append="passwordShow = !passwordShow"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-form>
                  </ValidationObserver>
                </client-only>
                <v-hover v-slot:default="{hover}">
                  <v-card-subtitle v-if="hover" class="py-0">
                    <a
                      class="text-decoration-underline"
                      @click.stop="goForgotPage"
                    >Forgot your password?</a>
                  </v-card-subtitle>
                  <v-card-subtitle v-else class="py-0">Forgot your password?</v-card-subtitle>
                </v-hover>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn text @click.stop="submit" class="text-capitalize">Login</v-btn>
                <v-spacer></v-spacer>
                <v-btn text @click.stop="clear" class="text-capitalize">Reset Form</v-btn>
              </v-card-actions>
              <v-divider></v-divider>
              <v-hover v-slot:default="{hover}">
                <v-card-subtitle v-if="hover">
                  <a
                    class="text-decoration-underline"
                    @click.stop="goRegisterPage"
                  >Don't have an account? Register</a>
                </v-card-subtitle>
                <v-card-subtitle v-else>Don't have an account? Register</v-card-subtitle>
              </v-hover>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  auth: "guest",
  // middleware: "isGuest",
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      passwordShow: false,
      absolute: true,
      opacity: 0.1,
    };
  },

  methods: {
    submit() {
      this.$refs.observer.validate();
      try {
        if (this.form.email && this.form.password) {
          this.$auth.loginWith("local", { data: this.form }).then(() => {
            if (
              this.$auth.user.role == "Super Admin" ||
              this.$auth.user.role == "Admin"
            ) {
              this.$router.push({ name: "admin" });
            } else {
              this.$router.push({ name: "admin-userdashbord" });
            }
            this.$refs.form.reset();
            this.$toast.success("Successfully Login", {
              duration: 5000,
              action: {
                text: "Cancel",
                onClick: (e, toastObject) => {
                  toastObject.goAway(0);
                },
              },
            });
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    clear() {
      this.$refs.form.reset();
      this.$refs.observer.reset();
      this.$store.dispatch("serverValidationErrors/clearErrors");
    },
    goRegisterPage() {
      this.$router.push("/register");
    },
    goForgotPage() {
      this.$router.push("/reset-password-email");
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