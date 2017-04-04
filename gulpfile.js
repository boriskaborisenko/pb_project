//plug-ins
var gulp = require('gulp'),


minifyHTML = require('gulp-minify-html'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
minifycss = require('gulp-minify-css'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
pngquant = require('imagemin-pngquant'),
imageminJpegtran = require('imagemin-jpegtran'),
rename = require('gulp-rename'),
clean = require('gulp-clean'),
concat = require('gulp-concat'),
notify = require('gulp-notify'),
cache = require('gulp-cache');


//Styles
gulp.task('styles', function(){
	return gulp.src('scss/*.scss')
	 .pipe(sass())
	 .pipe(autoprefixer({
		 browsers:['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
		 cascade: false
	 }))
	 .pipe(rename({suffix:'.min'}))
	 .pipe(minifycss())
	 .pipe(gulp.dest('css'))
	 .pipe(gulp.dest('dist/css'));
});



//JPG
gulp.task('jpg', function(){
	return gulp.src('images/**/*.jpg')
	 .pipe(cache(imagemin({optimizationLevel: 0, progressive: true, interlaced: true})))
	 .pipe(gulp.dest('dist/images'))
	 .pipe(notify({message: 'JPG task complete!'}));
});



//PNG
gulp.task('png', function(){
	return gulp.src('images/**/*.png')
	 //.pipe(pngquant({quality: '65-80', speed: 4})())
	 .pipe(gulp.dest('dist/images'))
	 .pipe(notify({message: 'PNG task complete!'}));
});


//SVG
gulp.task('svg', function(){
	return gulp.src('images/svg/*.svg')
	 .pipe(gulp.dest('dist/images/svg'))
	 .pipe(notify({message: 'SVG task complete!'}));
});


//html-min
gulp.task('html', function(){
	return gulp.src('*.html')
	 .pipe(minifyHTML({empty: true}))
	 .pipe(gulp.dest('dist/'))
	 .pipe(notify({message: 'HTML task complete!'}));
});


//php
gulp.task('php', function(){
	return gulp.src('php/*.php')
	 .pipe(gulp.dest('dist/php'))
	 .pipe(notify({message: 'PHP task complete!'}));
});


//fonts
gulp.task('fonts', function(){
	return gulp.src('fonts/*')
	 .pipe(gulp.dest('dist/fonts'))
	 .pipe(notify({message: 'FONTS task complete!'}));
});


//angular includes
gulp.task('html-inc', function(){
	return gulp.src('html-inc/**/*.html')
	 .pipe(minifyHTML({empty: true}))
	 .pipe(gulp.dest('dist/html-inc'))
	 .pipe(notify({message: 'INCLUDES task complete!'}));
});


//mainscript
gulp.task('mainscript', function(){
	return gulp.src('my-js/*.js')
	 .pipe(concat('main.js'))
	 .pipe(uglify())
	 .pipe(rename({suffix:'.min'}))
	 .pipe(gulp.dest('js/'))
	 .pipe(gulp.dest('dist/js'))
	 .pipe(notify({message: 'MAINSCRIPT task complete!'}));
});



//js
gulp.task('alljs', function(){
	return gulp.src('scripts/*.js')
	 .pipe(gulp.dest('js/'))
	 .pipe(gulp.dest('dist/js'))
	 .pipe(notify({message: 'ALLJS task complete!'}));
});


//bower
gulp.task('bower', function(){
	return gulp.src('bower_components/**/*.js')
	 .pipe(gulp.dest('dist/bower_components'))
	 .pipe(notify({message: 'BOWER task complete!'}));
});


//clean
gulp.task('clean', function(){
	return gulp.src([ 'dist/css', 'dist/js', 'dist/images', 'dist/php', 'dist/fonts', 'dist/html-inc' ], {read: false})
	 .pipe(clean());
});


/*============DEFAULT TASK============*/
gulp.task('default', ['clean'], function(){
	gulp.run('styles', 'alljs', 'jpg', 'fonts', 'mainscript',  'svg', 'html', 'html-inc', 'bower', 'php', 'png');
});


/*============WATCHERS============*/

gulp.task('watch', function(){
	
	gulp.watch('scss/**/*.scss', function(event){
		gulp.run('styles');
	});
	
	gulp.watch('images/*.png', function(event){
		gulp.run('png');
	});
	
	gulp.watch('images/*.jpg', function(event){
		gulp.run('jpg');
	});
	
	gulp.watch('images/svg/*.svg', function(event){
		gulp.run('svg');
	});
	
	gulp.watch('my-js/*.js', function(event){
		gulp.run('mainscript');
	});
	
	gulp.watch('scripts/*.js', function(event){
		gulp.run('alljs');
	});
	
	gulp.watch('bower_components/**/*.js', function(event){
		gulp.run('bower');
	});
	
	gulp.watch('*.html', function(event){
		gulp.run('html');
	});
	
	gulp.watch('html-inc/**/*.html', function(event){
		gulp.run('html-inc');
	});
	
	gulp.watch('php/*.php', function(event){
		gulp.run('php');
	});
	
	
});

















































