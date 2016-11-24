// get device pixel ratio in dppx
// https://github.com/ryanve/res/blob/master/src/index.js
var screen_density = (typeof window == 'undefined') ? 0 : (+window.devicePixelRatio || Math.sqrt(screen.deviceXDPI*screen.deviceYDPI)/96 || 0);
// keep only 3 decimals: http://jsfiddle.net/AsRqx/
screen_density = +(Math.round(screen_density + "e+3")  + "e-3");

// get viewport width
// http://stackoverflow.com/a/8876069/717195
var viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
