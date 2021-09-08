import Vue from "vue";
import {
  required,
  email,
  min,
  confirmed,
  ext,
  max
} from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});

extend("min", {
  ...min,
  message: "{_field_} may not be less than {length} characters"
});

extend("email", {
  ...email,
  message: "Email must be valid"
});

extend("confirmed", {
  ...confirmed,
  message: "The {_field_} field confirmation does not match"
});

extend("ext", {
  ...ext,
  message: "File Must Be .zip Format"
});

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
