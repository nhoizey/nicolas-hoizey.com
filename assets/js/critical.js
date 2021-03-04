(function (window) {
  // Change the `no-js` class on <html> to `js`
  window.document.documentElement.className = window.document.documentElement.className.replace(
    'no-js',
    'js'
  );

  // get device pixel ratio in dppx
  // https://github.com/ryanve/res/blob/master/src/index.js
  window.screen_density =
    typeof window == 'undefined'
      ? 0
      : +window.devicePixelRatio ||
        Math.sqrt(screen.deviceXDPI * screen.deviceYDPI) / 96 ||
        0;
  // keep only 3 decimals: https://jsfiddle.net/AsRqx/
  window.screen_density = +(Math.round(window.screen_density + 'e+3') + 'e-3');

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

  // See https://www.bram.us/2021/02/23/the-future-of-css-scroll-linked-animations-part-1/
  // add scroll position as a custom property
  // https://css-tricks.com/books/greatest-css-tricks/scroll-animation/
  // window.addEventListener(
  //   'scroll',
  //   () => {
  //     document.body.style.setProperty(
  //       '--scroll',
  //       window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
  //     );
  //     document.body.style.setProperty(
  //       '--scrollTo200',
  //       Math.min(200, window.pageYOffset) / 200 - 0.01
  //     );
  //   },
  //   false
  // );
})(window);
