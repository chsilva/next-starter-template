const path = require('path')

module.exports = {
  pageExtensions: ['jsx'],
  webpack(config) {
    config.resolve.modules = [path.resolve(__dirname), 'node_modules']
    return config
  },
}
