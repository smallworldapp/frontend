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

    byIdentifier: (state, getters) => (id) => {
        return getters.all.find((w) => w.id == id);
    },
};

export const mutations = {
    add(state, worlds) {
        if (!(worlds instanceof Array)) {
            worlds = [worlds];
        }

        for (let world of worlds) {
            let old = state.list.find((w) => w.id == world.id);
            if (old) {
                Object.assign(old, world);
            } else {
                state.list.push(world);
            }
        }
    },

    remove(state, world) {
        let index = state.list.findIndex((w) => w.id == world.id);
        if (index < 0) return;

        state.list.splice(index, 1);
    },
};

export const actions = {
    fetch(context, arg) {
        if (typeof arg == 'string') {
            return request.get('/worlds/' + arg).then((world) => {
                context.commit('add', world);

                return world;
            }, (e) => {
                if (e.status == 404) {
                    return;
                }

                context.dispatch('handle', e, { root: true });
            });
        }

        let path = '/worlds';
        if (arg) {
            if (limit('fetch-' + arg.id + '.worlds')) return;

            path = '/accounts/' + arg.id + path;
        } else {
            if (limit('fetch-worlds')) return;
        }

        return request.get(path).then((list) => {
            context.commit('add', list);
        }, (e) => {
            context.dispatch('handle', e, { root: true });
        });
    },

    delete(context, world) {
        context.commit('remove', world);

        return request.request('DELETE', '/worlds/' + world.id).catch((e) => {
            context.dispatch('handle', e, { root: true });
        });
    },

    create(context, world) {
        return request.post('/worlds', world).then((world) => {
            context.commit('add', world);
            return world;
        }, (e) => context.dispatch('handle', e, { root: true }));
    },

    update(context, patch) {
        return request.patch('/worlds/' + patch.id, patch).then((world) => {
            context.commit('add', world);
        }, (e) => context.dispatch('handle', e, { root: true }));
    },
};
