import Vue from "vue";
import { mapGetters } from "vuex";

const serverValidationErrors = {
  install(Vue, options) {
    Vue.mixin({
      computed: {
        ...mapGetters({
          serverErrors: "serverValidationErrors/getErrors"
        })
      }
    });
  }
};

Vue.use(serverValidationErrors);
