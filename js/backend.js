'use strict';

(function () {
  var URL_SERV = 'https://js.dump.academy/code-and-magick';
  var URL_DATA = 'https://js.dump.academy/code-and-magick/data';

  var createXhr = function (onLoad, onError) {
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
    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = createXhr(onLoad, onError);
    xhr.timeout = 10000;
    xhr.open('GET', URL_DATA);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = createXhr(onLoad, onError);
    xhr.open('POST', URL_SERV);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
