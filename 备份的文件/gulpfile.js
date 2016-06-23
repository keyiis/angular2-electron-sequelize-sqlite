var gulp = require('gulp');
var symdest = require('gulp-symdest');
var electron = require('gulp-atom-electron');

gulp.task('default', function () {
    return gulp.src('./output/electron/build/')
        .pipe(electron({ version: '1.2.2', platform: 'win32',arch:'x64' }))
        .pipe(symdest('./output/electron/dist/installer/'));
});