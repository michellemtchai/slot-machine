// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
        customLaunchers: {
            ChromeHeadless: {
                base: 'Chrome',
                flags: [
                    '--no-sandbox',
                    '--disable-gpu',
                    '--headless',
                    '--remote-debugging-port=9222',
                ],
            },
        },
        basePath: '',
        frameworks: [
            'parallel',
            'jasmine',
            '@angular-devkit/build-angular',
        ],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage'),
            require('@angular-devkit/build-angular/plugins/karma'),
            require('karma-parallel'),
        ],
        parallelOptions: {
            executors: 1,
            shardStrategy: 'round-robin',
        },
        client: {
            jasmine: {
                // you can add configuration options for Jasmine here
                // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
                // for example, you can disable the random execution with `random: false`
                // or set a specific seed with `seed: 4321`
            },
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
        },
        jasmineHtmlReporter: {
            suppressAll: true, // removes the duplicated traces
        },
        coverageReporter: {
            dir: require('path').join(
                __dirname,
                './coverage/frontend'
            ),
            subdir: '.',
            reporters: [
                { type: 'html' },
                { type: 'text-summary' },
            ],
        },
        reporters: ['progress', 'kjhtml'],
        port: process.env.FRONTEND_TEST_PORT,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        singleRun: true,
        restartOnFileChange: true,
    });
};
