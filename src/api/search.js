import jsonp from "../common/js/jsonp";
import { commonParams, options } from './config'
import { request } from '../common/js/axios'

export function getHotKey() {
    const url = '/search/hot'

    // const data = Object.assign({}, commonParams, {
    //     uin: 0,
    //     needNewCode: 1,
    //     platform: 'h5'
    // })

    // return jsonp(url, data, options)
    return request(url).then(res => {
        return Promise.resolve(res)
    })
}

export function search(query, page, perpage, t) {
    // const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
    const url = `/search?key=${query}&pageNo=${page}&pageSize=${perpage}&t=0`

    // const data = Object.assign({}, commonParams, {
    //     w: query,
    //     p: page,
    //     perpage,
    //     n: perpage,
    //     catZhida: zhida ? 1 : 0,
    //     zhidaqu: 1,
    //     t: 0,
    //     flag: 1,
    //     ie: 'utf-8',
    //     sem: 1,
    //     aggr: 0,
    //     remoteplace: 'txt.mqq.all',
    //     uin: 0,
    //     needNewCode: 1,
    //     platform: 'h5'
    // })

    // const data = { page, perpage, t }

    // return jsonp(url, data, options)
    return request(url).then(res => {
        return Promise.resolve(res)
    })
}
