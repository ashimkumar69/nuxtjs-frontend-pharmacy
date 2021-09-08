export const state = () => ({
  blogs: []
});

export const mutations = {
  SET_BLOGS(state, blogs) {
    state.blogs = blogs;
  }
};

export const actions = {
  setBlogs({ commit }, blogs) {
    commit("SET_BLOGS", blogs);
  },
  async fetchBlogs({ commit }) {
    try {
      const blogs = await this.$axios.$get("/blog");

      commit("SET_BLOGS", blogs.data);
    } catch (error) {}
  }
};

export const getters = {
  getBlogs(state) {
    return state.blogs;
  }
};
