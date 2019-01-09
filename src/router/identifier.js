import * as Vuex from 'vuex';
import * as request from '@/util/request';

export const state = Vuex.mapState({
    world(state, getters) {
        let id = this.$route.params.identifier;
        if (!id) return null;

        let list = getters['worlds/all'];
        return list.find((w) => w.id == id || w.identifier == id);
    },

    account(state, getters) {
        if (!this.world) return null;

        let list = getters['accounts/all'];
        let id = this.world.accountId;
        return list.find((w) => w.id == id);
    },
});

/**
 * Fetch identifier from route
 * @param {Vue} self
 * @return {Promise} promise
 */
export function fetch(self) {
    return self.$store.dispatch('worlds/fetch', self.$route.params.identifier);
}

/**
 * Update world identifier
 * @param {*} self
 * @param {*} world
 * @param {*} identifier
 */
export async function update(self, world, identifier) {
    let resource = `/worlds/${world.id}`;

    let updated = await request.patch(resource, {
        identifier: identifier,
    });

    let oldId = world.identifier;

    world.identifier = updated.identifier;

    if (self.$route.fullPath.startsWith(`/${oldId}/`) ||
        self.$route.fullPath.startsWith(`/server-admin/manage/${oldId}/`)) {
        self.$router.replace(self.$route.fullPath.replace(`/${oldId}/`, `/${identifier}/`));
    }
}
