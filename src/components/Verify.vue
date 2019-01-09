<template>
    <div class="verify">
        <p v-if="type == 'join'">
            Thank you for joining smallworld! You are confirmed and will soon begin receiving
            pairings through email. Happy connecting!
        </p>

        <p v-else-if="type == 'leave'">
            You have been removed from your smallworld community. You can rejoin at any time
            with the link provided by your community administrator.
        </p>
    </div>
</template>

<script>
import * as request from '@/util/request';

export default {
    props: {
        token: String,
    },

    data() {
        return {
            type: '',
        };
    },

    created() {
        request.post(`/verifications/${this.token}`).then((data) => {
            this.type = data.type;
        }, (e) => {
            if (e.status == 404) {
                this.$store.dispatch('404');
            } else {
                this.$store.dispatch('handle', e);
            }
        });
    },
};
</script>

<style lang="less" scoped>
.verify {
    padding: 5em 0 4em 0;
}
</style>
