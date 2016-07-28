// get device pixel ratio in dppx
// https://github.com/ryanve/res/blob/master/src/index.js
var screenDppx = (typeof window == 'undefined') ? 0 : (+window.devicePixelRatio || Math.sqrt(screen.deviceXDPI*screen.deviceYDPI) || 0);

// get viewport width
// http://stackoverflow.com/a/8876069/717195
var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

;(function( win, doc ) {

  // ******************************************************************
  // Only for IE9+ after this
  // ******************************************************************

  if( !( 'geolocation' in navigator ) ) {
    return;
  }
})( window, document );
