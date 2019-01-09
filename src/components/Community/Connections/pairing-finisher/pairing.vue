<template>
    <tr class="pairing">
        <td class="user">
            <div class="names">
                {{ initiator.firstName }} {{ initiator.lastName }}
            </div>
            <div class="email">{{ initiator.email }}</div>
        </td>
        <td class="user">
            <div class="names">
                {{ receiver.firstName }} {{ receiver.lastName }}
            </div>
            <div class="email">{{ receiver.email }}</div>
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        initiator: Object,
        receiver: Object,
    },
};
</script>

<style scoped lang="less">
.pairing {
    border: none !important;
    background: none !important;

    >.user {
        padding: 0 1em 1em 0;
        line-height: initial;

        >.email {
            font-size: .8em;
        }
    }

    >.subject {
        padding: 0;
    }

    &:last-child {
        border-width: 1px 1px 1px 0;
    }
}
</style>
