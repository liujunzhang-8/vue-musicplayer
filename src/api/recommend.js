// import jsonp from './../common/js/jsonp';
// import { commonParams, options } from './config';
import { request } from '../common/js/axios'
// const qqMusic = require('qq-music-api');


export function getRecommend () {
    // 轮播图接口
    // const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    const url = '/recommend/banner'
    return request(url).then((res) => {
        return Promise.resolve(res)
    })

    // return jsonp(url, data, options)
}

export function getDiscList() {
    // const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
    // const url = '/api/getDiscList'
    const url = '/recommend/playlist/u'

    return request(url).then((res) => {
        return Promise.resolve(res)
    })
}
