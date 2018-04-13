/**
 * @file building for webpack
 * @author windwithfo(windwithfo@yeah.net)
 */

import ora            from 'ora';
import path           from 'path';
import webpack        from 'webpack';
import merge          from 'webpack-merge';
import cp             from 'child_process';
import config         from './webpack.base.config';
import UglifyJs       from 'uglifyjs-webpack-plugin';
import Extract        from 'mini-css-extract-plugin';
import Compress       from 'compression-webpack-plugin';
import CSSAssets      from 'optimize-css-assets-webpack-plugin';
import BundleAnalyzer from 'webpack-bundle-analyzer/lib/BundleAnalyzerPlugin';

const spinner = ora('building for production...');

spinner.start();

// deleteDir();

const webpackConfig = merge(config, {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJs({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new CSSAssets({})
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  performance: {
    hints: false
  },
  // 插件项
  plugins: [
    new Compress({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css)$'),
      threshold: 10240,
      minRatio: 0.8
    }),
    new Extract({
      filename: 'css/app.[name].css',
      chunkFilename: 'css/app.[contenthash:12].css'
    }),
    // new BundleAnalyzer({
    //   analyzerMode: 'static'
    // })
  ]
});

/* eslint-disable no-console */
function deleteDir() {
  cp.exec('rm -rf dist', function (data) {
    if (!data) {
      console.log('rm dist sucess');
    }
    else {
      console.log(data);
    }
  });
}
/* eslint-enable no-console */

webpack(webpackConfig, function (err, stats) {
  spinner.stop();
  if (err) {
    throw err;
  }
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n');
  // let cmd = 'zip -r dist.zip dist';
  // cp.exec(cmd, function (data) {
  //   if (!data) {
  //     console.log('zip sucess');
  //   }
  //   else {
  //     console.log(data);
  //   }
  // });
});
