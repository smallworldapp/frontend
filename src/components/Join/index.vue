<template>
    <div class="join-page">
        <h3>Join smallworld</h3>
        <template v-if="world && world.privacy != 'inviteOnly'">
            <div class="row uniform">
                <div class="join-form">
                    <div class="field">
                        <b>First Name</b>
                        <sw-input v-model="first" />
                    </div>
                    <div class="field">
                        <b>Last Name</b>
                        <sw-input v-model="last" />
                    </div>
                    <div class="field">
                        <b>Email</b>
                        <sw-input v-model="email" />
                    </div>
                    <button class="special" :disabled="loading" @click="submitJoin()">Join</button>
                </div>

                <div class="12u$">
                    <b>
                        By clicking 'Join' you are agreeing to smallworld's
                        <a href="../terms">Terms and Conditions</a> and
                        <a href="../privacy">Privacy Policy</a>. You will receive a confirmation email shortly
                        after you join smallworld.
                    </b>
                </div>
            </div>
            <hr />
        </template>
        <div class="row univorm" v-else>
            <p>
                This smallworld community is invite-only. Please contact the organizer directly to
                join
            </p>
        </div>
        <br />
        <p class="video-row">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/4gocRd2rxdY"
                frameborder="0" allowfullscreen />
        </p>
        <description v-if="world" :world="world" />
        <hr />
        <br />
        <h3>Leave smallworld</h3>
        You may leave smallworld by entering your email address below and confirming through
        email. You can rejoin at anytime.
        <br /><br />
        <div class="row uniform">
            <div class="4u$ 12u$(xsmall)">
                <b>Email</b>
                <sw-input v-model="leaveEmail" />
            </div>
            <div class="12u$">
                <ul class="actions">
                    <li>
                        <button class="special" :disabled="loading" @click="submitLeave()">Leave</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import * as identifier from '@/router/identifier';

import * as request from '@/util/request';

import Description from './description';

export default {
    components: {
        Description,
    },

    props: {
        identifier: String,
    },

    data() {
        return {
            first: { value: '', error: false },
            last: { value: '', error: false },
            email: { value: '', error: false },
            leaveEmail: { value: '', error: false },
            loading: false,
        };
    },

    computed: {
        ...identifier.state,
    },

    created() {
        identifier.fetch(this).then((w) => {
            if (!w) this.$store.dispatch('404');
        });
    },

    methods: {
        submitJoin() {
            let error = false;
            if (!this.first.value) {
                error = this.first.error = true;
            }
            if (!this.last.value) {
                error = this.last.error = true;
            }
            if (!this.email.value) {
                error = this.email.error = true;
            }

            if (error) return;

            this.loading = true;

            request.post(`/worlds/${this.world.id}/members`, [{
                firstName: this.first.value,
                lastName: this.last.value,
                email: this.email.value,
            }]).then((data) => window.location.href = '/thankyou/',
                (err) => this.loading = false);
        },

        submitLeave() {
            if (!this.leaveEmail.value) {
                return this.leaveEmail.error = true;
            }

            this.loading = true;
            let resource = `/worlds/${this.world.id}/members?email=${this.leaveEmail.value}`;

            request.request('DELETE', resource)
                .then((data) => window.location.href = '/thankyou/leave.html',
                (data) => this.loading = false);
        },
    },
};
</script>

<style lang="less" scoped>
.join-page {
    padding: 5em 0 4em 0;
}

div.join-form {
    display: flex;
    width: 100%;
    align-items: flex-end;

    >.field {
        flex: 1;
        padding-right: 1.5em;
    }

    >button {
        height: (2.75em * 1.25);
    }
}

p.video-row {
    text-align: center;

    >iframe {
        max-width: 560px;
        width: 100%;
        height: 315px;
    }
}

p.pretext {
    white-space: pre-line;
}
</style>
