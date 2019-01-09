<template>
    <section>
        <template v-if="world.description.introduction">
            <p>{{ world.description.introduction }}</p>
        </template>

        <template v-if="world.description.goals">
            <h3>Goals</h3>
            <p>{{ world.description.goals }}</p>
        </template>

        <template v-if="world.description.faq.length > 0">
            <h3>FAQ</h3>

            <p v-for="(item, i) in world.description.faq" :key="i">
                <b>Q: {{ item.question }}</b>
                <br/> A: {{ item.answer }}
            </p>
        </template>
    </section>
</template>

<script>
export default {
    props: {
        world: Object,
    },
};
</script>
