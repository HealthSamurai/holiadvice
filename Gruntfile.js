'use strict';

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.initConfig({
        coffee: {
            app: {
                options: { join: true },
                files: {
                    'build/app.js': [
                        'src/coffee/*.coffee',
                    ]
                }
            }
        },
        less: {
            app: {
                files: [{
                    expand: true,
                    cwd: 'src/less',
                    src: ['*.less', '!.*#.less'],
                    dest: 'build/',
                    ext: '.css'
                }]
            }
        },
        autoprefixer: {
          development: {
            browsers: ['last 2 version', 'ie 9'],
            expand: true,
            flatten: true,
            src: 'build/*.css',
            dest: 'build'
          }
        },
        copy: {
            fonts: {
                cwd: 'bower_components/bootstrap/dist/fonts/',
                expand: true,
                src: '*',
                dest: 'build/fonts/'
            },
            formstamp: {
                cwd: 'bower_components/angular-formstamp/',
                expand: true,
                src: ['*.js', '*.css'],
                dest: 'build'
            },
            fonts2: {
                cwd: 'src/fonts/',
                expand: true,
                src: '*',
                dest: 'build/fonts/'
            },
            imgs: {
                cwd: 'src/img',
                expand: true,
                src: '*',
                dest: 'build/img'
            },
            htmls: {
                cwd: 'src',
                expand: true,
                src: '*.html',
                dest: 'build'
            }
        },
        clean: {
            src: [
                'build/img',
                'build'
            ]
        },
        watch: {
            options: {
                nospawn: true
            },
            sources: {
                files: ['src/coffee/*.coffee', 'src/less/*.less', 'src/*.html', 'src/img/*'],
                tasks: ['build'],
                options: {
                    events: ['changed', 'added'],
                    nospawn: true
                }
            }
        }
    });

    grunt.registerTask('build', ['clean', 'copy', 'coffee', 'less', 'autoprefixer']);
};
