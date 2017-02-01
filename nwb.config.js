module.exports = {
    type: 'react-app',
    webpack: {
        loaders: {
            'less-css': {
                modules: true,
                localIdentName: '[name]__[local]__[hash:base64:5]'
            }
        },
        publicPath: ''
    }
}
