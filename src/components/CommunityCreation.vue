<template>
    <div class="community-creation-page">
        <div class="content">
            <span>Please enter the name of your community</span>
            <sw-input ref="input" v-model="name" class="input" />

            <template v-if="isPrivacyVisible">
                <span>Select the privacy level for your smallworld community: (you can change this at any time)</span>
                <sw-privacy-selector v-model="privacy" />
            </template>
        </div>

        <div class="buttons">
            <router-link to="/your-communities">
                <button :disabled="loading">Cancel</button>
            </router-link>

            <button @click="create()" :disabled="loading || invalid" class="special">Create</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            loading: false,
            name: { value: '', error: false },
            privacy: 'public',
        };
    },

    computed: {
        ...mapGetters({
            account: 'session/account',
        }),

        invalid() {
            return !this.name.value || /[^\d\w' ]+/.test(this.name.value);
        },

        isPrivacyVisible() {
            return this.account.type == 'standard';
        },
    },

    methods: {
        create() {
            let createArgs = { name: this.name.value, privacy: this.privacy };

            this.loading = true;

            this.$store.dispatch('worlds/create', createArgs).then((world) => {
                this.loading = false;
                this.$router.push(`/${world.id}/manage`);
            });
        },
    },
};
</script>


<style lang="less" scoped>
.community-creation-page {
    padding: 5em 0 4em 0;
    flex: 1;
}

.input {
    width: 100%;
    margin: 1em 0;
}

.buttons {
    display: flex;
    justify-content: space-around;

    button {
        margin-right: 2em;
    }
}
</style>
