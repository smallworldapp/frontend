<template>
    <div class="drop-target" @dragover.prevent="onDragOver" @dragleave="onDragLeave" @drop.prevent="onDrop">
        <h4>{{ over ? 'Drop' : 'Drag' }} a CSV in the following format:</h4>
        <span>Firstname,Lastname,Email</span>
    </div>
</template>

<script>
import * as CSV from '@/util/csv';

export default {
    data() {
        return {
            over: false,
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

                for (let row of rows) {
                    if (row.length < 3 || row.findIndex((a) => !a) != -1) {
                        continue;
                    }

                    list.push({
                        firstName: row[0],
                        lastName: row[1],
                        email: row[2],
                    });
                }

                this.$emit('input', list);
            });
        },
    },
};
</script>

<style lang="less" scoped>
.drop-target {
    flex: 1;
    padding: .5em;
}
</style>
