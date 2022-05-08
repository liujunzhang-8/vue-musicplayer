import * as types from './mutation-type'
import { playMode } from '../common/js/config'
import { shuffle } from '../common/js/utile';
import { saveSearch } from '../common/js/cache'


function findIndex(list, song) {
    return list.findIndex((item) => {
        item.image = `https://y.qq.com/music/photo_new/T002R300x300M000${item.album_mid}.jpg?max_age=2592000`
        if (item.singer_name === '薛之谦') {
            item.url = `https://dl.stream.qqmusic.qq.com/C400001lsRQA4aX07f.m4a?guid=9234340882&vkey=456FED8977642F563D975262ADEF53D5142EE996A2CC3ACA064532FC32CA6058463CD0131247B5235EA08F0FA20C478C793C6144421CBA5D&uin=&fromtag=120002`
            item.duration = '240'
        } else {
            item.url = `http://dl.stream.qqmusic.qq.com/C400000An6OI4ScInL.m4a?guid=7296396650&vkey=9F09E9EFA152A30A8FD7611E10FDEAAB4F2DB73AF9BCB189F628C58FBB4CECD921C98B5B222370475E93EDCFC3FC0F8DD63B744375825462&uin=&fromtag=120002`
            item.duration = '180'
        }
        return item.id === song.id
    })
}

export const selectPlay = function ({commit, state}, {list, index}) {
    commit(types.SET_SEQUENCE_LIST, list)
    if(state.mode === playMode.random) {
        let randomList = shuffle(list)
        commit(types.SET_PLAYLIST, list[index])
        index = findIndex(randomList, list[index])
    } else {
        commit(types.SET_PLAYLIST, list)
    }
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}

export  const randomPlay = function ({commit}, {list}) {
    commit(types.SET_PLAY_MODE, playMode.random)
    commit(types.SET_SEQUENCE_LIST, list)
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)


}

export const insertSong = function ({commit, state}, song) {
    let playlist = state.playlist.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    // 记录当前歌曲
    let currentSong = playlist[currentIndex]
    // 查找当前列表中是否有待插入的歌曲并返回其索引
    let fpIndex = findIndex(playlist, song)
    // 因为是插入歌曲，所以索引+1
    currentIndex++;
    // 插入这首歌到当前索引位置
    playlist.splice(currentIndex, 0, song)
    // 如果已经包含了这首歌
    if(fpIndex > -1) {
        // 如果当前插入的序号大于列表中的序号
        if(currentIndex > fpIndex) {
            playlist.splice(fpIndex, 1)
            currentIndex--
        } else {
            playlist.splice(fpIndex + 1, 1)
        }
    }
    let currentSIndex = findIndex(sequenceList, currentSong) + 1
    let fsIndex = findIndex(sequenceList, song)

    sequenceList.splice(currentSIndex, 0, song)
    if(fsIndex > -1) {
        if(currentIndex > fsIndex) {
            sequenceList.splice(fsIndex, 1)
        } else {
            sequenceList.splice(fsIndex + 1, 1)
        }
    }

    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_SEQUENCE_LIST, sequenceList)
    commit(types.SET_CURRENT_INDEX, currentIndex)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function ({commit}, query) {
    commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}
