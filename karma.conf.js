module.exports = (config) => {
  config.set({
    basePath: '',
    browsers: ['PhantomJS'],
    colors: true,
    files: ['src/**/*.test.ts'],
    frameworks: ['mocha', 'chai'],
    reporters: ['mocha'],
    autoWatch: true,
    singleRun: false,
    preprocessors: {
      'src/**/*.test.ts': ['webpack']
    },
    webpack: require('./webpack.config'),
    webpackMiddleware: {
      noInfo: true
    }
  })
}
