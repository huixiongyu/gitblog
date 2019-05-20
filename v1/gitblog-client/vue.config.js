var webpack = require('webpack');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin



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
            }              
            )
          ],
          externals:{
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'axios': 'axios',
            'moment': 'moment'            
          }
        }
      }
    }    
}