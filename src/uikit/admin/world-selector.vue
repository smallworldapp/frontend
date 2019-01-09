<template>
    <div class="world-list">
        <div v-for="w in worlds" class="world" :key="w.id" :class="{ active: w == value }" @click="$emit('input', w)">
            <span v-text="w.name" />
            <span v-if="w.status == 'pending'" class="unread-alert">!</span>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        account: Object,
        value: Object,
    },

    computed: {
        ...mapGetters({
            allWorlds: 'worlds/all',
        }),

        worlds() {
            return this.allWorlds.filter((w) => {
                return w.accountId == this.account.id;
            });
        },
    },

    created() {
        this.$store.dispatch('worlds/fetch', this.account);
    },
};
</script>

<style lang="less" scoped>
.world {
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
