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
    }
  };
})();
