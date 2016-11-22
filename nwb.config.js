module.exports = {
  type: 'react-app',
  webpack: {
    loaders: {
      'vendor-sass-css': {
        modules: true,
        localIdentName: '[hash:base64:5]'
      }
    }
  }
}
