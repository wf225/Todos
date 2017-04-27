const webpack = require('webpack');
const path = require('path');

const vendors = [
    'classnames',
    'react',
    'react-dom',
    'redux',
    'react-redux',    
    'redux-saga',
    'react-slot-fill',
    'todos-platform',
    'redux-thunk',
    'isomorphic-fetch'
];

module.exports = {
    entry: {
        vendor: vendors
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].bundle.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: './dist/[name].manifest.json',
            name: '[name]_library',
        })
    ]
};