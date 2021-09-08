<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6" class="mx-auto">
          <v-card shaped>
            <v-card-text class="d-flex flex-column align-center">
              <v-avatar size="100">
                <v-img v-if="avatar" :src="avatar"></v-img>
                <v-img v-else :src="user.avatar"></v-img>
              </v-avatar>
              <v-card-title>{{ user.name }}</v-card-title>
            </v-card-text>
            <v-divider></v-divider>
            <v-subheader>Personal Details</v-subheader>
            <v-list dense>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon small>fas fa-phone-volume</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ user.phone }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon small>fas fa-envelope</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ user.email }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon small>fas fa-map-marker-alt</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ user.address }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-expansion-panels focusable>
              <v-expansion-panel>
                <v-expansion-panel-header>Edit Profile</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-form ref="form">
                    <v-file-input
                      color="light-blue lighten-2"
                      class="mt-4"
                      type="file"
                      accept="image/*"
                      @change="getFile"
                      label="Avatar"
                      outlined
                      dense
                      show-size
                      :error-messages="serverErrors.avatar"
                    ></v-file-input>

                    <v-text-field
                      color="light-blue lighten-2"
                      v-model="form.name"
                      label="Name"
                      outlined
                      dense
                    ></v-text-field>

                    <v-text-field
                      color="light-blue lighten-2"
                      v-model="form.phone"
                      label="Phone"
                      outlined
                      dense
                    ></v-text-field>

                    <v-text-field
                      color="light-blue lighten-2"
                      v-model="form.email"
                      label="Email"
                      outlined
                      dense
                      :error-messages="serverErrors.email"
                    ></v-text-field>

                    <v-text-field
                      color="light-blue lighten-2"
                      v-model="form.address"
                      label="Address"
                      outlined
                      dense
                    ></v-text-field>
                    <v-text-field
                      color="light-blue lighten-2"
                      v-model="form.password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      name="password"
                      label="Give Password for Update"
                      counter
                      :error-messages="serverErrors.password"
                      @click:append="show1 = !show1"
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
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Profile",
  data() {
    return {
      show1: false,

      form: {
        avatar: null,
        name: null,
        phone: null,
        email: null,
        address: null,
        password: null,
      },
      avatar: null,
    };
  },
  computed: {
    ...mapGetters({
      user: "user/getUser",
    }),
  },

  methods: {
    getFile(e) {
      const file = e;

      let imageType = /image.*/;

      if (file !== undefined) {
        if (file.type.match(imageType)) {
          this.form.avatar = file;
          this.readFile(file);
        }
      }
    },
    readFile(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.avatar = e.target.result;
      };
    },
    submitForm() {
      const form = new FormData();
      if (this.form.name) {
        form.append("name", this.form.name);
      }
      if (this.form.phone) {
        form.append("phone", this.form.phone);
      }
      if (this.form.email) {
        form.append("email", this.form.email);
      }
      if (this.form.address) {
        form.append("address", this.form.address);
      }
      if (this.form.avatar) {
        form.append("avatar", this.form.avatar);
      }
      if (this.form.password) {
        form.append("password", this.form.password);
      }

      this.$axios
        .$post("/user/detail", form)
        .then((res) => {
          this.$refs.form.reset();
          this.$store.dispatch("user/fetchUser");
          this.$toast.success("Successfully Edit Profile", {
            duration: 5000,
            action: {
              text: "Cancel",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          });

          if (res == "logout") {
            this.$auth.logout("local").then(() => {
              this.$toast.success("Login Again", {
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