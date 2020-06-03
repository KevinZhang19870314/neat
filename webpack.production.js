const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'source-map',
    entry: [path.join(__dirname, 'src/index.ts')],
    externals: [nodeExternals({})],
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [{
                from: 'src/login/login.html',
                to: 'login.html'
            }]
        }),
    ]
});