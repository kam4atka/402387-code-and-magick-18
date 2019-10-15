'use strict';

(function () {
  var STATUS_OK = 200;
  var TIMEOUT = 10000;
  var Url = {
    SERVER: 'https://js.dump.academy/code-and-magick',
    DATA: 'https://js.dump.academy/code-and-magick/data'
  };

  var createXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' Тело сообщения: ' + xhr.statusText);
      }
    });
    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = createXhr(onLoad, onError);
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения..');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.open('GET', Url.DATA);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = createXhr(onLoad, onError);
    xhr.open('POST', Url.SERVER);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
