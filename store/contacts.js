// export const state = () => ({
//   contacts: []
// });

// export const mutations = {
//   SET_CONTACTS(state, contacts) {
//     state.contacts = contacts;
//   }
// };

// export const actions = {
//   setContacts({ commit }, contacts) {
//     commit("SET_CONTACTS", contacts);
//   },
//   async fetchContacts({ commit }) {
//     try {
//       const contacts = await this.$axios.$get("/contact");

//       commit("SET_CONTACTS", contacts.data);
//     } catch (error) {}
//   }
// };

// export const getters = {
//   getContacts(state) {
//     return state.contacts;
//   }
// };
