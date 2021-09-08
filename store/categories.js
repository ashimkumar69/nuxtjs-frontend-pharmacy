export const state = () => ({
  categories: []
});

export const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  }
};

export const actions = {
  setCategories({ commit }, categories) {
    commit("SET_CATEGORIES", categories);
  },
  async fetchCategories({ commit }) {
    try {
      const categories = await this.$axios.$get("/category");

      commit("SET_CATEGORIES", categories.data);
    } catch (error) {}
  }
};

export const getters = {
  getCategories(state) {
    return state.categories;
  }
};
