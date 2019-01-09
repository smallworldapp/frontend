<template>
    <div class="user">
        <div class="user-first">
            <span v-text="user.firstName" />
        </div>
        <div class="user-last">
            <span v-text="user.lastName" />
        </div>
        <div class="user-email">
            <span v-text="user.email" />
        </div>
        <div class="user-status">
            <input type="checkbox" :checked="user.status.email" class="readonly" />
        </div>
        <div class="user-status">
            <input type="checkbox" v-model="user.status.privacy" :disabled="loading" @change="save()" />
        </div>
    </div>
</template>

<script>
export default {
    props: ['world', 'user'],

    data() {
        return {
            loading: false,
        };
    },

    methods: {
        save() {
            this.loading = true;

            this.$store.dispatch('members/update', {
                worldId: this.world.id,
                id: this.user.id,
                status: this.user.status,
            }).then(() => {
                this.loading = false;
            });
        },
    },
};
</script>

<style lang="less" scoped>
div.user {
    display: flex;

    .user-first,
    .user-last {
        flex: 2;
        margin-right: 10px;
        padding: 2px 10px;
    }

    .user-email {
        flex: 3;
        padding: 2px 10px;
    }

    .user-confirmed {
        flex: 3;
        display: flex;
        padding: 2px 10px;

        >select {
            margin-right: 4px;
            height: auto;
            flex: 1;
        }
    }

    .user-status {
        flex: 1.5;
        padding: 2px 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        input {
            appearance: checkbox;
            -ms-appearance: checkbox;
            -moz-appearance: checkbox;
            -webkit-appearance: checkbox;

            float: none;
            margin: 0;
            opacity: 1;
            width: 20px;
            height: 20px;
            z-index: initial;

            &.readonly {
                pointer-events: none;
            }
        }
    }
}
</style>
