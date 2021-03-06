import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import { mapFields, getField, updateField } from './package/src';

const localVue = createLocalVue();

localVue.use(Vuex);

describe(`Component initialized with namespaced Vuex module.`, () => {
  let Component;
  let store;
  let wrapper;

  beforeEach(() => {
    Component = {
      template: `<input id="foo" v-model="foo">`,
      computed: {
        ...mapFields(`fooModule`, [
          `foo`,
        ]),
      },
    };

    store = new Vuex.Store({
      modules: {
        fooModule: {
          namespaced: true,
          state: {
            foo: ``,
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
        },
      },
    });

    wrapper = shallowMount(Component, { localVue, store });
  });

  test(`It should render the component.`, () => {
    expect(wrapper.exists()).toBe(true);
  });

  test(`It should update field values when the store is updated.`, () => {
    store.state.fooModule.foo = `foo`;

    expect(wrapper.element.value).toBe(`foo`);
  });

  test(`It should update the store when the field values are updated.`, () => {
    wrapper.element.value = `foo`;
    wrapper.trigger(`input`);

    expect(store.state.fooModule.foo).toBe(`foo`);
  });
});
