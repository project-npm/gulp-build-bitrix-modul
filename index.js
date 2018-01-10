'use strict';

module.exports = function (conf) {
    const config = {
        name: conf.name,
        build: 'build',
        dist: 'dist',
        test: 'test',
        tools: conf.tools,
        path: [
            './**',
            '!{node_modules,node_modules/**}',
            '!{build,build/**}',
            '!{dist,dist/**}',
            '!{test,test/**}',
            '!*.js',
            '!*.json'
        ]
    };
    let setting = {
        file: config.name,
        sourse: config.name
    };

    let gulp = require('gulp');
    let plugins = require('gulp-load-plugins')();
    plugins.path = require('path');
    plugins.os = require('os');
    plugins.del = require('del');
    plugins.moment = require('moment');
    plugins.getTask = function (task) {
        return require('./task/' + task)(gulp, plugins, config, setting);
    };
    plugins.log = function (task) {
        return function (callback) {
            console.log(task);
            callback();
        };
    };

    let app = {
        last_version: plugins.getTask('build_last_version'),
        release: plugins.getTask('build_item'),
        update: plugins.getTask('build_update')
    };
    return app;
}