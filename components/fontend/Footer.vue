<template>
  <div>
    <v-footer padless>
      <v-container>
        <v-row>
          <v-col cols="12" lg="4">
            <v-card flat tile class="text-center text-lg-left">
              <v-list>
                <v-list-item class="d-flex justify-center justify-lg-start">
                  <v-list-item-icon>
                    <v-img :src="footer.logo" width="30px"></v-img>
                    <span class="ml-2 black--text">{{ footer.name }}</span>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>

              <v-card-text class="px-0 pt-0" v-html="footer.description"></v-card-text>
              <v-card-title class="px-0 d-flex justify-center justify-lg-start">Follow Us</v-card-title>
              <v-card-text class="px-0">
                <v-btn
                  tag="a"
                  target="_blank"
                  class="mr-2"
                  :href="footer.f_link"
                  fab
                  small
                  color="light-blue lighten-2"
                  dark
                >
                  <v-icon small>fab fa-facebook-f</v-icon>
                </v-btn>
                <v-btn
                  tag="a"
                  target="_blank"
                  class="mr-2"
                  :href="footer.t_link"
                  fab
                  small
                  color="light-blue lighten-2"
                  dark
                >
                  <v-icon small>mdi-twitter</v-icon>
                </v-btn>
                <v-btn
                  tag="a"
                  target="_blank"
                  :href="footer.y_link"
                  fab
                  small
                  color="light-blue lighten-2"
                  dark
                >
                  <v-icon small>mdi-youtube</v-icon>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" lg="4">
            <v-card flat tile>
              <v-card-title class="d-flex justify-center justify-lg-start">Manually Contact Us</v-card-title>
              <v-list class="text-center text-lg-left">
                <v-list-item>
                  <v-list-item-icon class="mr-2">
                    <v-icon color="light-blue lighten-2">mdi-phone</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-subtitle>{{ footer.phone }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon class="mr-2">
                    <v-icon color="light-blue lighten-2">mdi-clock</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-subtitle>Hotline Hours: {{ footer.houre }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon class="mr-2">
                    <v-icon color="light-blue lighten-2">mdi-email</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-subtitle>{{ footer.email }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon class="mr-2">
                    <v-icon color="light-blue lighten-2">fas fa-map-marker-alt</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-card-text class="pt-0 px-0 text--secondary" v-html="footer.address"></v-card-text>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" lg="4">
            <v-card flat tile>
              <v-card-title class="d-flex justify-center justify-lg-start">Newsletter</v-card-title>

              <v-card-text>
                <div
                  class="mb-2 text-center text-lg-left"
                >Don’t miss to subscribe to our news feeds, kindly fill the form below</div>
                <client-only>
                  <ValidationObserver ref="observer">
                    <v-form ref="form">
                      <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
                        <v-text-field
                          color="light-blue lighten-2"
                          v-model="form.email"
                          :error-messages="errors"
                          label="Your Email Address"
                          outlined
                          clearable
                          required
                        ></v-text-field>
                      </ValidationProvider>
                    </v-form>
                  </ValidationObserver>
                </client-only>

                <v-btn block color="light-blue lighten-2" outlined @click.stop="submit">SUBSCRIBE</v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
    <v-card flat tile class="text-center">
      <v-divider></v-divider>

      <v-card-text>
        Copyright &copy; {{ new Date().getFullYear() }} —
        Powered by
        <strong>{{ footer.name }}</strong>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      icons: [
        { id: 1, icon: "fab fa-facebook-f" },
        { id: 2, icon: "mdi-twitter" },
        { id: 3, icon: "mdi-youtube" },
      ],
      form: {
        email: null,
      },
    };
  },
  computed: {
    ...mapGetters({ footer: "footer/getFooter" }),
  },
  methods: {
    submit() {
      this.$refs.observer.validate();
      this.$refs.observer.reset();
      this.$refs.form.reset();
    },
  },
};
</script>