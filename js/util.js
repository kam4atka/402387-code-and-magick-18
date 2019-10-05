'use strict';

(function () {
  var KeyCodes = {
    ESC: 27,
    ENTER: 13
  };
  var getRandomCount = function (min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
  };
  window.util = {
    KeyCodes: KeyCodes,
    getRandomCount: getRandomCount,
  };
})();
