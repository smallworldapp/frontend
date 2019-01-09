<template>
    <div class="connections-page" v-if="world && account">
        <div class="summary-row">
            <span>{{ world.name }} Administrated by {{ account.name }}</span>
        </div>
        <div class="summary-row">
            <span>{{ members }}</span>
        </div>
        <div class="spacer" />
        <div class="spacer" />
        <div class="summary-row">
            <standard-pairing-creator v-if="world.accountType == 'standard'" :world="world" @created="onPairingCreated($event)"
            />
            <research-pairing-creator v-else-if="world.accountType == 'research'" :world="world"
                @created="onPairingCreated($event)" />
        </div>
        <div class="spacer" />
        <div class="summary-row">
            <pairings-viewer :world="world" :key="counter" />
        </div>
    </div>
</template>

<script>
import * as identifier from '@/router/identifier';

import PairingsViewer from './pairings-viewer';
import StandardPairingCreator from './standard-pairing-creator';
import ResearchPairingCreator from './research-pairing-creator';

export default {
    components: {
        PairingsViewer,
        StandardPairingCreator,
        ResearchPairingCreator,
    },

    data() {
        return {
            counter: 0,
        };
    },

    computed: {
        ...identifier.state,

        members() {
            let members = `${this.world.memberCount.confirmed} active member`;
            if (this.world.memberCount.confirmed != 1) {
                members += 's';
            }
            if (this.world.memberCount.privacy > 0) {
                members += `, ${this.world.memberCount.privacy} awaiting confirmation`;
            }
            return members;
        },
    },

    methods: {
        onPairingCreated(date) {
            this.counter++;
        },
    },
};
</script>

<style lang="less" scoped>
.connections-page {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
}

.summary-row {
    padding: 0 10px;
}

.spacer {
    flex: 0 0 1.5em;
}
</style>
