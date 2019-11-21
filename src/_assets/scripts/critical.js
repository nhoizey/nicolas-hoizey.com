(function (window) {
  // get device pixel ratio in dppx
  // https://github.com/ryanve/res/blob/master/src/index.js
  window.screen_density =
    typeof window == "undefined"
      ? 0
      : +window.devicePixelRatio ||
      Math.sqrt(screen.deviceXDPI * screen.deviceYDPI) / 96 ||
      0;
  // keep only 3 decimals: https://jsfiddle.net/AsRqx/
  window.screen_density = +(Math.round(window.screen_density + "e+3") + "e-3");

  // get viewport width
  // https://stackoverflow.com/a/8876069/717195
  window.viewport_width = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );

  window.root_font_size = parseFloat(
    window.getComputedStyle(document.documentElement).fontSize,
    10
  );
})(window);
