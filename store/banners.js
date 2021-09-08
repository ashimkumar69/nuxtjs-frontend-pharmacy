export const state = () => ({
  banners: []
});

export const mutations = {
  SET_BANNERS(state, banners) {
    state.banners = banners;
  }
};

export const actions = {
  setBanners({ commit }, banners) {
    commit("SET_BANNERS", banners);
  }
  // async fetchBanners({ commit }) {
  //   try {
  //     const banners = await this.$axios.$get("/bannerIndex");

  //     commit("SET_BANNERS", banners.data);
  //   } catch (error) {}
  // }
};

export const getters = {
  getBanners(state) {
    return state.banners;
  }
};
