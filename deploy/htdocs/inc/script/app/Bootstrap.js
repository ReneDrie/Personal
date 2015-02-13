///<reference path='../lib/definitions/definitions.d.ts' />
/**
 * @namespace app
 * @class Bootstrap
 *
 * Bootstraps the application
 */
// require js config, also used in grunt build
requirejs.config({
    baseUrl: 'inc/script',
    waitSeconds: 15,
    paths: {
        requireLib: 'lib/require/require',
        TweenLite: 'lib/gsap/TweenLite.min',
        CSSPlugin: 'lib/gsap/plugins/CSSPlugin.min',
        TimelineLite: 'lib/gsap/TimelineLite.min',
        EasePack: 'lib/gsap/easing/EasePack.min'
    },
    map: {},
    shim: {}
});
requirejs([
    'app/Main',
    'lib/externals',
    'lib/polyfills/polyfills',
], function (Main) {
    new Main();
});
