'use strict';
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.join(__dirname, './build'),
        filename: 'app.bundle.js'
        // filename: '[name].[chunkhash].js'
    },
    devtool: 'source-map',
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
                NODE_ENV: JSON.stringify('dev'), // '"prod"'
                API_HOST: JSON.stringify('')
            }
        })
    ]
}
