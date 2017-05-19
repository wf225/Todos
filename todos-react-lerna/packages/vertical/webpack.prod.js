'use strict';
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.join(__dirname, './build'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react']
                    }
                }
            },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require("./build/vendor.manifest.json"),
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                API_HOST: JSON.stringify('https://kh2yo8xg01.execute-api.us-east-1.amazonaws.com/dev')
            }
        }),
        new CopyWebpackPlugin([
            { from: 'build/*', to: '../dist' },
            { from: '*.html', to: '../dist' },
            { from: 'css/*', to: '../dist' }
        ])
    ]
}
