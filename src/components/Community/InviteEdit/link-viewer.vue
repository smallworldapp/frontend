<template>
    <div class="link-viewer">
        <span>Members can join with this link: </span>
        <div class="link">
            <input type="text" ref="link" :value="link" readonly/>
            <div class="copy-button" @click="copyLink()">
                <svg height="16" version="1.1" viewBox="0 0 14 16" width="14">
                    <path d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9
                             1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2
                             2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1
                            .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"></path>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['world'],

    computed: {
        link() {
            return `https://${window.location.host}/${this.world.identifier || this.world.id}`;
        },
    },

    methods: {
        copyLink() {
            this.$refs.link.select();
            document.execCommand('copy');
        },
    },
};
</script>

<style lang="less" scoped>
.link {
    display: flex;
    border: 1px solid lightgray;
    margin: 10px 0px;
    box-shadow: 0 0 10px lightgray;

    >input {
        border-radius: 0;
    }

    >.copy-button {
        padding: 0px 10px 0 12px;
        display: flex;
        align-items: center;
        background: lightgray;

        &:hover {
            background: #dedede;
        }
    }
}
</style>
