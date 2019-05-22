

externals:{
  'vue': 'Vue',
  'vue-router': 'Router',
  'iview': 'iView',
  'iview-editor': 'iEditor',
  'axios': 'axios',
  'moment': 'moment'            
}


//before optimize

var webpack = require('webpack');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
            })
          ]
        }
      }
    }    
}


// after optimize
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const cdn = {
  css: ['https://unpkg.com/iview/dist/styles/iview.css', 'https://unpkg.com/iview-editor/dist/iview-editor.css'],
  js: [
    'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
    'https://cdn.bootcss.com/vue-router/3.0.6/vue-router.min.js',
    'https://unpkg.com/iview/dist/iview.min.js',
    'https://unpkg.com/iview-editor/dist/iview-editor.js',
    'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
    'https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js'
  ]
}

module.exports = {
    // 基本路径
    baseUrl: './',
    // 输出文件目录
    outputDir: 'dist',
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    // assetsDir: "./",
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
    indexPath: './',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,  
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
    chainWebpack: config => {
      if (isProduction){
        config.plugins.delete('preload');
        config.plugins.delete('prefetch');
        // 压缩代码
        config.optimization.minimize(true);
        // 分割代码
        config.optimization.splitChunks({
            chunks: 'all'
        });
        config.plugin('html')
              .tap(args => {
                args[0].cdn = cdn;
                return args;
        });        
      }
    },
    configureWebpack: config => {
      if (isProduction) {
        config.plugins = [
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
          new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false,
                    drop_debugger: true,
                    drop_console: true,
                },
            },
            sourceMap: false,
            parallel: true,
          })
        ];
        config.externals = {
          'vue': 'Vue',
          'vue-router': 'Router',
          'iview': 'iView',
          'iview-editor': 'iEditor',
          'axios': 'axios',
          'moment': 'moment'            
        }; 
      }
    }
}    