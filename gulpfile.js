var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task("clean",function() {
    return gulp.src("./dist/*")
    .pipe(plugins.clean());
});

gulp.task("css",["clean"],function(){
    var stream = gulp.src(["public/**/*.css","!public/**/*.min.css"])
        .pipe(plugins.minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest("./dist/"));
    return stream;
});

gulp.task("js",["clean"],function(){
    var stream = gulp.src(["public/**/*.js","!public/**/*.min.js"])
        .pipe(plugins.uglify())
        .pipe(gulp.dest("./dist/"));
    return stream;
});

gulp.task("html",["clean"],function(){
    var stream = gulp.src("public/**/*.html")
        .pipe(plugins.minifyHtml())
        //.pipe(plugins.rename({suffix: ".gulp"}))
        .pipe(gulp.dest("./dist/"));
    return stream;
});

gulp.task("mv",function() {
    var stream = gulp.src("./dist/**/*")
        .pipe(gulp.dest("./public/"))
    return stream;
});

gulp.task("watch",function() {
    gulp.watch("public/*",["optimise"]);
});

gulp.task("default",["html","css","js", "mv"],function(){
    console.log("gulp task ok!");
});
gulp.task("build",["html","css","js", "mv"],function(){
    console.log("gulp task ok!");
});
