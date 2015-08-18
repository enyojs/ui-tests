var fs = require('fs');
var vm = require('vm');

// set predefined variables, to deal with
// https://github.com/joyent/node/issues/9211
global.require = require;
global.__dirname = __dirname;
global.__filename = 'Gruntfile.js';
global.module = module;

vm.runInThisContext(fs.readFileSync('./Gruntfile.js', 'utf8'));

// override exports, provide our function and task
module.exports = function(grunt) {
	// load grunt config from enyo-tests
	grunt.initConfig(gruntConfig);

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task.
	grunt.registerTask('default', 'tas_list:simplemocha:all');

	grunt.registerTask('tas_list', function() {
		var taskConfig = grunt.config(this.args.join('.'));
		var expanded = grunt.task.normalizeMultiTaskFiles(taskConfig);
		var result = [];
		var tasObj = {"name": "Enyo tests",
						"path": [
							"enyo"
						],
						"requires": {
							"enyo_env": {}
					  }};
		expanded.forEach(function(files) {
			files.src.forEach(function(file) {
				var contents = fs.readFileSync(file,'utf8');
				var titleIndex = contents.indexOf("title =");
				var titleBeginIndex = contents.indexOf("'",titleIndex);
				var titleEndIndex = contents.indexOf(",",titleIndex);
				var fileTitle = contents.substring(titleBeginIndex+1, titleEndIndex-1);
				var testBegin = file.lastIndexOf("/");
				var testEnd = file.lastIndexOf("-");
				var filename = file.substring(testBegin + 1, testEnd);

				result.push({
					"arguments": {
						'test': filename,
						'title': fileTitle
					},
					"file": "run_enyo_test.py"
				});
			});
		});
		tasObj.tests = result;
		var destfile = grunt.option('destfile') || 'tas_list.json';
		fs.writeFileSync(destfile, JSON.stringify(tasObj, null, 2));
		console.log('Saved result to ' + destfile);
	});
};
