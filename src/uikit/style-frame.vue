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
                    <section>
                        <h3>An unexpected error has occured</h3>
                        <span>Try reloading the page. If the problem persists, please let us know.</span>
                    </section>
                </div>
                <div class="inner" v-else-if="inner">
                    <section>
                        <slot/>
                    </section>
                </div>
                <section v-else>
                    <slot/>
                </section>
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

export default {
    props: {
        header: String,

        inner: {
            type: Boolean,
            default: false,
        },

        slim: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        ...mapGetters({
            error: 'error',
        }),

        isSlim() {
            return this.slim && !this.error;
        },
    },
};
</script>

<style lang="less" scoped>
.slim-wrapper {
    padding-top: 0;
    padding-bottom: 0;
}
</style>
