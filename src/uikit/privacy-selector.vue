<template>
    <div class="privacy-selector">
        <label class="option">
            <div class="privacy-row">
                <input type="radio" :disabled="disabled" :checked="value == 'public'" @click="set('public')" />
                <span>Open</span>
            </div>
            <span class="details">Anyone with the Invite Page link can join</span>
        </label>

        <label class="option">
            <div class="privacy-row">
                <input type="radio" :disabled="disabled" :checked="value == 'verificationRequired'" @click="set('verificationRequired')" />
                <span>Closed</span>
            </div>
            <span class="details">Anyone with the Invite Page link can join, but they must
                    be confirmed by the Community Organizer through the 'Members' tab</span>
        </label>

        <label class="option">
            <div class="privacy-row">
                <input type="radio" :disabled="disabled" :checked="value == 'inviteOnly'" @click="set('inviteOnly')" />
                <span>Invite only</span>
            </div>
            <span class="details">Members can only be added by the Community Organizer through the 'Members' tab</span>
        </label>
    </div>
</template>

<script>
export default {
    props: {
        value: String,
        disabled: { type: Boolean, required: false, default: false },
    },

    methods: {
        set(value) {
            if (this.disabled) return;

            this.$emit('input', value);
        },
    },
};
</script>

<style scoped lang="less">
.privacy-selector {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.option {
    padding: 0.2em 0.5em 0.5em 0.5em;
    margin: 0.5em 0;

    font-size: inherit;
    font-weight: normal;

    display: flex;
    flex-direction: column;

    cursor: pointer;
    border-radius: 5px;

    &:hover:not(.disabled) {
        background: #f7f7f7
    }

    &.disabled {
        cursor: default;
    }

    &.disabled.selected {
        box-shadow: 0 0 0 2px lightgray;
        background: #f7f7f7;
    }
}

.privacy-row {
    display: flex;
    align-items: center;
}

.details {
    color: gray;
    font-size: 0.9em;
    line-height: 1em;
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
</style>
