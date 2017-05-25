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
                SERVICE_URL: JSON.stringify('https://0imk9zz7p1.execute-api.us-east-1.amazonaws.com/dev'),
                API_KEY: JSON.stringify('FJVaQEu2EY9ejShXc23s4UFH8NCa9534QzoiMWC8')
            }
        }),
        new CopyWebpackPlugin([
            { from: 'build/*', to: '../dist' },
            { from: '*.html', to: '../dist' },
            { from: 'css/*', to: '../dist' }
        ])
    ]
}
