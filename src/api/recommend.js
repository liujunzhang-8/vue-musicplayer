import jsonp from './../common/js/jsonp';
import { commonParams, options } from './config';
// const qqMusic = require('qq-music-api');


export function getRecommend () {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    // const url = 'http://192.168.2.10:3300/recommend/banner'

    const data = Object.assign({}, commonParams,  {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })

    return jsonp(url, data, options)
}
