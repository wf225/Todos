'use strict';
const path = require('path');
const webpack = require('webpack');

const vendors = [
    'classnames',
    'react',
    'react-dom',
    'redux',
    'react-redux',    
    'redux-saga'
];

module.exports = {
    entry: {
        app: './src/index.js',
        vendor: vendors
    },
    output: {
        path: path.join(__dirname, './dist'),
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
                    // REF: https://babeljs.io/docs/usage/api/#options
                    options: {
                        presets: ['env', 'react']
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
    // externals: {
    //     'react': 'React',
    //     'react-dom': 'ReactDOM'
    // },
    plugins: [
        // new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.bundle.js",
            minChunks: Infinity
            // names: ['vendor', 'manifest']
        })
    ]
}
