const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        proxy: {
            '/api': {
                target: 'http://localhost:3000/api/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    configureWebpack: config => {
      if (process.env.NODE_ENV === 'production') {
        return {
          plugins: [
            new BundleAnalyzerPlugin({
              analyzerMode: "server",
              analyzerHost: "127.0.0.1",
              analyzerPort: 8888, 
              reportFilename: "report.html",
              defaultSizes: "parsed",
              openAnalyzer: true,
              generateStatsFile: false,
              statsFilename: "stats.json",
              statsOptions: null,
              logLevel: "info"              
            }),
            new CompressionPlugin({
              test:/\.js$|\.html$|.\css/, //匹配文件名
              threshold: 10240,//对超过10k的数据压缩
              deleteOriginalAssets: false //不删除源文件
          })
          ]
        }
      }
    }    
}
