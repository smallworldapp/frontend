<template>
    <div class="invite-edit-page">
        <span>Unique world name:</span>
        <sw-input v-model="identifier" />

        <link-viewer :world="world" />

        <div class="buttons">
            <button @click="save()" :disabled="!changes">Save Changes</button>
        </div>

        <div class="loading" v-if="!description">
            Loading...
        </div>
        <template v-else>
            <invite-field label="Introduction" v-model="intro" expanded/>
            <invite-field label="Goals" v-model="goals" />

            <div>
                <h4>FAQ: </h4>
            </div>

            <faq-item class="faq" v-for="(item, index) in faq" :item="item" @deleted="deleteQuestion(item)" :key="index" />

            <div class="buttons">
                <button @click="addQuestion()">Add Question</button>
            </div>
        </template>
    </div>
</template>

<script>
import * as identifier from '@/router/identifier';

import * as request from '@/util/request';

import FaqItem from './faq-item';
import LinkViewer from './link-viewer';
import InviteField from './invite-field';

/**
 * Clone an FAQ question
 * @param {*} faq
 * @return {*}
 */
function clone(faq) {
    return {
        question: faq.question,
        answer: faq.answer,
    };
}

export default {
    components: {
        FaqItem,
        LinkViewer,
        InviteField,
    },

    data() {
        return {
            description: null,
            identifier: null,
            intro: '',
            goals: '',
            faq: [],
        };
    },

    computed: {
        ...identifier.state,

        changes() {
            if (!this.description) return false;

            if (this.identifier.value != this.world.identifier) {
                return true;
            }

            if (this.goals != this.description.goals) {
                return true;
            }

            if (this.intro != this.description.introduction) {
                return true;
            }

            if (this.faq.length != this.description.faq.length) {
                return true;
            }

            for (let i = 0; i < this.faq.length; i++) {
                if (this.faq[i].answer != this.description.faq[i].answer) {
                    return true;
                }
                if (this.faq[i].question != this.description.faq[i].question) {
                    return true;
                }
            }
        },
    },

    created() {
        request.get(`/worlds/${this.world.id}/description`).then(this.reset);
    },

    methods: {
        reset(d) {
            this.intro = d.introduction;
            this.goals = d.goals;
            this.faq = d.faq.map((item) => clone(item));
            this.description = d;
            this.identifier = { error: false, value: this.world.identifier };
        },

        async save() {
            let args = {
                faq: this.faq,
            };

            if (this.intro != this.description.introduction) {
                args.introduction = this.intro;
            }

            if (this.goals != this.description.goals) {
                args.goals = this.goals;
            }

            if (this.identifier.value != this.world.identifier) {
                await identifier.update(this, this.world, this.identifier.value);
            }

            let updated = await request.patch(`/worlds/${this.world.id}/description`, args);
            this.reset(updated);
        },

        addQuestion() {
            this.faq.push({
                question: 'Sample question?',
                answer: 'Sample answer',
            });
        },

        deleteQuestion(que) {
            let index = this.faq.indexOf(que);
            this.faq.splice(index, 1);
        },
    },
};
</script>

<style lang="less" scoped>
div.invite-edit-page {
    flex: 1 0 auto;

    h4 {
        margin: 0;
    }

    >div,
    >.faq {
        margin: 10px 0;
    }

    >.buttons {
        >button {
            margin-right: 10px;
        }
    }
}
</style>
