<template>
    <div class="pair-history-downloader">
        <h4>Connection History</h4>
        <button @click="download()">Download As CSV</button>
    </div>
</template>

<script>
import * as request from '@/util/request';

export default {
    props: ['world'],

    methods: {
        download() {
            let a = request.get(`/worlds/${this.world.id}/pairs`);
            let b = request.get(`/worlds/${this.world.id}/members`);

            Promise.all([a, b]).then(([pairs, users]) => {
                let map = new Map();
                for (let i = 0; i < users.length; i++) {
                    map.set(users[i].id, users[i]);
                }

                let str = '';
                for (let i = 0; i < pairs.length; i++) {
                    let a = map.get(pairs[i].initiatorId);
                    let b = map.get(pairs[i].receiverId);
                    let date = new Date(pairs[i].date);
                    str += [
                        a.firstName,
                        a.lastName,
                        a.email,
                        b.firstName,
                        b.lastName,
                        b.email,
                        pairs[i].outcome,
                        date.toLocaleDateString(),
                    ].join(',') + '\r\n';
                }

                let blob = new Blob([str], { type: 'text/csv' });
                let link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'pairings.csv';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        },
    },
};
</script>

<style lang="less" scoped>
div.pair-history-downloader {
    >h4 {
        margin-bottom: 0.2em
    }
}
</style>
