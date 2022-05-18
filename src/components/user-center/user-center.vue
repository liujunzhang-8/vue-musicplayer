<template>
    <transition name="slide">
        <div class='user-center'>
            
        </div>
    </transition>
</template>

<script>
export default {
    components: {},
    data() {
        return {

        };
    },
    computed: {},
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
}

</style>