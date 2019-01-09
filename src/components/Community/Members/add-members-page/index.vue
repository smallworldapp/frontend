<template>
    <div class="add-members-page">
        <batch-preview v-if="preview" :world="world" :preview="preview" @complete="preview = null" />

        <template v-else>
            <add-single :world="world" />
            <drop-target @input="preview = $event" />
        </template>
    </div>
</template>

<script>
import BatchPreview from './batch-preview';
import DropTarget from './drop-target';
import AddSingle from './add-single';

export default {
    components: {
        AddSingle,
        DropTarget,
        BatchPreview,
    },

    props: {
        world: Object,
    },

    data() {
        return {
            preview: null,
        };
    },
};
</script>

<style lang="less" scoped>
.add-members-page {
    flex: 1;
    display: flex;
    flex-direction: column;
}
</style>
