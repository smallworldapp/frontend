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
    add(state, members) {
        if (!(members instanceof Array)) {
            members = [members];
        }

        for (let member of members) {
            let old = state.list.find((w) => w.id == member.id);
            if (old) {
                Object.assign(old, member);
            } else {
                state.list.push(member);
            }
        }
    },

    remove(state, member) {
        let index = state.list.findIndex((w) => w.id == member.id);
        if (index < 0) return;

        state.list.splice(index, 1);
    },
};

export const actions = {
    fetch(context, world) {
        if (limit('fetch-' + world.id + '.members')) return;

        return request.get('/worlds/' + world.id + '/members').then((list) => {
            context.commit('add', list);
        }, (e) => context.dispatch('handle', e, { root: true }));
    },

    update(context, member) {
        let url = '/worlds/' + member.worldId + '/members/' + member.id + '/status';

        return request.put(url, member.status).then((member) => {
            context.commit('add', member);
        }, (e) => context.dispatch('handle', e, { root: true }));
    },

    create(context, args) {
        let worldId = args.worldId;
        let list = args.members || [args.member];

        return request.post('/worlds/' + worldId + '/members', list).then((added) => {
            context.commit('add', added);
        }, (e) => context.dispatch('handle', e, { root: true }));
    },
};
