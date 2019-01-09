<template>
    <div class="add-single">
        <h4>Add members one at a time:</h4>
        <div class="single-row">
            <div class="field">
                <span>First name:</span>
                <input type="text" v-model="firstName" />
            </div>
            <div class="field">
                <span>Last name:</span>
                <input type="text" v-model="lastName" />
            </div>
            <div class="field">
                <span>Email:</span>
                <input type="text" v-model="email" />
            </div>
        </div>
        <button :disabled="!canAdd" @click="submit(false)">Add directly</button>
        <button :disabled="!canAdd" @click="submit(true)">Send confirmation</button>
    </div>
</template>

<script>
import * as request from '@/util/request';

export default {
    props: {
        world: Object,
    },

    data() {
        return {
            loading: false,
            firstName: '',
            lastName: '',
            email: '',
        };
    },

    computed: {
        canAdd() {
            return !this.loading && this.firstName && this.lastName && this.email;
        },
    },

    methods: {
        submit(confirm) {
            const id = [{
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
            }];

            this.loading = true;
            request.post(`/worlds/${this.world.id}/members?confirm=${confirm}`, id).then(() => {
                this.firstName = this.lastName = this.email = '';
                this.loading = false;
            });
        },
    },
};
</script>

<style lang="less" scoped>
.add-single {
    padding: .5em;

    .single-row {
        display: flex;
        margin-bottom: .5em;
    }

    .field {
        flex: 1;
        display: flex;
        flex-direction: column;

        padding-right: .5em;

        &:last-child {
            padding-right: 0;
        }
    }
}
</style>
