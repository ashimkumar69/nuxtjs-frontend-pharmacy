export default function({ $axios, store }) {
  $axios.onError(error => {
    if (error.response.status === 400) {
      store.dispatch(
        "serverValidationErrors/setErrors",
        error.response.data.errors
      );
    }
  });
  $axios.onError(error => {
    if (error.response.status === 401) {
      store.dispatch(
        "serverValidationErrors/setErrors",
        error.response.data.errors
      );
    }
  });
  $axios.onError(error => {
    if (error.response.status === 403) {
      store.dispatch(
        "serverValidationErrors/setErrors",
        error.response.data.errors
      );
    }
  });
  $axios.onError(error => {
    if (error.response.status === 422) {
      store.dispatch(
        "serverValidationErrors/setErrors",
        error.response.data.errors
      );
    }
  });

  $axios.onRequest(() => {
    store.dispatch("serverValidationErrors/clearErrors");
  });
}
