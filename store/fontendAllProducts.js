export const state = () => ({
  products: []
});

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  }
};

export const actions = {
  setProducts({ commit }, products) {
    commit("SET_PRODUCTS", products);
  },
  async fetchProducts({ commit }) {
    try {
      const products = await this.$axios.$get("/allProductIndex");

      commit("SET_PRODUCTS", products.data);
    } catch (error) {}
  }
};

export const getters = {
  getProducts(state) {
    return state.products;
  }
};
