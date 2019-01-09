<template>
    <div class="settings-page">
        <div class="body">
            <template v-if="world.accountType == 'standard'">
                <h4 style="margin-bottom: 0">Community privacy</h4>
                <sw-privacy-selector :value="world.privacy" @input="setPrivacy" :disabled="loading" />
                <div class="spacer" />
            </template>

            <pairs-downloader :world="world" />
            <div class="spacer" />
            <backupuser-editor :world="world" />
        </div>
        <div class="danger-area">
            <button @click="confirming = true">Delete Community</button>
        </div>
        <div v-if="confirming">
            <div class="delete-popup">
                <div>
                    Are you sure you want to delete this community?
                    <div class="buttons">
                        <button @click="this.confirming = false">No, cancel</button>
                        <button @click="del()">Yes, delete </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as identifier from '@/router/identifier';

import PairsDownloader from './pairs-downloader';
import BackupuserEditor from './backupuser-editor';

export default {
    components: {
        PairsDownloader,
        BackupuserEditor,
    },

    props: {
        identifier: String,
    },

    data() {
        return {
            loading: false,
            confirming: false,
        };
    },

    computed: {
        ...identifier.state,
    },

    methods: {
        del() {
            this.$store.dispatch('worlds/delete', this.world).then(() => {
                this.$router.push('/your-communities');
            });
        },

        setPrivacy(privacy) {
            this.loading = true;

            this.$store.dispatch('worlds/update', {
                id: this.world.id,
                privacy: privacy,
            }).then(() => {
                this.loading = false;
            });
        },
    },
};
</script>

<style lang="less" scoped>
div.settings-page {
    position: relative;
    flex: 1 0 auto;

    display: flex;
    flex-direction: column;

    >.body {
        flex: 1 0 auto;
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;

        >div {
            flex: 0 0 auto;

            &.spacer {
                flex: 0 1 50px;
            }
        }
    }

    >.danger-area {
        margin-top: 2em;
        padding: 1em;
        background: rgba(255, 0, 0, 0.19);
        display: flex;
        justify-content: center;
    }

    >.delete-popup {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(128, 128, 128, 0.65);
        display: flex;
        align-items: center;
        justify-content: center;

        >div {
            display: flex;
            flex-direction: column;
            background: white;
            padding: 20px;
            margin-bottom: 25%;
            border: 1px solid gray;

            >.buttons {
                display: flex;
                justify-content: space-around;
                margin-top: 30px;
            }
        }
    }
}
</style>
