<template>
    <div class="notfound">
        <p>
            Uh oh! Looks like you took a wrong turn. Try returning to the
            <router-link to="/">home page</router-link>. If the problem persists, please let us know.
        </p>
    </div>
</template>

<style lang="less" scoped>
.notfound {
    padding: 5em 0 4em 0;
}

a {
    border-bottom-color: currentColor;
}
</style>
