
var webpackConfig = require('../../build/webpack.test.conf')

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    files: ['./index.js'],
    frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    reporters: ['spec', 'coverage'],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  })
}
