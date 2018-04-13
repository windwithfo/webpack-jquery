/**
 * @file dev for webpack
 * @author windwithfo(windwithfo@yeah.net)
 */

import 'babel-polyfill';
import path           from 'path';
import Chalk          from 'chalk';
import webpack        from 'webpack';
import merge          from 'webpack-merge';
import config         from './webpack.base.config.js';
import Extract        from 'mini-css-extract-plugin';
import Linter         from 'stylelint-webpack-plugin';
import ProgressBar    from 'progress-bar-webpack-plugin';
import FriendlyErrors from 'friendly-errors-webpack-plugin';
import BundleAnalyzer from 'webpack-bundle-analyzer/lib/BundleAnalyzerPlugin';

const projectRoot = path.resolve(__dirname, './');

const webpackConfig = merge(config, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: {
          loader: 'eslint',
          options: {
            configFile: './.eslintrc.js'
          }
        },
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
    }),
    new FriendlyErrors(),
    new ProgressBar({
      complete: Chalk.green('█'),
      incomplete: Chalk.white('█'),
      format: '  :bar ' + Chalk.green.bold(':percent') + ' :msg',
      clear: false
    }),
    new Extract({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    // new BundleAnalyzer({
    //   analyzerMode: 'static'
    // })
  ],
  devServer: {
    port: 3000,
    hot: true,
    proxy: {
      '/isLogin': 'http://192.168.2.20:8060',
      '/company/**': 'http://192.168.2.20:8060',
      '/apply/**': 'http://192.168.2.20:8060'
    },
    stats: {
      colors: true,
      chunks: false,
      modules: false,
      children: false
    }
  }
});

export default webpackConfig;
