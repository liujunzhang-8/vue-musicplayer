<template>
    <div class='slide'>
        <transition>
            <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
        </transition>
    </div>
</template>

<script>
import MusicList from '../../components/music-list/music-list'
import { getSongList } from '../../api/recommend'
import { ERR_OK } from '../../api/config'
import { mapGetters } from 'vuex'
import { createSong } from '../../common/js/song'
export default {
    components: {
        MusicList
    },
    data() {
        return {
            songs: []
        };
    },
    computed: {
        title() {
            return this.disc.dissname
        },
        bgImage() {
            return this.disc.imgurl
        },
        ...mapGetters([
            'disc'
        ])
    },
    created() {
        this._getSongList()
    },
    methods: {
        _getSongList() {
            if(!this.disc.album_pic_mid) {
                this.$router.push('/recommend')
                return
            }
            getSongList(this.disc.album_pic_mid).then(res => {
                console.log(res, '获取到哈市大家ask');
                if(res.code === ERR_OK) {
                    this.songs = this._normalizeSongs(res.cdlist[0].songlist)
                }
            })
        },
        _normalizeSongs(list) {
            let ret = []
            list.forEach(musicData => {
                if(musicData.songid && musicData.albummid) {
                    ret.push(createSong(musicData))
                }
            })
            return ret
        }
    }
}
</script>
<style lang='scss' scoped>
.slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
}
.slide-enter, .slide-leave-to {
    transform: translate3d(100% 0, 0);
}
</style>
