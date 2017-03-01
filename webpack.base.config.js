/**
 * @file base for webpack
 * @author windwithfo(windwithfo@yeah.net)
 */

import path    from 'path';
import webpack from 'webpack';
import entry   from './src/entry';
import Html    from 'html-webpack-plugin';
import Extract from 'extract-text-webpack-plugin';

const projectRoot = path.resolve(__dirname, './');

let plugins = [];
let entries = Object.assign({}, entry.pages, entry.vendors);
let extractLESS = new Extract({
    filename: '[name].[contenthash].css',
    disable: false,
    allChunks: true
});

getHtml();

plugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: ['bootstrap', 'jquery', 'template', 'manifest']
}));

plugins.push(extractLESS);

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
    module: {
        rules: [
            {
                test: /\.less$/,
                loader: extractLESS.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader!postcss-loader!less-loader'
                }),
                include: projectRoot + '/src/',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-withimg-loader'
                }]
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }],
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
