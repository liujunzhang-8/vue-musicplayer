// import jsonp from 'common/js/jsonp'
// import { commonParams, options } from './config'
import { request } from '../common/js/axios'

export function getSingerList() {
    const url = '/singer/list'

    const data = Object.assign({
        area: -100,
        genre: -100,
        index: -100,
        sex: -100,
        pageNo: 1
    })
    return request(url, {
        params: data
    }).then(res => {
        return Promise.resolve(res)
    })
}