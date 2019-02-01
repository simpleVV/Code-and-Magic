'use strict';

// Вспомогательные функции
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.utils = {
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
    getRandomValue: function (maxValue, minValue) { // Функия получения случайного значения
      if (minValue) {
        return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      } else {
        return Math.floor(Math.random() * (maxValue));
      }
    },
    addElements: function (elements, parentElement) { // Добавление DOM элементов на страницу
      var fragment = document.createDocumentFragment();
      fragment.appendChild(elements);
      parentElement.appendChild(fragment);
    },
    // Выводит сообщение об ошибке при отправки и получении данных с сервера.
    onError: function (errorMessage) {
      var errorPopup = document.createElement('div');
      errorPopup.style = 'position: absolute; left: 0; right: 0; z-index: 100; margin: 0, auto; font-size: 30px; text-align: center; color: red';

      errorPopup.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', errorPopup);
    }
  };
})();
