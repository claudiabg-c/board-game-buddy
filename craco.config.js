const path = require('path');

module.exports = {
  webpack: {
    resolve: {
      fallback: {
        buffer: require.resolve('buffer/'),
        timers: require.resolve('timers-browserify'),
      },
      alias: {
        buffer: path.resolve(__dirname, 'node_modules/buffer/'),
        timers: path.resolve(__dirname, 'node_modules/timers-browserify/')
      }
    }
  }
};