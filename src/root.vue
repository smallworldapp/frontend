<template>
    <div id="page-wrapper">
        <header id="header" v-pre>
            <h1>
                <a href="/">
                    <img src="https://smallworldapp.org/images/logo.png" height="25px">
                </a>
            </h1>
            <nav>
                <div class="dropdown">
                    menu &nbsp;
                    <div class="dropdown-content">
                        <li>
                            <a href="/science/">science</a>
                        </li>
                        <li>
                            <a href="/guide/">guide</a>
                        </li>
                        <li>
                            <a href="/about/">about</a>
                        </li>
                        <li>
                            <a href="/blog/">blog</a>
                        </li>
                        <li>
                            <a href="/login/">login</a>
                        </li>
                    </div>
                </div>
            </nav>
        </header>

        <article id="main">
            <header>
                <h2>{{ header }}</h2>
                <p />
            </header>
            <section class="wrapper style5" :class="{ 'slim-wrapper': isSlim }">
                <div class="inner error-alert" v-if="error">
                    <section v-if="error == 404">
                        <not-found />
                    </section>
                    <section v-else>
                        <h3>An unexpected error has occured</h3>
                        <span>Try reloading the page. If the problem persists, please let us
                            know.
                        </span>
                    </section>
                </div>
                <div class="inner-base" :class="{ 'inner': isInner }" v-else>
                    <section>
                        <transition :name="routeTransition">
                            <router-view></router-view>
                        </transition>
                    </section>
                </div>
            </section>
        </article>

        <footer id="footer" v-pre>
            <a href="/">
                <img src="https://smallworldapp.org/images/logo.png" height="25px">
            </a>

            <br>
            <br>

            <a href="/science/">science</a>&nbsp;&nbsp;&nbsp;
            <a href="/guide/">guide</a>&nbsp;&nbsp;&nbsp;
            <a href="/about/">about</a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="/blog/">blog</a>&nbsp;&nbsp;&nbsp;
            <a href="/login/">login</a>

            <br>
            <br>

            <ul class="icons">
                <li>
                    <a href="https://twitter.com/smallworldapp_" class="icon fa-twitter">
                        <span class="label">Twitter</span>
                    </a>
                </li>
                <li>
                    <a href="https://www.facebook.com/smallworldapp.org/" class="icon fa-facebook">
                        <span class="label">Facebook</span>
                    </a>
                </li>
            </ul>

            <ul class="copyright">
                <li>&copy; smallworld</li>
                <li>
                    <a href="/privacy/">Privacy</a>
                </li>
                <li>
                    <a href="/terms/">Terms</a>
                </li>
                <li>Design:
                    <a href="http://html5up.net">HTML5 UP</a>
                </li>
            </ul>
        </footer>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as identifier from '@/router/identifier';

import NotFound from './components/NotFound.vue';

/**
 * Gets the depth of a route
 * @param {object} route the route
 * @return {int} the depth
 */
function getDepth(route) {
    let min = 10;

    for (let matched of route.matched) {
        if (!('depth' in matched.meta)) {
            continue;
        }

        if (matched.meta.depth < min) {
            min = matched.meta.depth;
        }
    }

    return min;
}

export default {
    components: {
        NotFound,
    },

    data() {
        return {
            routeTransition: 'noop',
        };
    },

    computed: {
        ...identifier.state,
        ...mapGetters({
            error: 'error',
            isAdmin: 'session/isAdmin',
        }),

        isInner() {
            // return this.frameStyle.inner;
            return !this.$route.path.startsWith('/server-admin/');
        },

        isSlim() {
            if (this.error) {
                return false;
            }

            if (this.isAdmin) {
                return true;
            }

            return false;
        },

        header() {
            if (this.$route.meta.header) {
                return this.$route.meta.header;
            }

            if (!this.world) {
                return 'smallworld';
            }

            return 'smallworld + ' + this.world.name;
        },
    },

    watch: {
        '$route'(to, from) {
            let toDepth = getDepth(to);
            let fromDepth = getDepth(from);

            if (toDepth > fromDepth) {
                this.routeTransition = 'slide-left';
            } else {
                this.routeTransition = 'slide-right';
            }
            // if (from.startsWith('/login')) {
            //     this.routeTransition = 'slide-left';
            // } else if (from.startsWith('/your-communities')) {
            //     this.routeTransition = 'slide-left';
            // } else if (to.startsWith('/your-communities')) {
            //     this.routeTransition = 'slide-right';
            // } else {
            //     this.routeTransition = 'noop';
            // }
        },
    },
};
</script>

<style lang="less" scoped>
.wrapper.style5 {
    // min-height: calc(100vh - 21em);
    min-height: calc(100vh - 3em);
    overflow: hidden;

    padding-top: 1em;
    padding-bottom: 0;
}

.inner-base {
    position: relative;
}

.error-alert {
    padding: 5em 0;
}
</style>
