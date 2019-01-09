<template>
    <div class="datepicker">
        <input ref="input" @focus="onFocus()" @blur="onBlur()" type="text" :value="dateString" readonly/>
        <div v-if="open" class="datepicker-popup" @mousedown="ignoreBlur = true">
            <header class="header">
                <div>
                    <svg @mousedown="skip(-1)">
                        <polyline points="10,2 2,10 10,18" />
                    </svg>
                    <svg class="close" @mousedown="select(new Date())">
                        <ellipse cx="10" cy="10" rx="8" ry="8" />
                    </svg>
                </div>

                <span>{{ monthString }} {{ year }}</span>

                <div>
                    <svg class="close" @mousedown="select(new Date(NaN))">
                        <polyline points="4,4 16,16" />
                        <polyline points="16,4 4,16" />
                    </svg>
                    <svg @mousedown="skip(1)">
                        <polyline points="10,2 18,10 10,18" />
                    </svg>
                </div>
            </header>
            <table class="table">
                <thead>
                    <tr>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                        <th>Sun</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(week, i) in weeks" :key="i">
                        <td v-for="day in week" :key="day.date.valueOf()"
                            :class="day.class"
                            @mousedown="select(day.date)">{{ day.date.getDate() }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * Compare two dates for equality with month/day/year precision
 * @param {Date} a date 1
 * @param {Date} b date 2
 * @return {boolean}
 */
function dateEquals(a, b) {
    return a.getDate() == b.getDate() &&
        a.getMonth() == b.getMonth() &&
        a.getFullYear() == b.getFullYear();
}

export default {
    props: ['value', 'minimum', 'maximum', 'disabled'],

    data() {
        return {
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            open: false,
        };
    },

    computed: {
        weeks() {
            let weeks = [];
            let date = new Date(this.year, this.month, 1);
            date.setDate(date.getDate() - date.getDay() + 1);

            let min = this.parseArg(this.minimum);
            let max = this.parseArg(this.maximum);

            do {
                let week = [];
                for (let i = 0; i < 7; i++) {
                    week.push({
                        class: {
                            disabled: (min && date <= min) || (max && date >= max),
                            inactive: date.getMonth() != this.month,
                            active: dateEquals(date, this.value),
                            today: dateEquals(date, new Date()),
                        },
                        date: new Date(date),
                    });
                    date.setDate(date.getDate() + 1);
                }
                weeks.push(week);
            } while (date.getMonth() == this.month);

            return weeks;
        },

        dateString() {
            if (isNaN(this.value)) {
                return 'mm/dd/yyyy';
            }

            let month = this.value.getMonth() + 1;
            let date = this.value.getDate();
            let year = this.value.getFullYear();
            return `${month}/${date}/${year}`;
        },

        monthString() {
            return months[this.month];
        },
    },

    methods: {
        parseArg(nullStrDate) {
            if (nullStrDate == 'string') {
                return new Date(this.min);
            }

            if (nullStrDate instanceof Date) {
                return nullStrDate;
            }

            return null;
        },

        skip(months) {
            let now = this.month + months;
            let year = this.year;
            while (now < 0) {
                now = 12 + now;
                year--;
            }
            while (now > 11) {
                now = now - 12;
                year++;
            }
            this.month = now;
            this.year = year;
        },

        onFocus() {
            if (this.open || this.disabled) return;
            let viewing = isNaN(this.value) ? new Date() : this.value;
            this.year = viewing.getFullYear();
            this.month = viewing.getMonth();
            this.open = true;
        },

        onBlur() {
            if (this.ignoreBlur && this.open) {
                this.$refs.input.focus();
                this.ignoreBlur = false;
            } else {
                this.open = false;
            }
        },

        select(date) {
            this.$emit('input', date);
            this.open = false;
        },
    },
};
</script>

<style lang="less" scoped>
.datepicker {
    position: relative;
}

.datepicker-popup {
    z-index: 1;
    -webkit-touch-callout: none;
    /* iOS Safari */
    -webkit-user-select: none;
    /* Chrome/Safari/Opera */
    -khtml-user-select: none;
    /* Konqueror */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
    user-select: none;
    /* Non-prefixed version, currently
                                    not supported by any browser */
    position: absolute;
    top: calc(100% + 0.5em);
    background: white;
    box-shadow: 0 0 25px gray;
    border-radius: 10px;

    padding: 0.7em;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.1em;

    svg {
        width: 20px;
        height: 20px;
        fill: none;
        stroke: gray;
        stroke-width: 3px;
        stroke-linecap: square;
        cursor: pointer;

        margin: 0 0.3em;

        &.blank {
            opacity: 0
        }
    }
}

.table {
    margin: 0.7em 0 0 0;
    width: 100%;

    td,
    th {
        padding: .2em .5em;
        color: black;

        &.inactive {
            color: gray;
        }

        &.today {
            outline: 1px solid lightgray;
        }

        &.active {
            background: #77d1ff;
        }

        &.disabled {
            color: lightgray;
            pointer-events: none;
        }
    }

    td {
        cursor: pointer;
    }

    tr {
        border: none;
        background: none !important;
    }

    thead {
        font-size: .9em;
        border: none;
    }

    tbody {
        text-align: center;
    }
}
</style>
