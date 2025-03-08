module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage'),
        require('@angular-devkit/build-angular/plugins/karma')
      ],
      client: {
        jasmine: {},
        clearContext: false // laisse le résultat du test visible dans le navigateur
      },
      jasmineHtmlReporter: {
        suppressAll: true // supprime les traces dans le rapport HTML
      },
      coverageReporter: {
        dir: require('path').join(__dirname, './coverage'),
        subdir: '.',
        reporters: [{ type: 'html' }, { type: 'text-summary' }]
      },
      reporters: ['progress', 'kjhtml'],
      browsers: ['Chrome'],
      restartOnFileChange: true
    });
  };