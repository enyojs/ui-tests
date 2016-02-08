'use strict';

global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
};

var _ = require('lodash');

var desireds = rootRequire('desireds');
var local_desireds = rootRequire('local_desireds');
var testGenerator = rootRequire('test_generator/create_test.js');
var moonstoneExtraCheck = rootRequire('moonstone-extra-checks');
var enyoBuild = rootRequire('enyo-version-on-build');
var globalConfig = {};

var gruntConfig = {
		globalConfig: globalConfig,
		env: {
			// dynamically filled
		},
		simplemocha: {
			all: {
				options: {
					timeout: 240000,
					reporter: 'spec'
				},
				src: moonstoneExtraCheck.getAllUsedTests()
			},
			spec: {
				options: {
					timeout: 240000,
					reporter: 'spec'
				},
				src: ['test/**/<%= globalConfig.file %>-specs.js']
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			test: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: ['test/**/*.js']
			}
		},
		concurrent: {
			'test-sauce': [] // dynamically filled
		},
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			test: {
				files: '<%= jshint.test.src %>',
				tasks: ['jshint:test']
			}
		}
	};

_.each(desireds, function(desired, key) {
	gruntConfig.env[key] = {
		DESIRED: JSON.stringify(desired),
		SAUCE: 'true'
	};
	gruntConfig.concurrent['test-sauce'].push('test:sauce:' + key);
});

_.each(local_desireds, function(desired, key) {
	gruntConfig.env['local_'+key] = {
		DESIRED: JSON.stringify(desired),
		SAUCE: 'false'
	};
});

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig(gruntConfig);

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task.
	grunt.registerTask('default', ['test:sauce:' + _(desireds).keys().first()]);

	_.each(desireds, function(desired, key) {
		grunt.registerTask('test:sauce:' + key, ['env:' + key, 'simplemocha:all']);
		grunt.registerTask('spec:sauce:' + key, function(filename) {
			grunt.task.run('env:' + key);
			globalConfig.file = filename;
			grunt.task.run('simplemocha:spec');
		});
	});

	grunt.registerTask('test:sauce:parallel', ['concurrent:test-sauce']);

	_.each(local_desireds, function(desired, key) {
		grunt.registerTask('test:local:' + key, ['env:local_' + key, 'simplemocha:all']);
		grunt.registerTask('spec:local:' + key, function(filename) {
			grunt.task.run('env:local_' + key);

			//Needed for when we want enyo libraries to match the versions on the BUILD_NUMBER
			if(process.env.BUILD_NUMBER && process.env.BOARD_NUMBER && process.env.NAME && process.env.PASSWORD){
				//forces grunt to wait for enyo versions to checkout
				var done = this.async();
				console.log('async');
				enyoBuild.changeEnyoVersions(process.env.BUILD_NUMBER, process.env.BOARD_NUMBER, process.env.NAME, process.env.PASSWORD, done);
			}

			//Needed for TAS to work properly with MOONSTONE_EXTRA flag
			//Currently does not work with * (e.g. GT-12345*), but TAS uses full file names so it is currently a non-issue
			if(process.env.MOONSTONE_EXTRA === 'false'){
				var moonstoneExtraTests = moonstoneExtraCheck.getMoonstoneExtraTests();
				var isTestMoonstoneExtra = _.includes(moonstoneExtraTests, filename);
				if(!isTestMoonstoneExtra){
					globalConfig.file = filename;
				}
				//if test is not a moonstone test do nothing and test will not run.
			} else {
				globalConfig.file = filename;
			}

			grunt.task.run('simplemocha:spec');
		});
	});

	grunt.registerTask('generate:test', function(){
		//forces grunt to wait for task to finish.
		var done = this.async();
		testGenerator.createTest(done);
	});
};