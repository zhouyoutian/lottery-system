console.log(process.env.NODE_ENV)
module.exports = {
    devServer: {
        proxy: {
            '/api/*': {
                target: 'http://localhost:3000'
            }
        }
    },
    chainWebpack: config => {
        config.module
          .rule()
          .test(/\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/)
          .use('url-loader')
            .loader('url-loader?limit=10000&mimetype=application/font-woff')
            .end()
        config.module
          .rule()
          .test(/\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/)
          .use('file-loader')
            .loader('file-loader')
            .end()
      }
}