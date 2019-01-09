<template>
    <div class="community-list">
        <h3>Communities you manage:</h3>

        <div class="list">
            <template v-if="true">
                <router-link class="world" v-for="world in worlds" :key="world.id" :to="'/' + (world.identifier || world.id) + '/manage'">
                    <span class="name">{{ world.name }}</span>

                    <!-- <div class="row"> -->
                    <span class="privacy">{{ getPrivacy(world.privacy) }}</span>

                    <span class="members">{{ world.memberCount.confirmed }} member{{ world.memberCount.confirmed == 1 ? '' : 's' }}</span>
                    <!-- </div> -->

                    <span class="pairings" v-if="world.nextPairing">Next connection:<br>{{ pairingDate(world) }}</span>
                    <span class="pairings" v-else>No upcoming connections</span>
                </router-link>
            </template>

            <div v-else>
                Loading...
            </div>
        </div>

        <div class="world-create">
            <router-link to="/your-communities/create">
                <button class="create">connect a new community</button>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

const millisPerDay = 1000 * 60 * 60 * 24;

export default {
    computed: {
        ...mapGetters({
            worlds: 'worlds/all',
        }),
    },

    created() {
        this.$store.dispatch('worlds/fetch');
    },

    methods: {
        pairingDate(world) {
            let today = new Date();
            let date = new Date(world.nextPairing.date);
            date.setMinutes(date.getMinutes() + today.getTimezoneOffset());

            if (date.getTime() - today.getTime() <= millisPerDay) {
                return 'tomorrow';
            }

            if (date.getDay() > today.getDay() &&
                date.getTime() - today.getTime() < 7 * millisPerDay) {
                return 'on ' + date.toLocaleDateString(undefined, {
                    weekday: 'long',
                });
            }

            if (date.getTime() - today.getTime() < 365 * millisPerDay) {
                return date.toLocaleDateString(undefined, {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                });
            }

            return date.toLocaleDateString();
        },

        getPrivacy(raw) {
            switch (raw) {
                case 'inviteOnly': return 'Invite Only';
                case 'verificationRequired': return 'Closed';
                case 'public': return 'Open';
            }
        },
    },
};
</script>

<style lang="less" scoped>
.community-list {
    padding: 5em 0 4em 0;
}

.list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around; // flex-direction: column;
}

.world {
    flex: 0 0 46%;
    margin: 0 2% 2em 2%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    padding: 0.5em 1em;
    border-radius: 5px;

    cursor: pointer;

    &:hover {
        background: #f7f7f7
    }

    &:active {
        box-shadow: inset 0 0 0 2px #4598c8;
    }

    .name {
        font-weight: bold;
        font-size: 0.9em;
        margin-bottom: 0.5em;
    }

    .row {
        display: flex;
        width: 100%;
        margin-bottom: 0.5em;
    }

    .privacy {
        text-align: center;
    }

    .members {
        text-align: center;
    }

    .pairings {
        margin-top: 0.5em;
        text-align: center;
    }
}

.world-create {
    margin: 2em 0;
    display: flex;
    justify-content: center;
}
</style>
