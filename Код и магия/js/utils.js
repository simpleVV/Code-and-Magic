'use strict';

// Вспомогательные функции
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var utils = {
    isEscEvent: function (escEvt, action) { // Выполнение кода при нажатии Esc
      if (escEvt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (entEvt, action) { // Выполнение кода при нажатии Enter
      if (entEvt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomValue: function (maxValue, minValue) { // Функция получения случайного значения
      if (minValue) {
        return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      } else {
        return Math.floor(Math.random() * (maxValue));
      }
    },
    // Выводит сообщение об ошибке при отправки и получении данных с сервера.
    onError: function (errorMessage) {
      var errorPopup = document.createElement('div');
      errorPopup.style = 'position: absolute; left: 0; right: 0; z-index: 100; margin: 0, auto; font-size: 30px; text-align: center; background-color: red';

      errorPopup.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', errorPopup);
    }
  };

  window.utils = utils;
})();
