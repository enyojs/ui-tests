'use strict';

global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
}

var _ = require('lodash');

var desireds = rootRequire('desireds');
var local_desireds = rootRequire('local_desireds');

var gruntConfig = {
		env: {
			// dynamically filled
		},
		simplemocha: {
			sauce: {
				options: {
					timeout: 120000,
					reporter: 'spec'
				},
				src: ['test/**/*-specs.js']
			},
			local: {
				options: {
					timeout: 120000,
					reporter: 'spec'
				},
				src: ['test/**/*-specs.js']
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

_(desireds).each(function(desired, key) {
	gruntConfig.env[key] = { 
		DESIRED: JSON.stringify(desired),
		SAUCE: 'true'
	};
	gruntConfig.concurrent['test-sauce'].push('test:sauce:' + key);
});

_(local_desireds).each(function(desired, key) {
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

	_(desireds).each(function(desired, key) {
		grunt.registerTask('test:sauce:' + key, ['env:' + key, 'simplemocha:sauce']);
	});

	grunt.registerTask('test:sauce:parallel', ['concurrent:test-sauce']);

	_(local_desireds).each(function(desired, key) {
		grunt.registerTask('test:local:' + key, ['env:local_' + key, 'simplemocha:local']);
	});
};
