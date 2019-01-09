<template>
    <div class="create-account-page">
        <div>
            <span>Name:</span>
            <input type="text" v-model="name" />
            <span>Email:</span>
            <input type="text" v-model="email" />

            <div class="type-selector">
                <label>
                    <input type="radio" value="standard" v-model="type" />
                    <span>Standard</span>
                </label>
                <label>
                    <input type="radio" value="research" v-model="type" />
                    <span>Research</span>
                </label>
                <!-- <label>
                                            <input type="radio" value="standard" v-model="type" />
                                            <span>Standard</span>
                                        </label> -->
            </div>

            <div class="buttons">
                <button @click="cancel()">Cancel</button>
                <button class="special" :disabled="!name || !email" @click="submit()">Create</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            type: 'standard',

            name: '',
            email: '',
        };
    },

    methods: {
        cancel() {
            this.$emit('created');
        },

        submit() {
            this.$store.dispatch('accounts/create', {
                type: this.type,
                name: this.name,
                email: this.email,
            }).then(() => {
                this.$emit('created');
            });
        },
    },
};
</script>

<style scoped lang="less">
div.create-account-page {
    flex: 1;
    display: flex;
    justify-content: center;

    >div {
        margin-top: 5em;
        width: 50%;
        display: flex;
        flex-direction: column;

        >input {
            margin-bottom: 1em;
        }

        >.buttons {
            display: flex;
            justify-content: space-around;
        }
    }
}

.type-selector {
    label {
        display: flex;
        align-items: center;
    }

    input {
        appearance: radio;
        -ms-appearance: radio;
        -moz-appearance: radio;
        -webkit-appearance: radio;

        float: none;
        margin: 0;
        opacity: 1;
        width: 20px;
        height: 20px;
        z-index: initial;

        margin-right: 0.3em;

        &.readonly {
            pointer-events: none;
        }
    }
}
</style>
