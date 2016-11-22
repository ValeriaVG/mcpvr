'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
            ' Licensed GPL-3.0 */\n',
        // Task configuration.
        clean: {
            main: {
                src: ['dist/css', 'dist/js', 'docs/css', 'docs/js']
            }
            /*,
                      dev:{
                        src: ['temp']
                      }*/
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/js/mcpvr.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/js/mcpvr.min.js'
            },
        },
        qunit: {
            options: {

                page: {
                    viewportSize: {
                        width: 1400,
                        height: 900
                    }
                }
            },

            main: ['test/*.html'],
            dev: {
                src: ['test/*.html'],
                options: {
                    '--web-security': 'no',
                    timeout: 10000,
                    coverage: {
                        disposeCollector: true,
                        src: ['src/**/*.js'],
                        instrumentedFiles: 'temp/',
                        htmlReport: 'report/coverage',
                        lcovReport: 'report/',
                        linesThresholdPct: 85
                    }
                }
            }

        },
        jshint: {
            options: {
                jshintrc: true,
                reporterOutput: ""
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            src: {
                src: ['src/**/*.js']
            },
            //  test: {
            //      src: ['test/**/*.js']
            //  },

        },
        sass: { // Task

            dist: { // Target
                options: { // Target options
                    style: 'expanded'
                },
                files: { // Dictionary of files
                    'dist/css/mcpvr.css': 'styles/mcpvr.scss'

                },
                reporterOutput: ''

            }
        },
        cssmin: { // Task

            dist: { // Target

                files: { // Dictionary of files
                    'dist/css/mcpvr.min.css': 'dist/css/mcpvr.css'
                }

            }
        },
        copy: {
            main: {
                files: [

                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['css/**', 'js/**'],
                        dest: 'docs/'
                    },
                ]
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src', 'qunit']
            },
            styles: {
                files: 'styles/**/*.scss',
                tasks: ['sass']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'qunit']
            },
        },

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-qunit-istanbul');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // Default task.
    grunt.registerTask('default', ['jshint', 'clean', 'sass', 'qunit:main', 'concat', 'uglify', 'cssmin', 'copy']);
    grunt.registerTask('test', ['jshint', 'clean', 'sass', 'qunit:dev', 'concat', 'copy']);

};
