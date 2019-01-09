<template>
    <div class="backup-user-editor">
        <h4>Backup User: </h4>
        <p>Used as an additional member in case of an odd number of members. If left blank, the unpaired member will not receive a pairing.</p>
        <div class="backup-user-row">
            <div>
                <b>First Name</b>
                <sw-input v-model="first" />
            </div>
            <div>
                <b>Last Name</b>
                <sw-input v-model="last" />
            </div>
            <div>
                <b>Email</b>
                <sw-input v-model="email" />
            </div>
        </div>
        <button :disabled="!changes" @click="save()">Save</button>
    </div>
</template>

<script>
export default {
    props: ['world'],

    data() {
        if (this.world.backupUser) {
            return {
                first: { value: this.world.backupUser.firstName, error: false },
                last: { value: this.world.backupUser.lastName, error: false },
                email: { value: this.world.backupUser.email, error: false },
            };
        } else {
            return {
                first: { value: '', error: false },
                last: { value: '', error: false },
                email: { value: '', error: false },
            };
        }
    },

    computed: {
        changes() {
            let v = this.first.value && this.last.value && this.email.value;
            if (!this.world.backupUser) return v;

            if (this.world.backupUser) {
                return (v || (!this.first.value && !this.last.value && !this.email.value)) &&
                    (this.first.value != this.world.backupUser.firstName ||
                        this.last.value != this.world.backupUser.lastName ||
                        this.email.value != this.world.backupUser.email);
            }
        },
    },

    methods: {
        save() {
            let error = 0;
            if (!this.first.value) error++;
            if (!this.last.value) error++;
            if (!this.email.value) error++;

            if (error == 0) {
                this.$store.dispatch('worlds/update', {
                    id: this.world.id,
                    backupUser: {
                        firstName: this.first.value,
                        lastName: this.last.value,
                        email: this.email.value,
                    },
                });
            } else {
                this.$store.dispatch('worlds/update', {
                    id: this.world.id,
                    backupUser: {},
                });
            }
        },
    },
};
</script>

<style lang="less" scoped>
div.backup-user-editor {
    h4,
    p {
        margin: 0;
    }

    >.backup-user-row {
        display: flex;
        margin: 10px 0;

        >div {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin-right: 10px;
        }
    }
}
</style>
