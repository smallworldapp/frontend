<template>
    <div class="world-analysis">
        <div class="graph" v-if="count">
            <span class="label">
                {{ count.total }} total pairs
            </span>

            <div class="bar" v-if="count.total != 0">
                <template v-for="{ key, label } of groups">
                    <div :key="key" :class="'bar-' + key" :style="{ width: `${(count[key] / count.total)*100}%` }">
                        {{ (count[key] / count.total * 100).toFixed(0) }}% {{ label }}
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import * as request from '@/util/request';

export default {
    props: {
        world: Object,
    },

    data() {
        return {
            count: null,
            groups: [
                { key: 'success', label: 'Met' },
                { key: 'failure', label: 'Did not met' },
                { key: 'unknown', label: 'Unknown' },
            ],
        };
    },

    created() {
        Promise.all([
            request.get(`/worlds/${this.world.id}/members`),
            request.get(`/worlds/${this.world.id}/pairs`),
        ]).then(([members, pairs]) => {
            let count = {
                total: pairs.length,
                success: 0,
                failure: 0,
                unknown: 0,
            };

            for (let pair of pairs) {
                // let init = members.find((m) => m.id == pair.initiatorId);
                // let recv = members.find((m) => m.id == pair.receiverId);

                count[pair.outcome]++;
                // console.log(`${init.firstName} - ${recv.firstName} ${pair.outcome}`);
            }

            this.count = count;
        });
    },
};
</script>

<style scoped lang="less">
.world-analysis {
    flex: 1 1;
    padding: 10px;
}

.graph {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.bar {
    width: 90%;
    height: 50px;
    display: flex;

    margin-top: 10px;

    border-radius: 5px;
    overflow: hidden;
}

.section() {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    text-shadow: 0 0 10px white;
}

.bar-success {
    .section();
    background-color: #25d425;
}

.bar-failure {
    .section();
    background-color: #e64b4b;
}

.bar-unknown {
    .section();
    background-color: darkgray;
}
</style>
