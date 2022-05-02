// state 定义，存储基础数据
import { playMode } from '../common/js/config'

const state = {
    singer: {},
    // 播放器相关
    playing: false,
    // 控制播放器显示隐藏
    fullScreen: false,
    playlist: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1
}

export default state