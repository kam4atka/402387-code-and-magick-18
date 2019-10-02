'use strict';

(function () {
  var KeyCodes = {
    esc: 27,
    enter: 13
  };
  window.util = {
    keyCode: {
      esc: KeyCodes.esc,
      enter: KeyCodes.enter
    },
    getRandomCount: function (min, max) {
      return Math.ceil(Math.random() * (max - min) + min);
    }
  };
})();
