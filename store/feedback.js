export const state = () => ({
  feedbacks: []
});

export const mutations = {
  SET_FEEDBACKS(state, feedbacks) {
    state.feedbacks = feedbacks;
  }
};

export const actions = {
  setFeedbacks({ commit }, feedbacks) {
    commit("SET_FEEDBACKS", feedbacks);
  },
  async fetchFeedbacks({ commit }) {
    try {
      const feedbacks = await this.$axios.$get("/userFeedbackIndex");

      commit("SET_FEEDBACKS", feedbacks.data);
    } catch (error) {}
  }
};

export const getters = {
  getFeedbacks(state) {
    return state.feedbacks;
  }
};
