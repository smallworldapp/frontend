<template>
    <div class="login-page">
        <h2 v-if="isAdminLogin">Login as server admin</h2>
        <h2 v-else>Login to your account</h2>

        <div class="login-row">
            <span>Email:</span>
            <sw-input v-model="email" />
        </div>

        <div class="login-row">
            <span>Password:</span>
            <sw-input secure v-model="password" />
        </div>

        <div class="button-container">
            <button type="button" :disabled="loading" @click="forgot()" v-if="!isAdminLogin">Forgot Password</button>
            <button type="button" :disabled="loading" @click="submit()" class="special">Login</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        isAdminLogin: { type: Boolean, default: false },
    },

    data() {
        return {
            loading: false,

            email: { value: '', error: false },
            password: { value: '', error: false },
        };
    },

    computed: {
        ...mapGetters({
            isAuthed: 'session/exists',
        }),
    },

    created() {
        this.$store.dispatch('session/resume', {
            admin: this.isAdminLogin,
        });
    },

    watch: {
        isAuthed(isAuthed) {
            if (!isAuthed) return;

            if (this.isAdminLogin) {
                this.$router.push('/server-admin');
            } else {
                this.$router.push('/your-communities');
            }
        },
    },

    methods: {
        forgot() {
            this.$router.push('/login/password-reset');
        },

        submit() {
            if (!this.email.value) {
                return this.email.error = true;
            }

            if (!this.password.value) {
                return this.password.error = true;
            }

            this.loading = true;
            this.$store.dispatch('session/login', {
                admin: this.isAdminLogin,
                email: this.email.value,
                password: this.password.value,
            }).then(() => {
                this.loading = false;
            });
        },
    },
};
</script>

<style lang="less" scoped>
.login-page {
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
