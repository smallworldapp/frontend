<template>
    <input class="input" :class="{ error: value.error }"
        spellcheck="false"
        @input="update($event.target.value)"
        :value="value.value"
        :placeholder="hint"
        :type="secure ? 'password' : 'text'" />
</template>

<script>
export default {
    props: {
        value: Object,
        hint: String,
        secure: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        update(value) {
            this.$emit('input', { value, error: false });
        },
    },
};
</script>


<style lang="less" scoped>
.input {
    &.error {
        box-shadow: 0 0 0 2px #ff9c94;
    }
}
</style>
