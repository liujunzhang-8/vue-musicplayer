<template>
    <transition name="slide">
        <div class='user-center'>
            <div class="back" @click="back">
                <i class="icon-back"></i>
            </div>
            <div class="switches-wrapper">
                <switches></switches>
            </div>
        </div>
    </transition>
</template>

<script>
import Switches from '@/base/switches/switches'
export default {
    components: {
        Switches
    },
    data() {
        return {

        };
    },
    computed: {},
    methods: {
        back() {
            this.$router.back()
        }
    }
}
</script>
<style lang='scss' scoped>
@import "../../common/scss/variable.scss";

.user-center {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    background: $color-background;
    &.slide-enter-active, &.slide-leave-active {
        transition: all 0.3s;
    }
    &.slide-enter, &.slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }
    .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
        .icon-back {
            display: block;
            padding: 10px;
            font-size: $font-size-large-x;
            color: $color-theme;
        }
    }
}

</style>