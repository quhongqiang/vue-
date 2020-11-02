// vue.config.js
module.exports = {
  publicPath: './',
  productionSourceMap:false,
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Provide path to the file with resources
          resources: './src/style/vars.scss',

          // Or array of paths
          // resources: ['./path/to/vars.scss', './path/to/mixins.scss']
        })
        .end()
    })
  },
  devServer: {
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        // target: 'http://192.168.11.12/',
        target: 'http://test-xxx-xxx.xxx.com',
        ws: false,
        changeOrigin: true
      }
    }
  }
}
