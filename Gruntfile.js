module.exports = function (grunt) {

    const sass = require('node-sass');

    require('jit-grunt')(grunt);
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        customs: grunt.file.readJSON('gruntfile_config.custom.json'),
		
		meta: {
            copyright: 'Copyright (c) 2020-<%= grunt.template.today("yyyy") %>'
        },
        
        sass: {
            options: {
                implementation: sass,
                sourceMapEmbed: true,
                sourceMapRoot: "/"
            },
            development: {
                files: {  // Dictionary of files
                    'css/main.css': 'scss/main.scss',
                }
            },
            production: {
                files: {  // Dictionary of files
                    'css/main.css': 'scss/main.scss',
                    
                }
            }
        },
        postcss: {
            development: {
                options: {
                    map: {
                        inline: true
                    },
                    processors: [
                        require('autoprefixer')({
                            grid: true,
                            browsers: ['last 2 versions', 'ie 6-8', 'Firefox > 20']
                        })
                    ]
                },
                src: 'css/*.css'
            },
            production: {
                options: {
                    processors: [
                        require('autoprefixer')({
                            grid: true,
                            browsers: ['last 2 versions', 'ie 6-8', 'Firefox > 20']
                        })
                        ,require('cssnano')({
                            preset: 'default'
                        })
                    ]
                },
                src: 'dist/css/*.css'
            }
        },
        copy: {
            production: {
                files: [
                    {
                        src: '*.html',
                        dest: 'dist/',
                        expand: true
                    },
                ]
            }
        },
        clean:{
            production: {
                src: ['dist/*']
            }
        },
        watch: {
            sass_styles: {
                files: ['scss/**/*.scss'], // which files to watch
                tasks: ['sass:development', 'postcss:development'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    grunt.registerTask('dev', ['sass:development', 'postcss:development', 'watch']);
    grunt.registerTask('build', ['clean:production', 'sass:production', 'postcss:production', 'realFavicon:production', 'copy:production'] );
    grunt.registerTask('default', ['dev']);
};