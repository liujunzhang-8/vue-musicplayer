<template>
    <transition name="drop">
        <div class="top-tip" v-show="showFlag" @click.stop="hide">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    components: {},
    props: {
        delay: {
            type: Number,
            default: 2000
        }
    },
    data() {
        return {
            showFlag: false
        };
    },
    computed: {},
    methods: {
        show() {
            this.showFlag = true
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.hide()
            }, this.delay)
        },
        hide() {
            this.showFlag = false
        }
    }
}
</script>
<style lang='scss' scoped>
@import '../../common/scss/variable.scss';

.top-tip {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 500;
    background: $color-dialog-background;
    &.drop-enter-active, &.drop-leave-active {
        transition: all 0.3s;
    }
    &.drop-enter, &.drop-leave-to {
        transform: translate3d(0, -100%, 0);
    }
}
</style>