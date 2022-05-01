<template>
    <transition name="slide">
        <music-list :title='title' :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
import MusicList from '../../components/music-list/music-list'
import { mapGetters } from 'vuex'
import {getSingerDetail} from '../../api/singer'
import {ERR_OK} from '../../api/config'
// import {createSong} from '../../common/js/song'
export default {
    components: {
        MusicList
    },
    data() {
        return {
            songs: [],
            singerInfo: {}
        };
    },
    computed: {
        title() {
            return this.singerInfo.singer_name
        },
        bgImage() {
            return this.singer.avatar
        },
        // 获取存储在store中的值
        ...mapGetters([
            'singer'
        ]) 
    },
    created() {
        this._getDetail()
    },
    methods: {
        _getDetail() {
            if(!this.singer.id) {
                this.$router.push('/singer')
                return
            }
            getSingerDetail(this.singer.id).then(res => {
                if(res.result === ERR_OK) {
                    this.songs = res.data.list
                    this.songs.forEach(item => {
                        // console.log('获取到的歌曲详情-处理前', item);
                        this.singerInfo = item

                    })
                }
            })
        },
        // _normalizeSongs(list) {
        //     let ret = []
        //     list.forEach(item => {
        //         let musicData = item
        //         if(musicData.singer_id && musicData.albumid) {
        //             ret.push(createSong(musicData))
        //         }
        //     })
        // }
    }
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
</style>