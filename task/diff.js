
module.exports = function (gulp, plugins, config, setting) {
    return function (callback) {
        console.log('diff start');
        plugins.git.exec({args: `diff ${setting.version} ${setting.diff} --name-only`}, (error, output) => {
            if (error) {
                callback(error);
            }
            let path = [];
            let dist = new RegExp('(' + config + '\/)');
            output.split(plugins.os.EOL).map((file) => {
                if (!file.match(dist) && file != '' && plugins.fs.existsSync('./' + file)) {
                    let stats = plugins.fs.lstatSync('./' + file);
                    if (stats.isDirectory()) {
                        path.push(plugins.path.join(file, '**'));
                    } else {
                        path.push(file);
                    }
                }
            });
            setting.file = setting.sourse = setting.version;
            gulp.src(path, {base: './'})
                    .pipe(gulp.dest(plugins.path.join(config.build, setting.sourse)))
                    .on('end', function () {
                        console.log('diff start');
                        callback();
                    });
        });
    };
};