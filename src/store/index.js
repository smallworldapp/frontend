import Vue from 'vue';
import Vuex from 'vuex';

const context = require.context('./modules', false, /\.js$/);
const modules = {};

for (let key of context.keys()) {
    let split = key.split(/\/|\./g).filter((a) => a);
    let mod = context(key);

    modules[split[0]] = mod;
}

const state = {
    error: null,

    redirect: null,
};

const getters = {
    error(state) {
        return state.error;
    },
};

const mutations = {
    error(state, error) {
        state.error = error;
    },

    setHeader(state, header) {
        state.header = header;
    },

    setRedirect(state, path) {
        state.redirect = path;
    },
};

const actions = {
    '404'(store) {
        store.commit('error', 404);
    },

    handle(store, error) {
        if (error.status == 401) {
            return;
        }

        store.commit('error', error);
    },
};

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules,
});
