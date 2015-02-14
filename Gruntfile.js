module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		compass: {                  // Task
    		dist: {                   // Target
    		  options: {              // Target options
    		  	sassDir: 'sass',
    		  	cssDir: 'css',
    		  	environment: 'production'
    		  }
    		},
    		dev: {                    // Another target
    			options: {
    				sassDir: 'sass',
    				cssDir: 'css'
    			}
    		}
    	},

    	uglify: {
    		js: {
    			files :{
    				'js/map.min.js': ['js/map.js']
    			}
    		}
    	},

    	cssmin: {
    		css: {
    			files: {
    				"css/main.min.css" : ["css/main.css"],
    				"css/foundation.min.css" : ["css/foundation.css"],
                    "css/normalize.min.css" : ["css/normalize.css"],
    				"css/animate.min.css" : ["css/animate.css"]
    			}
    		}
    	},

    	watch: {
    		files: ['css/main.css', 'js/map.js'],
    		tasks: ['uglify', 'cssmin']
    	}

    });

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.registerTask('default', [ 'cssmin:css', 'uglify:js' ]);
};