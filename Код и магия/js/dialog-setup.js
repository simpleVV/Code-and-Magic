'use strict';

// Взаимодействие с окном настройки персонажа
(function () {
  window.dialogSetup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.dialogSetup.querySelector('.setup-close');
  var setupUserName = window.dialogSetup.querySelector('.setup-user-name');

  // Устанавливает позицию окна установки по умолчанию
  var setDefaultSetupCoords = function () {
    window.dialogSetup.style.left = '50%';
    window.dialogSetup.style.top = '80px';
  };

  // Закрытие popup по нажатию на ESC
  var onPopupPressEsc = function (ecsPressEvt) {
    window.utils.isEscEvent(ecsPressEvt, closePopup)
  };

  // Открытие  popup
  var openPopup = function () {
    window.dialogSetup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupPressEsc);
    setupUserName.addEventListener('keydown', function (evt) {
      evt.stopPropagation();
    });
  };

  // Закрытие окна popup
  var closePopup = function () {
    window.dialogSetup.classList.add('hidden');
    setDefaultSetupCoords();
    document.removeEventListener('keydown', onPopupPressEsc);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (enterPressEvt) {
    window.utils.isEnterEvent(enterPressEvt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (enterPressEvt) {
    window.utils.isEnterEvent(enterPressEvt, closePopup);
  });
})();
