/**
 * @file base for webpack
 * @author windwithfo(windwithfo@yeah.net)
 */

import path    from 'path';
import webpack from 'webpack';
import entry   from './src/entry';
import Html    from 'html-webpack-plugin';
import Extract from 'mini-css-extract-plugin';

const projectRoot = path.resolve(__dirname, './');

let plugins = [];
let entries = Object.assign({}, entry.pages, entry.vendors);

getHtml();

plugins.push(new webpack.ProvidePlugin({
  '$': 'jquery',
  'jQuery': 'jquery',
  'window.jQuery': 'jquery'
}));

plugins.push(new webpack.LoaderOptionsPlugin({
  options: {
    postcss: () => {
      return [
        require('autoprefixer')
      ];
    }
  }
}));

export default {
  // 页面入口文件配置
  entry: entries,
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendor1: {
          name: 'vue',
          test: /node_modules\/vue/,
          priority: 10,
          enforce: true
        },
        vendor2: {
          name: 'mint',
          test: /node_modules\/mint-ui/,
          priority: 10,
          enforce: true
        },
        style: {
          name: 'style',
          test: /\.css/,
          chunks: 'all',
          minChunks: 1,
          enforce: true
        }
      }
    }
  },
  // 入口文件输出配置
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  // 其它解决方案配置
  resolve: {
    modules: [
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, './node_modules'),
      'node_modules'
    ],
    alias: {
      jquery: 'dev/jquery/jquery',
      bootstrap: 'dev/bootstrap/js/bootstrap',
      datepicker: 'dev/bootstrap/js/datepicker',
      template: 'dev/template/template',
      comjs: 'assets/js',
      comcss: 'assets/css'
    },
    extensions: ['.js', '.json', '.less', '.css']
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [Extract.loader, 'css', 'postcss', 'less'],
        include: projectRoot + '/src/',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-withimg'
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel',
          options: {
            presets: ['es2015']
          }
        },
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'img/[name].[hash:7].[ext]'
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]'
          }
        }]
      }
    ]
  },
  // 插件项
  plugins: plugins
};

/* eslint-disable no-loop-func */
function getHtml() {
  let pathname = './src/pages/';
  for (let page in entry.pages) {
    if (entry.pages.hasOwnProperty(page)) {
      plugins.push(new Html({
        filename: page + '.html',
        template: pathname + page + '/' + page + '.html',
        inject: true,
        excludeChunks: Object.keys(entry.pages).filter(function (item) {
          return (item !== page);
        }),
        minify: {
          removeComments: true,
          collapseWhitespace: true
        },
        chunksSortMode: 'dependency'
      }));
    }
  }
}
/* eslint-enable no-loop-func */
