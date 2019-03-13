'use strict';

(function () {
  // Модуль получения и сохранения данных
  var SUCCESS_CODE = 200;
  var READY_STATE_SUCCESS = 4;
  var TIMEOUT = 10000;

  var backend = {
  // загрузка данных с сервера
    load: function (onLoad, onError) {
      var URL = 'https://js.dump.academy/code-and-magick/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_CODE) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT;

      xhr.open('GET', URL);
      xhr.send();
    },
    // Сохранение данных на сервер
    save: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/code-and-magick';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.readyState === READY_STATE_SUCCESS && xhr.status === SUCCESS_CODE) {
          onLoad(xhr.response)
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка при отправки данных');
      });

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };

  window.backend = backend;
})();
