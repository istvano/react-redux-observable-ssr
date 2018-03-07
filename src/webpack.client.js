const path = require('path');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.js');

const config = {

    // root is our server index
    entry: [
        'babel-polyfill',
        './client/index.js'
    ],

    // output to build folder
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    }
};

module.exports = merge(baseConfig, config);

