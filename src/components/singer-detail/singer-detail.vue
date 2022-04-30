<template>
    <transition name="slide">
        <div class='singer-detail'>歌手详情</div>
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
    .slide-enter-active, .slide-leave-active {
        transition: all 0.3s;
    }
    .slide-enter, .slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }
    .singer-detail {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: $color-background;
    }
</style>