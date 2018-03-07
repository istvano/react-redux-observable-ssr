module.exports = {
    // define loaders for webpack
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader?cacheDirectory',
            exclude: /node_modules/,
            options: {
                presets: [
                    'react',
                    'stage-0', ['env', {
                        targets: {
                            browsers: ['last 2 versions']
                        }
                    }]
                ]
            }
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
