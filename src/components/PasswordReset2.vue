<template>
    <div class="password-reset">
        <h2>Enter a new password for your account:</h2>

        <div class="login-row">
            <sw-input secure v-model="value1" />
        </div>

        <div class="login-row">
            <span>Confirm your password:</span>
            <sw-input secure v-model="value2" />
        </div>

        <span class="error">{{ error }}</span>

        <div class="button-container">
            <button type="button" :disabled="loading" @click="submit()">Submit</button>
        </div>
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
            value1: { error: false, value: '' },
            value2: { error: false, value: '' },

            error: '',
            loading: false,
        };
    },

    methods: {
        submit() {
            if (this.value1.value != this.value2.value) {
                this.error = 'Passwords do not match';
                return;
            }

            this.loading = true;
            request.post('/auth/resets/' + this.token, {
                password: this.value1.value,
            }).then(() => {
                this.loading = false;

                this.$router.push('/login');
            }, (err) => {
                this.loading = false;

                this.error = 'Unknown error';
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
