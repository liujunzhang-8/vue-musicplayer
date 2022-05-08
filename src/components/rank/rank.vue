<template>
    <div class='rank' ref="rank">
        <scroll :data="topList" class="toplist" ref="toplist">
            <ul>
                <li @click="selectItem(item)" class="item" v-for="(item,index) in topList" :key="index">
                    <div class="icon">
                        <img width="100" height="100" v-lazy="item.picUrl" />
                    </div>
                    <ul class="songlist">
                        <li class="song" v-for="(song,index) in item.songList" :key="index">
                            <span>{{index + 1}}</span>
                            <span>{{song.songname}} - {{song.singername}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="loading-container" v-show="!topList.length">
                <loading></loading>
            </div>
        </scroll>
        <<router-view></router-view>
    </div>
</template>

<script>
import Scroll from '../../base/scroll/scroll'
import Loading from '../../base/loading/loading'
import { getTopList } from '../../api/rank'
import { ERR_OK } from '../../api/config'
import { playlistMixin } from '../../common/js/mixin'
import { mapMutations } from 'vuex'
export default {
    mixins: [playlistMixin],
    components: {
        Scroll,
        Loading
    },
    data() {
        return {
            topList: []
        };
    },
    computed: {},
}
</script>
<style lang='scss' scoped>

</style>