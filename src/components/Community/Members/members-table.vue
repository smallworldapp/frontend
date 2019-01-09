<template>
    <div class="query-results">
        <div class="users-header">
            <template v-for="{ key, label } in columns">
                <div :key="key" :class="key" @click="setSort(key)">
                    <span>{{ label }}</span>
                    <span class="sort-indicator" :class="{ flipped: order < 0 }" v-if="sort == key">
                        <svg x="0px" y="0px" width="18px" height="18px" viewBox="0 0 48 48" focusable="false" fill="#000000">
                            <path fill="none" d="M0 0h48v48H0V0z"></path>
                            <path d="M40 24l-2.82-2.82L26 32.34V8h-4v24.34L10.84 21.16 8 24l16 16 16-16z"></path>
                        </svg>
                    </span>
                </div>
            </template>
        </div>

        <member v-for="user in filtered" :world="world" :user="user" :key="user.id" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Member from './member';

export default {
    components: {
        Member,
    },

    props: ['world', 'match'],

    data() {
        return {
            sort: 'last',
            order: 1,
            users: [],
            columns: [
                { key: 'first', label: 'First Name' },
                { key: 'last', label: 'Last Name' },
                { key: 'email', label: 'Email' },
                { key: 'status-email', label: 'Email Verified' },
                { key: 'status-privacy', label: 'Confirmed' },
            ],
        };
    },

    computed: {
        ...mapGetters({
            allMembers: 'members/all',
        }),

        filtered() {
            return this.allMembers.filter(this.match).sort((a, b) => {
                if (this.sort == 'first' && a.firstName != b.firstName) {
                    return this.order * a.firstName.localeCompare(b.firstName);
                }

                if (this.sort == 'email' && a.email != b.email) {
                    return this.order * a.email.localeCompare(b.email);
                }

                if (this.sort == 'status-email' && a.status.email != b.status.email) {
                    return this.order * (a.status.email - b.status.email);
                }

                if (this.sort == 'status-privacy' && a.status.privacy != b.status.privacy) {
                    return this.order * (a.status.privacy - b.status.privacy);
                }

                if (a.lastName != b.lastName) {
                    return this.order * a.lastName.localeCompare(b.lastName);
                }

                return this.order * a.email.localeCompare(b.email);
            });
        },
    },

    created() {
        this.$store.dispatch('members/fetch', this.world);
    },

    methods: {
        setSort(key) {
            if (key == this.sort) {
                this.order = -this.order;
            } else {
                this.sort = key;
                this.order = 1;
            }
        },
    },
};
</script>

<style lang="less" scoped>
.query-results {
    flex: 1 0 auto;
}

.users-header {
    display: flex;
    font-weight: bold;
    border-bottom: 1px solid #7b7b7b;
    margin-top: 6px;
    cursor: default;

    -webkit-touch-callout: none;
    /* iOS Safari */
    -webkit-user-select: none;
    /* Chrome/Safari/Opera */
    -khtml-user-select: none;
    /* Konqueror */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
    user-select: none;
    /* Non-prefixed version, currently
                                    not supported by any browser */
    >div {
        padding: 2px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &:hover {
            background: #f7f7f7;
        }
    }

    .first {
        flex: 2;
        margin-right: 10px;
    }

    .last {
        flex: 2;
        margin-right: 10px;
    }

    .email {
        flex: 3;
    }

    .status-email {
        flex: 1.5;
    }

    .status-privacy {
        flex: 1.5;
    }

    .sort-indicator.flipped {
        transform: rotate(180deg);
    }
}
</style>
