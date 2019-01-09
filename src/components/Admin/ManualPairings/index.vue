<template>
    <div class="manual-pairing-page">
        <div v-if="list" class="confirm">
            <table class="list">
                <tbody>
                    <pairing v-for="pairing in list" :key="pairing.initiator.email + ':' + pairing.receiver.email" :pairing="pairing" />
                </tbody>
            </table>
            <div class="buttons">
                <button @click="cancel()">Cancel</button>
                <button class="special" @click="submit()">Submit</button>
            </div>
        </div>
        <div v-else class="drop-area" @dragover.prevent="onDragOver($event)" @dragleave="onDragLeave($event)" @drop.prevent="onDrop($event)">
            {{ over ? 'Drop CSV here' : 'Drag CSV here' }}
        </div>
    </div>
</template>

<script>
import * as CSV from '@/util/csv';
import * as request from '@/util/request';

import Pairing from './pairing';

export default {
    components: {
        Pairing,
    },

    data() {
        return {
            over: false,
            list: null,
        };
    },

    methods: {
        onDragOver(e) {
            e.dataTransfer.dropEffect = 'move';
            this.over = true;
        },

        onDragLeave(e) {
            this.over = false;
        },

        onDrop(e) {
            this.over = false;

            CSV.parse(e.dataTransfer).then((rows) => {
                let list = [];

                for (let i = 0; i < rows.length; i++) {
                    let row = rows[i];
                    let valid = true;
                    for (let j = 0; j < 6; j++) {
                        if (row[j]) continue;
                        valid = false;
                        break;
                    }
                    if (!valid) continue;

                    list.push({
                        initiator: {
                            firstName: row[0],
                            lastName: row[1],
                            email: row[2],
                        },
                        receiver: {
                            firstName: row[3],
                            lastName: row[4],
                            email: row[5],
                        },
                        subject: row[6],
                    });
                }

                this.list = list;
            });
        },

        cancel() {
            this.list = null;
        },

        submit() {
            request.post('/manualpairings', this.list);
            this.list = null;
        },
    },
};
</script>

<style scoped lang="less">
div.manual-pairing-page {
    flex: 1 0 auto;
    display: flex;

    >.drop-area {
        flex: 1;
        padding: 10px;
    }

    >.confirm {
        flex: 1;
        padding: 10px;

        >.list {
            width: auto;
            color: inherit;
            margin-bottom: 10px;
        }

        >.buttons {
            display: flex;

            >button {
                margin-right: 10px;
            }
        }
    }
}
</style>
