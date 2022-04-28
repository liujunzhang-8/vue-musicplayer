const express = require('express')

module.exports = {
    // baserUrl:'/',    //配置根目录
    outputDir: 'dist',   //构建输出
    assetsDir: 'assets',     //静态资源目录
    lintOnSave: false,   //是否开启eslint保存检测
    devServer: {
        open: true,      //启动项目之后不会立即运行
        host: 'localhost',   //主机名称
        // port:8080,      //端口号，默认就是8080
        https: false,
        hotOnly: false,      //热更新
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3300',
                ws: true,
                changeOrigin: true,  //可跨域
                // pathRewrite: {
                //     '^/api': ''
                // }
            }
        }
    }
}
