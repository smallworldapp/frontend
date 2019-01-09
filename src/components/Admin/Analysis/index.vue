<template>
    <div class="analysis-page">
        <div class="column">
            <h4>Accounts:</h4>
            <sw-admin-account-selector v-model="account" />
        </div>
        <div class="column">
            <h4>Worlds:</h4>
            <sw-admin-world-selector v-if="account" :key="account.id" :account="account" v-model="world" />
        </div>

        <world-analysis v-if="world" :world="world" :key="world.id" />
    </div>
</template>

<script>
import WorldAnalysis from './world-analysis';

export default {
    components: {
        WorldAnalysis,
    },

    data() {
        return {
            account: null,
            world: null,
        };
    },

    watch: {
        account(v) {
            this.world = null;
        },
    },
};
</script>

<style scoped lang="less">
.analysis-page {
    flex: 1 0 auto;
    display: flex;
}

.column {
    flex: 0 0 auto;
    min-width: 10em;

    h4 {
        padding: 10px 10px 2px 10px;
        font-size: 1em;
        font-weight: bold;
        border-bottom: 2px solid black;
        margin: 0;
    }
}
</style>
