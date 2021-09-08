export const state = () => ({
  user: {}
});

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  }
};

export const actions = {
  setUser({ commit }, user) {
    commit("SET_USER", user);
  },
  async fetchUser({ dispatch }) {
    try {
      const user = await this.$axios.$get("/auth/user");

      dispatch("setUser", user.data);
    } catch (error) {}
  }
};

export const getters = {
  getUser(state) {
    return state.user;
  }
};
