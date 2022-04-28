import axios from 'axios'

export default function (config) {
    // 创建一个新的axios实例
    const instance = axios.create({
        baseURL: 'http://192.168.2.10:3300',
        timeout: 5000
    })

    /**
     * 请求拦截器
     */
    instance.interceptors.request.use(
        config => {
            // 请求成功时
            console.log(config)
            /**
             *  可能在这里进行的处理
             *    1. 需要检查config的配置
             *    2. 在请求过程中的动画
             *    3. 某些网络请求是必须携带一些特殊的信息 如 token
             */
            console.log(config.headers)

            return config // 需要将config作为返回值返回
        },
        err => {
            // 请求失败的时候
            console.log(err)
        }
    )

    /**
     * 响应拦截器
     *  对响应结果进行的处理
     */
    instance.interceptors.response.use(
        result => {
            // 这里会将结果进行拦截
            return result.data
            // console.log(result)
        },
        err => {

        }
    )

    // 返回请求对象 返回一个 Promise 对象
    return instance(config)
}
