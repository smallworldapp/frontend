<template>
    <div class="pairing-viewer">
        <span v-if="!pairings">Loading...</span>
        <span v-else-if="pairings.length == 0">No connections! Create connections above</span>
        <template v-else>
            <h4>Upcoming connections: </h4>
            <div class="pairing" v-for="pairing in pairings" :key="pairing.id">
                <div class="header">
                    <span class="summary">{{ pairing.days == 1 ? 'Tomorrow' : pairing.days + ' days' }}</span>
                    <span class="details">{{ pairing.date }}</span>
                    <span v-if="!pairing.auto" class="details delete" :class="{ disabled: loading }"
                        @click="remove(pairing)">DELETE</span>
                </div>

                <span class="message" v-if="pairing.message">{{ pairing.message }}</span>
            </div>
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        world: Object,
    },

    data() {
        return {
            loading: false,
        };
    },

    computed: {
        ...mapGetters({
            allPairings: 'pairings/all',
        }),

        pairings() {
            let raw = this.allPairings.filter((p) => {
                return p.worldId == this.world.id;
            });

            let list = raw.map((d) => ({
                date: new Date(d.date),
                message: d.message,
                id: d.id,
                auto: false,
                raw: d,
            }));

            if (this.world.pairingSettings && this.world.pairingSettings.enabled) {
                let date = new Date(this.world.pairingSettings.start);
                for (let i = 0; i < 10; i++) {
                    if (date > new Date()) {
                        list.push({ date: new Date(date), auto: true });
                    } else {
                        i--;
                    }
                    date.setDate(date.getDate() + this.world.pairing.period * 7);
                }
            }

            list.sort((a, b) => a.date - b.date);
            list.splice(10);

            return list.map((l) => {
                let diff = l.date.getTime() - new Date().getTime();
                let days = Math.ceil(diff / 1000 / 60 / 60 / 24);
                let date = l.date.toLocaleDateString(undefined, {
                    month: 'long',
                    day: 'numeric',
                });

                return { days, date, message: l.message, id: l.id, auto: l.auto, raw: l.raw };
            });
        },
    },

    created() {
        this.$store.dispatch('pairings/fetch', this.world);
    },

    methods: {
        remove(pairing) {
            if (this.loading) return;

            this.loading = true;

            this.$store.dispatch('pairings/delete', pairing.raw).then(() => {
                this.loading = false;
            });
        },
    },
};
</script>


<style lang="less" scoped>
.pairing-viewer {
    display: flex;
    flex-direction: column;
}

.pairing {
    cursor: default;
    display: flex;
    flex-direction: column;

    .header {
        display: flex;
    }

    .summary {
        width: 10em;
    }

    .details {
        width: 10em;
        margin-left: .5em;
    }

    .delete {
        cursor: pointer;
        font-size: smaller;

        &:hover {
            color: red;
        }

        &.disabled {
            color: darkgray;
            pointer-events: none;
        }
    }

    .message {
        font-size: 0.9em;
        color: gray;
        margin-top: -8px;
        margin-bottom: 8px;
    }
}
</style>
