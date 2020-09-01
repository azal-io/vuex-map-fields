import Vuex from 'vuex';

export default ({ getField, updateField }) => new Vuex.Store({
  state: {
    foo: ``,
    bar: {
      bar: ``,
    },
    baz: [
      {
        foo: {
          baz: ``,
        },
      },
    ],
  },
  getters: {
    getField,
  },
  mutations: {
    updateField,
  },
  actions: {
    updateField({ commit }, { path, value }) {
      commit(`updateField`, { path, value });
    },
  },
});
