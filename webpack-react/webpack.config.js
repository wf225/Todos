'use strict';

module.exports = {
    context: __dirname,
    entry: './src/hello.tsx',
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",        
    },
    module: {
        rules: [
            // { test: /\.tsx?$/, loader: 'ts-loader', options: { transpileOnly: true } }

            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    resolve: {
        extensions: [ '.ts', '.tsx' ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
};
