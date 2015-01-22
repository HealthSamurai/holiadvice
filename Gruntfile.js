'use strict';

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

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
        copy: {
            fonts: {
                cwd: 'bower_components/bootstrap/dist/fonts/',
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

    grunt.registerTask('build', ['clean', 'copy', 'coffee', 'less']);
};
