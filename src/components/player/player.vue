<template>
    <div class='player' v-show="playlist.length > 0">
        <transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
            <div class="normal-player" v-show="fullScreen">播放器</div>
        </transition>
        
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
    methods: {
        enter(el, done) {
            const {x, y, scale} = this._getPosAndScale()

            let animation = {
                0: {
                    transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
                },
                60: {
                    transform: `translate3d(0,0,0) scale(1, 1)`
                },
                100: {
                    transform: `translate3d(0,0,0) scale(1)`
                }
            }
        },
        _getPosAndScale() {
            const targetWidth = 40
            const paddingLeft = 40
            const paddingBottom = 30
            const paddingTop = 80
            const width = window.innerWidth * 0.8
            const scale = targetWidth / width
            const x = -(window.innerWidth / 2 - paddingLeft)
            const y = window.innerHeight - paddingTop - width / 2 -paddingBottom
            return {
                x,
                y,
                scale
            }

        },
    }
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