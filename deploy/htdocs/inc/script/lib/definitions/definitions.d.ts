// import all definitions
// don't reference this file from your typescript files, instead use the TS file:
// import refdef = require('lib/ReferenceDefinitions');

///<reference path="../require/require.d.ts" />
///<reference path="../gsap/greensock.d.ts" />
///<reference path="../mootools/mootools.d.ts" />
///<reference path="../modernizr/modernizr.d.ts" />

///<reference path="touch.d.ts" />


// export files as typescript module in which a javascript define() is used instead of a typescript export.
// this way they can be imported as "import externals = require('lib/externals');" in a typescript file.
declare module "lib/externals"
{
	// dummy export, needed for not removing the import
	var ext:any;
	export = ext;
}

// declare global libaries and variables that have no typescript definitions
declare var DEBUG:boolean;
declare var RELEASE:boolean;