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
export function getMusic() {
    const url = '/api/music'
    const data = Object.assign({}, commonParams, {
        // ["004FZzwj4Z5Kie","003GQmyL0icxA4","002LI1ay437Zjy","000Z0iml0i77h5"]
        songmid: '004FZzwj4Z5Kie',
        // filename: 'C400' + songmid + '.m4a',
        guid: '5090598280',
        cookie: 'pgv_pvid = 7895946860; ts_uid=473273140; fqm_pvqid=923180ac- cc3a - 4544 - 8cad - f9d298716a4e; yq_index = 0; userAction = 1; ts_refer = link.csdn.net /; fqm_sessionid = 76c879f1 - 8d89 - 4de0 - 8b7b - 8c52c512059d; pgv_info = ssid = s4305763352; ts_last = y.qq.com / n / ryqq / player',
        platform: '20',
        loginflag: 1,
        songtype: [0],
        // needNewCode: 0,
        uin: 0,
        format: 'json'
    })

    return request(url, {
        params: data
    }).then(res => {
        console.log(res, '打印获取的是护具值');
        return Promise.resolve(res)
    })
}
