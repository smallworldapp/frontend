<template>
    <div class="manage-page">
        <div class="column">
            <h4>Accounts:</h4>
            <sw-admin-account-selector v-model="account" />
            <button class="create-button" @click="creating = true">Create New</button>
        </div>
        <div class="column">
            <h4>Worlds:</h4>
            <sw-admin-world-selector v-if="account" :key="account.id" :account="account" :value="world" @input="onWorldSelect" />
            <button v-if="account && !creating" class="delete-button" @click="deleting = true">Delete Account</button>
        </div>

        <account-create-page v-if="creating" @created="onCreated($event)" />
        <confirm-delete-page v-else-if="deleting" @responded="onResponded($event)" />

        <div class="error" v-else-if="world && world.status != 'passed'">
            Something went wrong :(
        </div>

        <router-view v-else-if="world"></router-view>
    </div>
</template>

<script>
import AccountCreatePage from './account-create-page';
import ConfirmDeletePage from './confirm-delete-page';

export default {
    components: {
        AccountCreatePage,
        ConfirmDeletePage,
    },

    data() {
        return {
            account: null,
            world: null,
            creating: false,
            deleting: false,
        };
    },

    created() {
        this.$router.push('/server-admin/manage');
    },

    watch: {
        account(v) {
            this.world = null;
            this.$router.push('/server-admin/manage');
        },
    },

    methods: {
        onWorldSelect(world) {
            this.world = world;
            this.$router.push('/server-admin/manage/' + (world.identifier || world.id) + '/connections');
        },

        onCreated(acc) {
            this.creating = false;
        },

        onResponded(response) {
            if (response) {
                this.$store.dispatch('accounts/delete', this.account).then((a) => {
                    this.account = null;
                    this.deleting = false;
                });
            } else {
                this.deleting = false;
            }
        },
    },
};
</script>

<style scoped lang="less">
div.manage-page {
    flex: 1 0 auto;
    display: flex;

    >.column {
        flex: 0 0 auto;
        min-width: 10em;

        h4 {
            padding: 10px 10px 2px 10px;
            font-size: 1em;
            font-weight: bold;
            border-bottom: 2px solid black;
            margin: 0;
        }

        >.create-button,
        >.delete-button {
            margin: 10px;
        }
    }
}
</style>
