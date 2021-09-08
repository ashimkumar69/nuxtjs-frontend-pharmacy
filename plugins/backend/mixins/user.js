import Vue from "vue";
import { mapGetters } from "vuex";

const User = {
  install(Vue, options) {
    Vue.mixin({
      computed: {
        ...mapGetters({
          // LoggedIn: "loggedIn",
          // User: "user"
        })
      }
    });
  }
};

Vue.use(User);
