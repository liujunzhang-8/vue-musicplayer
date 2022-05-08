// state 定义，存储基础数据
import { playMode } from '../common/js/config'
import { loadSearch, loadPlay, loadFavorite } from '../common/js/cache'

const state = {
    singer: {},
    // 播放器相关
    playing: false,
    // 控制播放器显示隐藏
    fullScreen: false,
    playlist: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1,
    disc: {},
    topList: {},
    searchHistory: loadSearch(),
    playHistory: loadPlay(),
    favoriteList: loadFavorite()
}

export default state
