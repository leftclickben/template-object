/*jslint node: true, nomen: true, white: true, unparam: true*/
/*!
 * Sitegear3
 * Copyright(c) 2014 Ben New, Sitegear.org
 * MIT Licensed
 */

(function () {
	"use strict";
	module.exports = function (grunt) {
		grunt.loadNpmTasks('grunt-jslint');
		grunt.loadNpmTasks('grunt-jasmine-node');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),
			jslint: {
				root: {
					src: [
						'index.js',
						'Gruntfile.js'
					],
					options: {
						log: 'build/log/jslint/jslint.root.log'
					}
				},
				lib: {
					src: [
						'lib/**/*.js'
					],
					options: {
						log: 'build/log/jslint/jslint.lib.log'
					}
				},
				tests: {
					src: [
						'tests/**/*.js'
					],
					options: {
						log: 'build/log/jslint/jslint.tests.log'
					}
				}
			},
			jasmine_node: {
				projectRoot: './tests',
				jUnit: {
					report: true,
					savePath: 'build/log/jasmine/'
				},
				forceExit: false
			},
			watch: {
				root: {
					files: [
						'index.js',
						'Gruntfile.js'
					],
					tasks: [
						'qa'
					]
				},
				lib: {
					files: [
						'lib/**/*.js'
					],
					tasks: [
						'qa'
					]
				},
				tests: {
					files: [
						'tests/**/*.js'
					],
					tasks: [
						'qa'
					]
				}
			}
		});
		grunt.registerTask('qa', [ 'jslint', 'jasmine_node' ]);
		grunt.registerTask('default', [ 'qa' ]);
		grunt.event.on('watch', function(action, filepath, target) {
			grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
		});
	};
}());
