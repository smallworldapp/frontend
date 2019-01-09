<template>
    <div class="preview">
        <div class="type-selector">
            <div class="type" :class="{ selected: type == 'future' }" @click="type = 'future'">
                <span class="label">Plan a date in the future</span>
                <sw-datepicker class="input" v-model="date" :minimum="new Date()" />
            </div>

            <div class="type" :class="{ selected: type == 'now' }" @click="type = 'now'">
                <span class="label">Send out the connection now</span>
            </div>
        </div>

        <div class="pairing-row">
            <sw-input v-model="message" hint="Include an optional personalized message in the connection emails"
            />
        </div>

        <button class="submit special" :disabled="(isNaN(date) && type == 'future') || loading" @click="submit()">Submit</button>

        <table class="list" v-if="pairs">
            <tbody>
                <pairing v-for="pair in pairs" :key="pair.initiator + ':' + pair.receiver" :initiator="allMembers.find(m => m.id == pair.initiator)"
                    :receiver="allMembers.find(m => m.id == pair.receiver)" />
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Pairing from './pairing';

export default {
    components: {
        Pairing,
    },

    props: {
        pairs: { type: Array, required: false },
        world: Object,
    },

    data() {
        return {
            loading: false,

            type: 'future',
            date: new Date(NaN),
            message: { value: '', error: false },
        };
    },

    computed: {
        ...mapGetters({
            allMembers: 'members/all',
        }),
    },

    methods: {
        submit() {
            let args = {
                worldId: this.world.id,
            };

            if (this.type == 'future') {
                args.date = this.date;
            } else if (this.type == 'now') {
                args.date = new Date();
            }

            if (this.message.value) {
                args.message = this.message.value;
            }

            if (this.pairs) {
                args.pairs = this.pairs;
            }

            this.loading = true;
            this.$store.dispatch('pairings/create', args).then(() => {
                this.type = 'future';
                this.loading = false;
                this.date = new Date(NaN);
                this.message.value = '';
            }).then(() => {
                this.$emit('complete');
            });
        },
    },
};
</script>

<style lang="less" scoped>
.type-selector {
    width: 45em;
    margin: 10px 0;
    display: flex;

    .type {
        flex: 1;
        padding: 1em 0 2em 0;

        color: inherit;
        font-size: inherit;
        font-weight: normal;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        cursor: pointer;
        border-radius: 5px;

        &:first-child {
            margin-right: 1em;
        }

        .label {
            margin-bottom: 0.5em;
        }

        &:hover {
            box-shadow: 0 0 0 2px lightgray;
        }

        &:active {
            box-shadow: 0 0 0 2px gray;
        }

        &.selected {
            box-shadow: 0 0 0 2px #4598c8;
        }
    }
}

.pairing-row {
    margin: 10px 0;
    display: flex;

    .half {
        flex: 1;
        display: flex;
    }
}

.input {
    margin-right: 10px;

    &.expanded {
        width: 100%;
    }
}

.now-button {
    height: 3.4375em;
}

.submit {
    align-self: flex-start;
}

.list {
    width: auto;
    color: inherit;
    margin: 10px 0;
}
</style>
