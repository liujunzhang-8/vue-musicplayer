<template>
    <div class='player' v-show="playlist.length > 0">
        <transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
            <div class="normal-player" v-show="fullScreen">
                <div class="background">
                    <img width="100%" height="100%" :src="currentSong.image" alt="">
                </div>
            </div>
        </transition>
        
        <div class="mini-player" v-show="!fullScreen">播放器</div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import animations from 'create-keyframe-animation';
import { prefixStyle } from '../../common/js/dom'

const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')
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
            'playlist',
            'currentSong'
        ])
    },
    watch: {
        currentSong(newSong, oldSong) {
            console.log('新歌' + newSong, '旧歌' + oldSong);
        }
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
            
            animations.registerAnimation({
                name: 'move',
                animation,
                presets: {
                    duration: 400,
                    easing: 'linear'
                }
            })

            // animations.runAnimation(this.$refs.cdWrapper, 'move', done)
        },
        afterEnter() {
            animations.unregisterAnimation('move')
            // this.$refs.cdWrapper.style.animation = ''
        },
        leave(el, done) {
            // this.$refs.cdWrapper.style.transition = 'all 0.4s'
            const {x, y, scale} = this._getPosAndScale()
            // this.$refs.cdWrapper.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
            // this.$refs.cdWrapper.addEventListener('transitionend', done)
        },
        afterLeave() {
            // this.$refs.cdWrapper.style.transition = ''
            // this.$refs.cdWrapper.style[transform] = ''
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
        ...mapMutations({
            setFullScreen: 'SET_FULL_SCREEN'
        }),
        ...mapActions([
            'insertSong'
        ])
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