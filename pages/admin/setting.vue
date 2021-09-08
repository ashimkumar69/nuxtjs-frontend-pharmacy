<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6" class="mx-auto">
          <v-card shaped>
            <v-card-text>
              <v-form ref="form">
                <v-text-field
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

                <v-text-field
                  color="light-blue lighten-2"
                  v-model="form.old_password"
                  :append-icon="old_passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="old_passwordShow ? 'text' : 'password'"
                  name="password"
                  label="Give Password for Update"
                  counter
                  :error-messages="serverErrors.old_password"
                  @click:append="old_passwordShow = !old_passwordShow"
                ></v-text-field>
                <v-card-actions>
                  <v-btn
                    @click.stop="submitForm"
                    class="text-capitalize"
                    dark
                    color="light-blue lighten-2"
                  >Update</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Setting",
  data() {
    return {
      old_passwordShow: false,
      passwordShow: false,
      password_confirmationShow: false,
      form: {
        old_password: null,
        password: null,
        password_confirmation: null,
      },
    };
  },

  methods: {
    submitForm() {
      this.$axios
        .$post("/user/setting", this.form)
        .then((res) => {
          this.$refs.form.reset();

          this.$toast.success("Successfully Change Password", {
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
};
</script>

<style>
</style>