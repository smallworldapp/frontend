<template>
    <div class="members-page">
        <template v-if="adding">
            <div class="actions">
                <button @click="adding = false">Back</button>
            </div>
            <add-members-page v-if="adding" :world="world" />
        </template>
        <template v-else>
            <div class="actions">
                <button @click="adding = true">Add Members</button>
                <button :disabled="!canResend" @click="resend()">Resend Confirmation Email</button>
            </div>
            <div class="query-args">
                <div class="query-arg">
                    <span>Search name: </span>
                    <input type="text" v-model="name" />
                </div>
                <div class="query-arg">
                    <span>Search email: </span>
                    <input type="text" v-model="email" />
                </div>
            </div>
            <members-table :world="world" :match="filter" />
        </template>
    </div>
</template>

<script>
import * as identifier from '@/router/identifier';

import * as request from '@/util/request';

import AddMembersPage from './add-members-page';
import MembersTable from './members-table';

/**
 * Check if a user matches a search query
 * @param {*} user
 * @param {string} name
 * @param {string} email
 * @return {boolean}
 */
function match(user, name, email) {
    let regex = new RegExp(name, 'i');
    if (!regex.test(user.firstName + ' ' + user.lastName)) {
        return false;
    }

    regex = new RegExp(email, 'i');
    if (!regex.test(user.email)) {
        return false;
    }

    return true;
}

export default {
    components: {
        AddMembersPage,
        MembersTable,
    },

    data() {
        return {
            name: '',
            email: '',
            adding: false,
            loading: false,
        };
    },

    computed: {
        ...identifier.state,

        canResend() {
            return !this.loading;
        },
    },

    created() {
        this.$store.dispatch('members/fetch', this.world);
    },

    methods: {
        resend() {
            this.loading = true;
            let counter = 0;
            let callback = () => {
                if (++counter == 2) {
                    this.loading = false;
                }
            };
            setTimeout(callback, 500);
            request.post(`/worlds/${this.world.id}/emails/confirmation`).then(callback);
        },

        filter(member) {
            if (member.worldId != this.world.id) return false;

            return match(member, this.name, this.email);
        },
    },
};
</script>

<style lang="less" scoped>
div.members-page {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
}

.query-args {
    flex: 0 0 auto;
    display: flex;

    >.query-arg {
        flex: 0 1 20em;
        padding-left: .5em;

        &:last-child {
            padding-right: .5em;
        }
    }

    >.resend-container {
        display: flex;
        padding: .5em 0 0 .5em;
        align-items: center;
    }
}

.actions {
    flex: 0 0 auto;
    padding: .5em;
    display: flex;

    button {
        margin-right: .5em;
    }
}
</style>
