<template>
    <div class="confirm-background">
        <div class="confirm-popup">
            <span>Are you sure?</span>

            <div class="buttons">
                <button @click="$emit('responded', false)">Cancel</button>
                <button class="special" @click="$emit('responded', true)">Delete</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
div.confirm-background {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    >.confirm-popup {
        button {
            margin: 10px
        }
    }
}
</style>
