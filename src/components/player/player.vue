<template>
    <div class='player' v-show="playlist.length > 0">
        <div class="normal-player" v-show="fullScreen">播放器</div>
        <div class="mini-player" v-show="!fullScreen">播放器</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

    components: {},
    data() {
        return {

        };
    },
    computed: {
        ...mapGetters([
            'currentIndex',
            'fullScreen',
            'playlist'
        ])
    },
}
</script>
<style lang='scss' scoped>
@import "../../common/scss/variable.scss";
@import "../../common/scss/mixin.scss";
.player {
    .normal-player {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 150;
        background: $color-background;
    }
    .mini-player {
        display: flex;
        align-items: center;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 180;
        width: 100%;
        height: 60px;
    }
}
</style>