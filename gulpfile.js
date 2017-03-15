var gulp = require('gulp');
var git = require('gulp-git');
var argv = require('yargs').argv;
var gitignore = require('gulp-gitignore');

gulp.task('add', function() {
	console.log('adding and committing...')
	return gulp.src('.')
		.pipe(gitignore())
		.pipe(git.add())
		.pipe(git.commit(argv.m));
});

gulp.task('push', ['tag'], function() {
	git.push('origin', argv.b, {args: " --tags"}, function (err) {
    	if (err) throw err;
  	});
});

gulp.task('tag', function(){
  git.tag(argv.v, argv.m, function (err) {
    if (err) throw err;
  });
});

gulp.task('checkoutReleaseCreate', function(){
  git.checkout('release', {args:'-b'}, function (err) {
    if (err) throw err;
  });
});

gulp.task('checkoutDevelopCreate', function(){
	console.log('Checkout to new dev branch');
  git.checkout('dev', {args:'-b'}, function (err) {
    if (err) throw err;
  });
});

gulp.task('default', ['checkoutReleaseCreate', 'checkoutDevelopCreate']);






