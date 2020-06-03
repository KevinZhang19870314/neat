const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const common = require('./webpack.common.js');

module.exports = merge.smart(common, {
    devtool: 'inline-source-map',
    entry: ['webpack/hot/poll?1000', path.join(__dirname, 'src/index.ts')],
    externals: [
        nodeExternals({
            whitelist: ['webpack/hot/poll?1000']
        })
    ],
    mode: 'development',
    target: 'node',
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [{
                from: 'src/login/login.html',
                to: 'login.html'
            }]
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    watch: false
});