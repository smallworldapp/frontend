<template>
    <div>
        <div class="header" @click="isExpanded = !isExpanded">
            <svg v-if="!isExpanded" class="plus" viewBox="0 0 100 100">
                <line x1="0" y1="50" x2="100" y2="50" />
                <line x1="50" y1="0" x2="50" y2="100" />
            </svg>
            <svg v-if="isExpanded" class="minus" viewBox="0 0 100 100">
                <line x1="0" y1="50" x2="100" y2="50" />
            </svg>

            <h4>{{ label }}</h4>
            <h4 v-if="isExpanded">:</h4>
        </div>

        <textarea v-if="isExpanded" class="textarea" ref="text" :value="value" @input="onInput" />
    </div>
</template>

<script>
export default {
    props: {
        label: String,
        value: String,
        expanded: { type: Boolean, default: false },
    },

    data() {
        return {
            isExpanded: false,
        };
    },

    mounted() {
        this.isExpanded = this.expanded;
    },

    updated() {
        if (this.$refs.text) {
            this.$refs.text.style.height = this.$refs.text.scrollHeight + 'px';
        }
    },

    methods: {
        onInput(e) {
            this.$emit('input', e.target.value);
        },
    },
};
</script>


<style lang="less" scoped>
.header {
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

.plus,
.minus {
    width: 2.5em;
    height: 1.5em;
    padding: 0.3em .8em;

    stroke-width: 1em;
    stroke: #4E4852;
}

.textarea {
    width: 100%;
    min-height: 100px;
    margin-top: 5px;
    resize: vertical;
}
</style>
