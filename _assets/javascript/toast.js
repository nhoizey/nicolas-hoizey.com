/*!
 * Forked from https://github.com/apvarun/toastify-js
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.Toast = factory();
  }
})(this, function (global) {
  // Object initialization
  var Toast = function (options) {
    // Returning a new init object
    return new Toast.lib.init(options);
  },
    // Library version
    version = "1.0.0";

  // Defining the prototype of the object
  Toast.lib = Toast.prototype = {
    toast: version,

    constructor: Toast,

    // Initializing the object with required parameters
    init: function (options) {
      // Verifying and validating the input object
      if (!options) {
        options = {};
      }

      // Creating the options object
      this.options = {};

      this.toastElement = null;

      // Validating the options
      this.options.text = options.text || "Hi there!"; // Display message
      this.options.duration = options.duration || 3000; // Display duration
      this.options.callback = options.callback || function () { }; // Callback after display
      this.options.close = options.close || false; // Show toast close icon
      this.options.icon = options.icon || "info"; // svg icon id
      this.options.type = options.type || "info"; // additional class names for the toast
      this.options.onClick = options.onClick; // Callback after click

      // Returning the current object for chaining functions
      return this;
    },

    // Building the DOM element
    buildToast: function () {
      // Validating if the options are defined
      if (!this.options) {
        throw "Toast is not initialized";
      }

      // Creating the DOM object
      var divElement = document.createElement("div");
      divElement.className = `toast on toast-bottom toast-${this.options.type}`;

      // Adding the toast message
      divElement.innerHTML = this.options.text;

      if (this.options.icon !== "") {
        // Adding icon on the left of content
        divElement.insertAdjacentHTML(
          "afterbegin",
          `<svg class="toast-icon"><use xlink:href="#symbol-${this.options.icon}" /></svg>`
        );
      }

      // Adding a close icon to the toast
      if (this.options.close === true) {
        // Create a span for close element
        var closeElement = document.createElement("span");
        closeElement.innerHTML = "&#10006;";
        closeElement.className = "toast-close";

        // Triggering the removal of toast from DOM on close click
        closeElement.addEventListener(
          "click",
          function (event) {
            event.stopPropagation();
            this.removeElement(event.target.parentElement);
            window.clearTimeout(event.target.parentElement.timeOutValue);
          }.bind(this)
        );

        // Clear timeout while toast is focused
        const self = this;
        // stop countdown
        divElement.addEventListener("mouseover", function (event) {
          window.clearTimeout(divElement.timeOutValue);
        });
        // add back the timeout
        divElement.addEventListener("mouseleave", function () {
          divElement.timeOutValue = window.setTimeout(function () {
            // Remove the toast from DOM
            self.removeElement(divElement);
          }, self.options.duration);
        });

        // Adding the close icon to the toast element
        divElement.appendChild(closeElement);
      }

      // Adding an on-click destination path
      if (typeof this.options.destination !== "undefined") {
        divElement.addEventListener(
          "click",
          function (event) {
            event.stopPropagation();
            if (this.options.newWindow === true) {
              window.open(this.options.destination, "_blank");
            } else {
              window.location = this.options.destination;
            }
          }.bind(this)
        );
      }

      if (
        typeof this.options.onClick === "function" &&
        typeof this.options.destination === "undefined"
      ) {
        divElement.addEventListener(
          "click",
          function (event) {
            event.stopPropagation();
            this.options.onClick();
          }.bind(this)
        );
      }

      // Returning the generated element
      return divElement;
    },

    // Displaying the toast
    showToast: function () {
      // Creating the DOM object for the toast
      this.toastElement = this.buildToast();

      // Getting the root element to with the toast needs to be added
      var rootElement = document.body;

      // Validating if root element is present in DOM
      if (!rootElement) {
        throw "Root element is not defined";
      }

      // Adding the DOM element
      rootElement.insertBefore(this.toastElement, rootElement.firstChild);

      // Repositioning the toasts in case multiple toasts are present
      Toast.reposition();

      if (this.options.duration > 0) {
        this.toastElement.timeOutValue = window.setTimeout(
          function () {
            // Remove the toast from DOM
            this.removeElement(this.toastElement);
          }.bind(this),
          this.options.duration
        ); // Binding `this` for function invocation
      }

      // Supporting function chaining
      return this;
    },

    hideToast: function () {
      if (this.toastElement.timeOutValue) {
        clearTimeout(this.toastElement.timeOutValue);
      }
      this.removeElement(this.toastElement);
    },

    // Removing the element from the DOM
    removeElement: function (toastElement) {
      // Hiding the element
      // toastElement.classList.remove("on");
      toastElement.className = toastElement.className.replace(" on", "");

      // Removing the element from DOM after transition end
      window.setTimeout(
        function () {
          // Remove the elemenf from the DOM
          toastElement.parentNode.removeChild(toastElement);

          // Calling the callback function
          this.options.callback.call(toastElement);

          // Repositioning the toasts again
          Toast.reposition();
        }.bind(this),
        400
      ); // Binding `this` for function invocation
    }
  };

  // Positioning the toasts on the DOM
  Toast.reposition = function () {
    // Spacing between toasts
    var spacing = 15;

    var bottomOffset = spacing;

    // Get all toast messages on the DOM
    var allToasts = document.getElementsByClassName("toast");

    // Modifying the position of each toast element
    for (var i = 0; i < allToasts.length; i++) {
      var height = allToasts[i].offsetHeight;

      // Setting the position
      allToasts[i].style.bottom = bottomOffset + "px";
      bottomOffset += height + spacing;
    }

    // Supporting function chaining
    return this;
  };

  function containsClass(elem, yourClass) {
    if (!elem || typeof yourClass !== "string") {
      return false;
    } else if (
      elem.className &&
      elem.className
        .trim()
        .split(/\s+/gi)
        .indexOf(yourClass) > -1
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Setting up the prototype for the init object
  Toast.lib.init.prototype = Toast.lib;

  // Returning the Toast function to be assigned to the window object/module
  return Toast;
});
