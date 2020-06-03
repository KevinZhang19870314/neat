const gulp = require('gulp');
const run = require('gulp-run');
const gulpClean = require('gulp-clean');
const replace = require('gulp-replace');

function clean() {
    console.log("Start cleaning old builds.");
    return gulp.src('dist', {
            read: false,
            allowEmpty: true
        })
        .pipe(gulpClean())
}

function runWebpack() {
    console.log("Start building server with webpack.");
    let index = process.argv.indexOf('--mode');
    if (index > -1) {
        let mode = process.argv[index + 1];
        if (mode === 'production') {
            return run('npx webpack --config webpack.production.js').exec();
        } else {
            console.log("Mode is not send as gulp arguments");
            throw new Error("Mode is not send as gulp arguments");
        }
    } else {
        return run('npx webpack --config webpack.development.js').exec();
    }
}

function version() {
    let index = process.argv.indexOf('--releaseVersion');
    if (index > -1) {
        let releaseVersion = process.argv[index + 1];
        console.log("Release version is :" + releaseVersion);
        return gulp.src('package.json')
            .pipe(replace(/(\"version\"\s*:\s*\"\d+\.\d+\.\d+)(\"|\-SNAPSHOT\")/,
                '"version' + '": "' + releaseVersion + '"'))
            .pipe(gulp.dest('./', {
                overwrite: true
            }))
    } else {
        console.log("Version is not send as gulp arguments");
        throw new Error("Version is not send as gulp arguments");
    }
}

function copyPackageJson() {
    console.log("Copying package.json file to build directory.");
    gulp.src('dist/server.js.map', {
        read: false,
        allowEmpty: true
    }).pipe(gulpClean());
    return gulp.src('package.json').pipe(gulp.dest('dist/'));
}

function installingDependencies() {
    process.env.NODE_ENV = "production";
    process.chdir('dist/');
    console.log("Running npm install to fetch bundle dependencies.");
    return run('npm install').exec();
}

function packageFiles() {
    console.log("Packaging deployment file.");
    return run('npm pack').exec();
}

const build = gulp.series(runWebpack, version, copyPackageJson, installingDependencies, packageFiles);

exports.build = build;
exports.clean = clean;
exports.default = gulp.series(clean, build);