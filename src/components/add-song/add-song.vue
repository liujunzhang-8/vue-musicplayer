<template>
    <transition name="slide">
        <div class="add-song">
            <div class="header">
                <h1 class="title">添加歌曲到列表</h1>
                <div class="close">
                    <i class="icon-close"></i>
                </div>
            </div>
            <div class="search-box-wrapper">
                <search-box ref="searchBox" placeholder="搜索歌曲"></search-box>
            </div>
            <div class="shortcut">
                <switches></switches>
                <div class="list-wrapper">
                    <scroll ref="songList" class="list-scroll">
                        <div class="list-inner">
                            <song-list></song-list>
                        </div>
                    </scroll>
                    <scroll ref="searchList" class="list-scroll">
                        <div class="list-inner"></div>
                    </scroll>
                </div>
            </div>
            <div class="search-result"></div>
            <top-tip></top-tip>
        </div>
    </transition>
</template>

<script>
import SearchBox from '../../base/search-box/search-box';
import Switches from '../../base/switches/switches';
import Scroll from '../../base/scroll/scroll';
import SongList from '../../base/song-list/song-list';
import TopTip from '../../base/top-tip/top-tip'
export default {
    components: {
        SearchBox,
        Switches,
        Scroll,
        SongList,
        TopTip,
    },
    data() {
        return {

        };
    },
    computed: {},
}
</script>
<style lang='scss' scoped>

</style>