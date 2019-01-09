<template>
    <div class="feedback">
        <p>
            Thank you for providing information on your connection and helping to make smallworld
            better!
        </p>
    </div>
</template>

<script>
import * as request from '@/util/request';

export default {
    props: {
        pairId: String,
        response: String,
    },

    created() {
        if (!this.pairId) return;
        if (!this.response) return;

        request.post(`/pairs/${this.pairId}/feedback`, {
            content: this.response,
        }).catch((e) => {
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
.feedback {
    padding: 5em 0 4em 0;
}
</style>
