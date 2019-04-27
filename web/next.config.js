const withSass = require('@zeit/next-sass')

module.exports = withSass({
  target: 'serverless',
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:6]',
  },
})
