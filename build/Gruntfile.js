'use strict';

module.exports = function(grunt){
	grunt.initConfig({
		// Minifica tdos os arquivos js da pasta public/js
		uglify : {
			background : {
				src : 'appBack/background.js',
				dest : './../chrome-extension/ext-fplayer-concatenated-sources-background.js'
			},
			socketio : {
				src : 'appBack/lib/socket.io.js',
				dest : './../chrome-extension/ext-fplayer-concatenated-sources-lib.js'
			},
			content : {
				src : [
					'appContent/content.js',
					'appContent/lib/jquery.js'
				],
				dest : './../chrome-extension/ext-fplayer-concatenated-sources-content.js'
			}
		}
	});

	//Carregando módulo para minificar js
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Carregando todos os módulos

	//require('load-grunt-tasks')(grunt);


	// Criando tarefa default. 'grunt'
	grunt.registerTask('default', ['uglify:background','uglify:socketio','uglify:content']);
};