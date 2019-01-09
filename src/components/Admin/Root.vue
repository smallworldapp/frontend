<template>
    <div class="admin-page">
        <div class="nav">
            <router-link to="/server-admin/manual-pairings">Manual Pairings</router-link>

            <router-link to="/server-admin/manage">Management</router-link>

            <router-link to="/server-admin/analysis">Analysis</router-link>
        </div>

        <router-view/>
    </div>
</template>

<script>
export default {
    created() {
        // this.$store.commit('frame-style/setSlim', true);
        // this.$store.commit('frame-style/setInner', false);
        // this.$store.commit('frame-style/setHeader', 'smallworld admin console');
    },
};
</script>

<style scoped lang="less">
.admin-page {
    min-height: calc(100% - 3em);
    width: 100%;
    display: flex;
    flex-direction: column;
    background: white;

    >.nav {
        display: flex;
        justify-content: center;
        border-bottom: 1px solid black;

        >a {
            margin: 20px;
            padding: 5px;
            cursor: pointer;
            font-size: 24px;

            &.router-link-active {
                border-bottom: 2px solid black
            }
        }
    }
}
</style>
