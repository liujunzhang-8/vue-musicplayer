import jsonp from '../common/js/jsonp'
import { commonParams, options } from './config'
import { request } from '../common/js/axios'

export function getSingerList() {
    // const url = '/singer/list'
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

    // const data = Object.assign({
    //     area: -100,
    //     genre: -100,
    //     index: -100,
    //     sex: -100,
    //     pageNo: 1
    // })
    // return request(url, {
    //     params: data
    // }).then(res => {
    //     return Promise.resolve(res)
    // })
    const data = Object.assign({}, commonParams, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        g_tk: 1664029744
    })
    return jsonp(url, data, options)
}

export function getSingerDetail(singerId) {
    const url = `/singer/album?singermid=${singerId}`

    // const data = Object.assign({
    //     // hostUin: 0,
    //     // needNewCode: 0,
    //     // platform: 'yqq',
    //     // order: 'listen',
    //     // begin: 0,
    //     // num: 80,
    //     // songstatus: 1,
        
    // })
    // return jsonp(url, data, options)
    return request(url).then(res => {
        return Promise.resolve(res)
    })
}

// 获取音乐 getMusic
