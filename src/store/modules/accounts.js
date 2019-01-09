import * as request from '@/util/request';
import { limit } from '@/util/ratelimit';

export const namespaced = true;

export const state = {
    list: [],
};

export const getters = {
    all(state) {
        return state.list;
    },

    fromWorld: (state, getters) => (world) => {
        return getters.all.find((a) => a.id == world.accountId);
    },
};

export const mutations = {
    add(state, accounts) {
        if (!(accounts instanceof Array)) {
            accounts = [accounts];
        }

        for (let account of accounts) {
            let old = state.list.find((w) => w.id == account.id);
            if (old) {
                Object.assign(old, account);
            } else {
                state.list.push(account);
            }
        }
    },

    remove(state, acc) {
        let index = state.list.findIndex((w) => w.id == acc.id);
        if (index < 0) return;

        state.list.splice(index, 1);
    },
};

export const actions = {
    fetch(context) {
        if (limit('fetch-accounts')) return;

        return request.get('/accounts').then((list) => {
            context.commit('add', list);
        }, (e) => context.dispatch('handle', e, { root: true }));
    },

    delete(context, account) {
        context.commit('remove', account);

        return request.request('DELETE', '/accounts/' + account.id).catch((e) => {
            context.dispatch('handle', e, { root: true });
        });
    },

    create(context, account) {
        return request.post('/accounts', account).then((acc) => {
            context.commit('add', acc);
        }, (e) => context.dispatch('handle', e, { root: true }));
    },
};
