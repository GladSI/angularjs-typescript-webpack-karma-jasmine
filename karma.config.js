module.exports = function(config) {
  const browsers = ['PhantomJS'];

  // FIXME:
  // browsers.push('Chrome');

  config.set({
    singleRun: true,

    browsers,

    frameworks: [
      'jasmine',
      'karma-typescript',
    ],

    files: [
      './src/index.spec.js',
    ],

    // reporters: ['progress', 'karma-typescript', 'coverage'],
    reporters: ['progress', 'coverage'],

    preprocessors: {
      '**/*.ts': ['karma-typescript', 'webpack'],
      './src/index.spec.js': ['coverage', 'webpack', 'sourcemap'],
    },

    webpack: require('./webpack-test.config'),

    webpackMiddleware: {
      stats: 'errors-only',
    },

    karmaTypescriptConfig: {
      bundlerOptions: {
        transforms: [
          require('karma-typescript-es6-transform')(),
        ],
      },
    },

    coverageReporter: {
      type: 'json',
      subdir: '.',
      dir: 'build/coverage/',
      file: 'coverage.json',
    },

    plugins: [
      require('karma-jasmine'),
      require('karma-coverage'),
      require('karma-phantomjs-launcher'),
      require('karma-chrome-launcher'),
      require('karma-webpack'),
      require('karma-sourcemap-loader'),
      require('karma-typescript'),
    ],
  });
};
