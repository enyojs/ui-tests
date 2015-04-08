'use strict';

global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
};

var _ = require('lodash');

var desireds = rootRequire('desireds');
var local_desireds = rootRequire('local_desireds');
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
				src: ['test/**/*-specs.js']
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
			globalConfig.file = filename;
			grunt.task.run('simplemocha:spec');
		});
	});
};
