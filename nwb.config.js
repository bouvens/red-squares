module.exports = {
    type: 'react-app',
    babel: {
        plugins: ['jsx-control-statements']
    },
    webpack: {
        loaders: {
            babel: {
                test: /\.jsx?/
            },
            'less-css': {
                modules: true,
                localIdentName: '[name]__[local]__[hash:base64:5]'
            }
        },
        extra: {
            resolve: {
                extensions: ['', '.js', '.jsx', '.json']
            },
            node: {
                process: false
            }
        },
        publicPath: ''
    }
}
