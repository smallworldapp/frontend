<template>
    <div class="faq-item">
        <div class="preview-header" v-if="!expanded" @click="expand(true)">
            <svg class="plus" viewBox="0 0 100 100">
                <line x1="0" y1="50" x2="100" y2="50" />
                <line x1="50" y1="0" x2="50" y2="100" />
            </svg>

            <h4>{{ item.question }}</h4>
        </div>

        <div class="body" v-else>
            <div class="header">
                <svg @click="expand(false)" class="minus" viewBox="0 0 100 100">
                    <line x1="0" y1="50" x2="100" y2="50" />
                </svg>

                <input type="text" v-model="item.question" />

                <button @click="$emit('deleted')">Delete</button>
            </div>
            <textarea ref="textarea" v-model="item.answer" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: Object,
    },

    data() {
        return {
            expanded: false,
        };
    },

    updated() {
        if (this.$refs.textarea) {
            this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 'px';
        }
    },

    methods: {
        expand(value) {
            setTimeout(() => this.expanded = value, 1);
        },
    },
};
</script>

<style lang="less">
.faq-item {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;

    textarea {
        width: 100%;
        min-height: 100px;
        margin-top: 5px;
        resize: vertical;
    }
}

.plus,
.minus {
    width: 2.5em;
    height: 1.5em;
    padding: 0.3em .8em;

    stroke-width: 1em;
    stroke: #4E4852;
    cursor: pointer;
    align-self: flex-start;
}

.preview-header {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    display: flex;
    cursor: pointer;

    h4 {
        margin: 0;
    }
}

.header {
    display: flex;
    align-items: center;

    >input {
        flex: 1;
        margin-right: 10px;
    }

    >button {
        flex: 0 0 auto;
    }
}
</style>
