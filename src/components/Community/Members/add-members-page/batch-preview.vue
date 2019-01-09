<template>
    <div class="batch-preview">
        <table class="table">
            <tbody>
                <tr v-for="member in preview" class="member" :key="member.email">
                    <td class="firstName" v-text="member.firstName" />
                    <td class="lastName" v-text="member.lastName" />
                    <td class="email" v-text="member.email" />
                </tr>
            </tbody>
        </table>
        <button :disabled="loading" @click="submit(false)">Add directly</button>
        <button :disabled="loading" @click="submit(true)">Send confirmation</button>
    </div>
</template>

<script>
import * as request from '@/util/request';

export default {
    props: {
        world: Object,
        preview: Array,
    },

    data() {
        return {
            loading: false,
        };
    },

    methods: {
        submit(confirm) {
            let data = this.preview;

            this.loading = true;
            request.post(`/worlds/${this.world.id}/members?confirm=${confirm}`, data).then(() => {
                this.loading = false;
                this.$emit('complete');
            });
        },
    },
};
</script>

<style lang="less" scoped>
.batch-preview {
    padding: .5em;
}

.table {
    width: auto;
    color: inherit;
    margin-bottom: 1em;
}

.member {
    border: none !important;
    background: none !important;
}

.firstName,
.lastName,
.email {
    padding: 0 .75em;
}
</style>
