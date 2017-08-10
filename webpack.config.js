/**
 * @file dev for webpack
 * @author windwithfo(windwithfo@yeah.net)
 */

import 'babel-polyfill';
import path    from 'path';
import webpack from 'webpack';
import merge   from 'webpack-merge';
import config  from './webpack.base.config.js';
import Linter  from 'stylelint-webpack-plugin';

const projectRoot = path.resolve(__dirname, './');

let webpackConfig = merge(config, {
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: [{
          loader: 'eslint-loader',
          options: {
            configFile: './.eslintrc.js'
          }
        }],
        include: projectRoot + '/src',
        exclude: /node_modules/
      }
    ]
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  // 插件项
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Linter({
      configFile: '.stylelintrc.js',
      files: 'src/**/*.less',
      ignorePath: 'src/dev/*',
      syntax: 'less'
    })
  ],
  devServer: {
    port: 3000,
    hot: true,
    proxy: {
      '/isLogin': 'http://192.168.2.20:8060',
      '/company/**': 'http://192.168.2.20:8060',
      '/apply/**': 'http://192.168.2.20:8060'
    }
  }
});

export default {
  ...webpackConfig
};
