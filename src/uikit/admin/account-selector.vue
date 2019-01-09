<template>
    <div class="account-list">
        <div v-for="a in accounts" class="account" :class="{ active: a == value}" :key="a.id" @click="$emit('input', a)">
            <span v-text="a.name" />
            <!--<span v-if="a.worlds.filter(w => w.status == 'pending').length != 0" class="unread-alert">
                            {{ a.worlds.filter(w => w.status == 'pending').length }}
                        </span>-->
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        value: Object,
    },

    computed: {
        ...mapGetters({
            accounts: 'accounts/all',
        }),
    },

    created() {
        this.$store.dispatch('accounts/fetch');
    },
};
</script>

<style lang="less" scoped>
.account {
    padding: 10px;
    cursor: pointer;
    position: relative;

    &.active {
        background: #b8daea;
    }

    &:hover {
        text-shadow: 0 0 10px lightgray;
    }

    >.unread-alert {
        position: absolute;
        height: 100%;
        right: 10px;
        top: 0;
        display: flex;
        align-items: center;

        font-size: 2em;
        color: orange;
        font-weight: bold;
    }
}
</style>
