const path = require('path');
const merge = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');

const baseConfig = require('./webpack.base.js');

const config = {
    // nodeJS, not the browser
    target: 'node',

    // root is our server index
    entry: [
        'babel-polyfill', // allowing async tags
        './server/index.js'
    ],

    // output to build folder
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },

    externals: [webpackNodeExternals()] // used to ignore local node-modules on the server
};

module.exports = merge(baseConfig, config);
