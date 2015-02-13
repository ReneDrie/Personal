module.exports = function (grunt, options)
{
	var path = require('path');
	
	var modules = [
		{
			name: "app/Bootstrap",
			include: [
				"requireLib",
				"lib/require/text",
				"app/config/GaiaSitemap",

				"app/page/CustomAbstractController",
				"lib/gaia/assets/AbstractPageViewModel",
				"app/page/DefaultViewModel",

				"app/page/index/IndexViewModel",
				"app/page/index/IndexController"
			]
		}
	];
	
	// find all component bundles and add them to the modules array
	// this will compile all component bundles into single files so it doesn't need additional HTTP requests for the
	// controller, viewmodel and template.
	var scriptDir = grunt.config().base + grunt.config().sourceDir + 'inc/script/app/component/';
	var files = grunt.file.expand({
		matchBase: true,
		cwd: scriptDir,
		filter: 'isFile'
	}, '**/*Bundle.js');

	for ( var i = 0; i < files.length; i++ ) {
		var file = 'app/component/' + path.dirname(files[ i ]) + '/' + path.basename(files[ i ], '.js');
		
		modules.push({
			name: file,
			exclude: [
				"app/Bootstrap",
				"lib/temple/component/AbstractComponentController",
				"lib/temple/component/AbstractComponentViewModel"
			]
		})
	}

	return {
		options: {
			appDir: '<%= sourceDir %>',
			mainConfigFile: '<%= sourceDir %>inc/script/app/Bootstrap.js',
			dir: '<%= buildDir %>',
			optimizeCss: "none",
			optimize: "none",
			normalizeDirDefines: "skip",
			fileExclusionRegExp: /(^\.svn$|^\.git$|^\.gitignore$|^\.idea$|.+?\.pem$|.+?\.pub$|.+?\.map$|.+?\.map.+?|^.DS_STORE$|.+?\.sh$|^Thumbs.db$)/,
			modules: modules,
			removeCombined: true

			//uglify2: {
			//	compress: {
			//		global_defs: {
			//		}
			//	}
			//}
		},

		release: {
			//options: {
			//	uglify2: {
			//		compress: {
			//			global_defs: {
			//				RELEASE: true,
			//				DEBUG: false
			//			}
			//		}
			//	},
			//	generateSourceMaps: true
			//}
		},

		debug: {
			//options: {
			//	uglify2: {
			//		compress: {
			//			global_defs: {
			//				RELEASE: false,
			//				DEBUG: true
			//			}
			//		}
			//	}
			//}
		}

	};
};