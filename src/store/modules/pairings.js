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
};

export const mutations = {
    add(state, pairings) {
        if (!(pairings instanceof Array)) {
            pairings = [pairings];
        }

        for (let pairing of pairings) {
            let old = state.list.find((w) => w.id == pairing.id);
            if (old) {
                Object.assign(old, pairing);
            } else {
                state.list.push(pairing);
            }
        }
    },

    remove(state, pairing) {
        let index = state.list.findIndex((w) => w.id == pairing.id);
        if (index < 0) return;

        state.list.splice(index, 1);
    },
};

export const actions = {
    fetch(context, pairing) {
        if (limit('fetch-' + pairing.id + '.pairings')) return;

        return request.get('/worlds/' + pairing.id + '/pairings').then((list) => {
            context.commit('add', list);
        }, (e) => context.dispatch('handle', e, { root: true }));
    },

    delete(context, pairing) {
        context.commit('remove', pairing);

        let url = '/worlds/' + pairing.worldId + '/pairings/' + pairing.id;

        return request.request('DELETE', url).catch((e) => {
            context.dispatch('handle', e, { root: true });
        });
    },

    create(context, pairing) {
        let promise;

        if (pairing.pairs) {
            promise = request.post('/worlds/' + pairing.worldId + '/pairings/manual', pairing);
        } else {
            promise = request.post('/worlds/' + pairing.worldId + '/pairings', pairing);
        }

        return promise.then((pairing) => {
            let date = new Date(pairing.date);
            if (date < new Date()) return;

            context.commit('add', pairing);
        }, (e) => context.dispatch('handle', e, { root: true }));
    },
};
