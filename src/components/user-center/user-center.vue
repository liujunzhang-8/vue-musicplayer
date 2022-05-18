<template>
    <transition name="slide">
        <div class='user-center'>
            <div class="back" @click="back">
                <i class="icon-back"></i>
            </div>
            <div class="switches-wrapper">
                <switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></switches>
            </div>
            <div ref="playBtn" class="play-btn" @click="random">
                <i class="icon-play"></i>
                <span class="text">随机播放全部</span>
            </div>
            <div class="list-wrapper" ref="listWrapper">
                <scroll>
                    <div>
                        <song-list></song-list>
                    </div>
                </scroll>
                <scroll></scroll>
            </div>
        </div>
    </transition>
</template>

<script>
import Switches from '@/base/switches/switches'
import Scroll from '@/base/scroll/scroll'
import SongList from '@/base/song-list/song-list'
import Song from '@/common/js/song'
import { mapGetters, mapActions } from 'vuex';
import { playlistMixin } from '@/common/js/mixin'
export default {
    mixins: [playlistMixin],
    components: {
        Switches,
        Scroll,
        SongList
    },
    data() {
        return {
            currentIndex: 0,
            switches: [
                {
                    name: '我喜欢的'
                },
                {
                    name: '最近听的'
                }
            ]
        };
    },
    computed: {
        ...mapGetters([
            'favoriteList',
            'playHistory'
        ])
    },
    methods: {
        handlePlaylist(playlist) {
            const bottom = playlist.length > 0 ? '60px' : ''
            this.$refs.listWrapper.style.bottom = bottom
            this.$refs.favoriteList && this.$refs.favoriteList.refresh()
            this.$refs.playList && this.$refs.playList.refresh()
        },
        back() {
            this.$router.back()
        },
        switchItem(index) {
            this.currentIndex = index
        },
        random() {
            let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
            if(list.length === 0) {
                return
            }
            list = list.map(song => {
                return new Song(song)
            })
            this.randomPlay({
                list
            })
        },
        ...mapActions([
            'randomPlay'
        ])
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
    .switches-wrapper {
        margin: 20px 0 30px 0;
    }
    .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-text-l;
        color: $color-text-l;
        border-radius: 100px;
        font-size: 0;
        .icon-play {
            display: inline-block;
            vertical-align: middle;
            margin-right: 6px;
            font-size: $font-size-medium-x;
        }
        .text {
            display: inline-block;
            vertical-align: middle;
            font-size: $font-size-small;
        }
    }
    .list-wrapper {
        position: absolute;
        top: 110px;
        bottom: 0;
        width: 100%;
    }
}

</style>