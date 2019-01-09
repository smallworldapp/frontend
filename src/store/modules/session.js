import * as request from '@/util/request';

export const namespaced = true;

export const state = {
    exists: false,
    isAdmin: false,
    account: null,
};

export const getters = {
    exists(state) {
        return state.exists;
    },

    isAdmin(state) {
        return state.isAdmin;
    },

    account(state) {
        return state.account;
    },
};

export const mutations = {
    set(state, session) {
        request.setToken(session.token);

        state.exists = true;
        state.isAdmin = session.account == null;
        state.account = session.account;

        let key = 'smallworld.authtoken';
        if (state.isAdmin) key += '.admin';

        localStorage.setItem(key, session.token);
    },
};

export const actions = {
    init(context, session) {
        context.commit('set', session);

        if (session.account != null) {
            context.commit('accounts/add', session.account, { root: true });
        }

        if (location.hostname != 'localhost') return;

        let key = 'smallworld.authtoken';
        if (context.state.isAdmin) key += '.admin';

        localStorage.setItem(key, session.token);
    },

    login(context, args) {
        let path = args.admin ? '/auth/admin' : '/auth';
        let data = {
            email: args.email,
            password: args.password,
        };

        return request.post(path, data).then((result) => {
            context.dispatch('init', result);
        }, (error) => {
            if (error.status == 401) return;
            if (error.status == 404) return;

            context.dispatch('handle', error, { root: true });
        });
    },

    resume(context, args) {
        if (location.hostname != 'localhost') {
            return Promise.resolve();
        }

        let key = 'smallworld.authtoken';
        if (args && args.admin) key += '.admin';

        let token = localStorage.getItem(key);
        if (!token) return Promise.resolve();

        request.setToken(token);

        return request.get('/auth').then((result) => {
            context.dispatch('init', result);
        }, (error) => {
            if (error.status == 401) return;

            context.dispatch('handle', error, { root: true });
        });
    },
};
