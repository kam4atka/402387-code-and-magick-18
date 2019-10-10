'use strict';

(function () {
  var URL_DATA = 'https://js.dump.academy/code-and-magick/data';

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' Тело сообщения: ' + xhr.statusText);
      }
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения..');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
    });

    xhr.timeout = 10000;
    xhr.open('GET', URL_DATA);
    xhr.send();
  };

  window.backend = {
    load: load
  };
})();
