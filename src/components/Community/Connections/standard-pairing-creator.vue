<template>
    <div class="pairing-creator">
        <span>Set Up a Connection: </span>

        <pairing-finisher :world="world" />
    </div>
</template>

<script>
import PairingFinisher from './pairing-finisher';

export default {
    components: {
        PairingFinisher,
    },

    props: {
        world: Object,
    },
};
</script>

<style lang="less" scoped>
.pairing-creator {
    display: flex;
    flex-direction: column;
}
</style>
