<template>
    <div class="community-page">
        <div class="nav">
            <router-link to="/your-communities" class="back-button" v-if="showBackArrow">
                <svg class="arrow" width="2em" height="1em" viewBox="0 0 200 100">
                    <path d="M 55 5 L 10 50 L 55 95 M 10 50 L 180 50" />
                </svg>
                Back
            </router-link>

            <router-link to="connections">Connections</router-link>

            <router-link to="invitation">Invite Page</router-link>

            <router-link to="members" v-if="world.accountType == 'standard'">Members</router-link>

            <router-link to="settings">Settings</router-link>
        </div>

        <div class="view-container">
            <transition :name="routeTransition">
                <router-view/>
            </transition>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as identifier from '@/router/identifier';

const order = ['connections', 'invitation', 'members', 'settings'];

export default {
    data() {
        return {
            loading: true,
            routeTransition: 'noop',
        };
    },

    computed: {
        ...identifier.state,
        ...mapGetters({
            isAdmin: 'session/isAdmin',
        }),

        showBackArrow() {
            return !this.isAdmin;
        },
    },

    created() {
        identifier.fetch(this).then(() => {
            this.loading = false;
            if (!this.world) this.$store.dispatch('404');
        });
    },

    watch: {
        '$route.path'(to, from) {
            let toPage = to.split('/');
            let fromPage = from.split('/');
            toPage = toPage[toPage.length - 1];
            fromPage = fromPage[fromPage.length - 1];

            let toIndex = order.indexOf(toPage);
            let fromIndex = order.indexOf(fromPage);

            if (toIndex < 0 || fromIndex < 0) {
                this.routeTransition = 'noop';
            } else if (toIndex < fromIndex) {
                this.routeTransition = 'slide-right';
            } else {
                this.routeTransition = 'slide-left';
            }
        },
    },
};
</script>

<style lang="less" scoped>
.view-container {
    flex: 1;
    position: relative;
}

.community-page {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.nav {
    position: relative;

    display: flex;
    justify-content: center;
    flex: 0 0 auto;

    >a {
        margin: 20px;
        padding: 5px;
        cursor: pointer;
        font-size: 1.2em;

        transition: border 100ms;
        border-bottom: 2px solid transparent;

        &:hover {
            border-bottom: 2px solid lightgray;
        }

        &.router-link-exact-active {
            border-bottom: 2px solid #7b7b7b;
        }
    }
}

.back-button {
    position: absolute;
    top: 0;
    left: 0;

    margin: 20px;
    padding: 5px;
    cursor: pointer;
    font-size: 1em;

    color: darkgray;

    transition: color 100ms, border 100ms;
    border-bottom: 2px solid transparent;

    &:hover {
        color: inherit;
        border-bottom: 2px solid lightgray;

        .arrow {
            opacity: 1;
        }
    }

    &.active {
        border-bottom: 2px solid #7b7b7b;
    }
}

.arrow {
    fill: none;
    stroke: #4E4852;
    stroke-linejoin: miter;
    stroke-width: 10px;

    opacity: 0;
    transition: opacity 100ms;
}
</style>
