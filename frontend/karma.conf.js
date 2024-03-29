// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-mocha-reporter'),
            require('karma-coverage'),
            require('@angular-devkit/build-angular/plugins/karma'),
        ],
        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
            jasmine: {
                failSpecWithNoExpectations: true,
                random: false,
            },
        },
        coverageReporter: {
            dir: require('path').join(__dirname, '/coverage/'),
            subdir: '.',
            fixWebpackSourcePaths: true,
            type: 'json-summary',
        },
        customLaunchers: {
            ChromeHeadlessDocker: {
                base: 'ChromeHeadless',
                flags: [
                    '--no-sandbox',
                    '--disable-gpu',
                    `--remote-debugging-port=${process.env.TEST_PORT}`,
                ],
                debug: true,
            },
        },
        reporters: ['mocha'],
        mochaReporter: {
            output: 'autowatch',
        },
        port: process.env.TEST_PORT,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadlessDocker'],
        singleRun: true,
        captureTimeout: 600000,
        browserNoActivityTimeout: 120000,
        browserDisconnectTolerance: 2,
    });
};
