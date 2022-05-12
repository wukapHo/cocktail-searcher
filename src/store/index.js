import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: () => ({
    cocktailList: [],
    isLoading: false,
    isError: false,
  }),

  mutations: {
    addCocktail(state, cocktail) {
      state.cocktailList = [...state.cocktailList, ...cocktail];
    },

    setLoading(state, boolean) {
      state.isLoading = boolean;
    },

    setError(state, boolean) {
      state.isError = boolean;
    },
  },

  actions: {
    async fetchCocktailList({ commit }) {
      try {
        commit('setLoading', true);

        let cocktailsData;
        await axios.get('/mocks/cocktails.json')
          .then((res) => {
            cocktailsData = Object.values(res.data);
          });

        commit('addCocktail', cocktailsData);
      } catch (e) {
        commit('setError', true);
      } finally {
        commit('setLoading', false);
      }
    },
  },

  modules: {
  },
});
