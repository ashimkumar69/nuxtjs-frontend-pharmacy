export const state = () => ({
  footer: {}
});

export const mutations = {
  SET_FOOTER(state, footer) {
    state.footer = footer;
  }
};

export const actions = {
  setFooter({ commit }, footer) {
    commit("SET_FOOTER", footer);
  }
  // async fetchContacts({ commit }) {
  //   try {
  //     const contacts = await this.$axios.$get("/contact");

  //     commit("SET_CONTACTS", contacts.data);
  //   } catch (error) {}
  // }
};

export const getters = {
  getFooter(state) {
    return state.footer;
  }
};
