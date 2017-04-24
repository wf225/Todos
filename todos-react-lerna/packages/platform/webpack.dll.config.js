const webpack = require('webpack');
const path = require('path');

const vendors = [
    'react',
    'react-dom',
    'react-slot-fill'
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