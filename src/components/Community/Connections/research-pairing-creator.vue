<template>
    <div class="pairing-creator">
        <span>Set Up a Connection: </span>

        <div class="error" v-if="error">
            <span>{{ error }}</span>
        </div>

        <pairing-finisher v-else-if="pairs" :world="world" :pairs="pairs" @complete="reset()" />

        <div class="drag-area" v-else @dragover.prevent="onDragOver" @dragleave="onDragLeave" @drop.prevent="onDrop">
            <span v-if="over">Drop a CSV file here</span>
            <span v-else>Drag a CSV file here</span>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import * as CSV from '@/util/csv';

import PairingFinisher from './pairing-finisher';

export default {
    components: {
        PairingFinisher,
    },

    props: {
        world: Object,
    },

    data() {
        return {
            over: false,
            loading: false,

            error: null,

            pairs: null,
        };
    },

    computed: {
        ...mapGetters({
            allMembers: 'members/all',
        }),
    },

    created() {
        this.$store.dispatch('members/fetch', this.world);
    },

    methods: {
        reset() {
            this.over = false;
            this.loading = false;
            this.error = null;
            this.pairs = null;
        },

        onDragOver(e) {
            e.dataTransfer.dropEffect = 'move';
            this.over = true;
        },

        onDragLeave(e) {
            this.over = false;
        },

        onDrop(e) {
            this.over = false;

            Promise.all([
                CSV.parse(e.dataTransfer),
                this.$store.dispatch('members/fetch', this.world),
            ]).then(([rows]) => {
                let members = [];

                for (let i = 0; i < rows.length; i++) {
                    let row = rows[i];

                    if (row.length == 2) {
                        let initiator = this.allMembers.find((m) => m.email == row[0]);
                        if (!initiator) {
                            return this.error = 'No member found with email "' + row[0] + '"';
                        }

                        let receiver = this.allMembers.find((m) => m.email == row[1]);
                        if (!receiver) {
                            return this.error = 'No member found with email "' + row[1] + '"';
                        }
                    } else if (row.length == 6) {
                        let initiator = this.allMembers.find((m) => m.email == row[2]);
                        if (!initiator) {
                            members.push({
                                firstName: row[0],
                                lastName: row[1],
                                email: row[2],
                            });
                        }

                        let receiver = this.allMembers.find((m) => m.email == row[5]);
                        if (!receiver) {
                            members.push({
                                firstName: row[3],
                                lastName: row[4],
                                email: row[5],
                            });
                        }
                    } else {
                        this.error = 'Invalid CSV format. The expected format is ' +
                            'either "email,email" or ' +
                            '"first name,last name,email,first name,last name,email"';
                        return;
                    }
                }

                if (members.length == 0) return rows;

                return this.$store.dispatch('members/create', {
                    worldId: this.world.id,
                    members: members,
                }).then(() => rows);
            }).then((rows) => {
                if (!rows) return;

                let pairs = [];

                for (let i = 0; i < rows.length; i++) {
                    let row = rows[i];

                    let initiator;
                    let receiver;
                    if (row.length == 2) {
                        initiator = this.allMembers.find((m) => m.email == row[0]);
                        receiver = this.allMembers.find((m) => m.email == row[1]);
                    } else if (row.length == 6) {
                        initiator = this.allMembers.find((m) => m.email == row[2]);
                        receiver = this.allMembers.find((m) => m.email == row[5]);
                    } else {
                        this.error = 'Invalid CSV format. The expected format is ' +
                            'either "email,email" or ' +
                            '"first name,last name,email,first name,last name,email"';
                        return;
                    }

                    if (!initiator) {
                        return this.error = 'Something has gone wrong. ' +
                            'Please reload the page and try again.';
                    }

                    if (!receiver) {
                        return this.error = 'Something has gone wrong. ' +
                            'Please reload the page and try again.';
                    }

                    pairs.push({
                        initiator: initiator.id,
                        receiver: receiver.id,
                    });
                }

                this.pairs = pairs;
            });
        },
    },
};
</script>

<style lang="less" scoped>
.pairing-creator {
    display: flex;
    flex-direction: column;
}

.drag-area {
    padding: 2em 10em;
    align-self: flex-start;
    background: #F5F5F5;
    border-radius: 5px;
    cursor: default;
}
</style>
