<template>
    <div class="password-reset">
        <div v-if="sent">
            An email with further instructions for resetting your password has been sent
        </div>
        <template v-else>
            <h2>Enter your email</h2>

            <div class="login-row">
                <span>Email:</span>
                <sw-input v-model="email" />
            </div>

            <div class="button-container">
                <button type="button" :disabled="loading" @click="send()">Send Reset Email</button>
            </div>
        </template>
    </div>
</template>

<script>
import * as request from '@/util/request';

export default {
    data() {
        return {
            sent: false,
            loading: false,

            email: { value: '', error: false },
        };
    },

    methods: {
        send() {
            if (!this.email.value) {
                return this.email.error = true;
            }

            this.loading = true;
            request.post('/auth/resets', { email: this.email.value }).then(() => {
                this.sent = true;
                this.loading = false;
            }, (err) => {
                this.loading = false;

                this.email.error = true;
            });
        },
    },
};
</script>

<style lang="less" scoped>
.password-reset {
    padding: 5em 0 4em 0;
    display: flex;
    flex-direction: column;
}

.login-row {
    margin-bottom: 20px;
}

.button-container {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
}
</style>
