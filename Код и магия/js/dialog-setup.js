'use strict';

// Взаимодействие с окном настройки персонажа
(function () {
  var dialogSetup = document.querySelector('.setup');
  var dialogHandler = dialogSetup.querySelector('.upload');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = dialogSetup.querySelector('.setup-close');
  var setupUserName = dialogSetup.querySelector('.setup-user-name');

  // Устанавливает позицию окна установки по умолчанию
  var setDefaultSetupCoords = function () {
    dialogSetup.style.left = '50%';
    dialogSetup.style.top = '80px';
  };

  // Закрытие popup по нажатию на ESC
  var onPopupPressEsc = function (ecsPressEvt) {
    window.utils.isEscEvent(ecsPressEvt, closePopup)
  };

  // Открытие  popup
  var openPopup = function () {
    dialogSetup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupPressEsc);
    setupUserName.addEventListener('keydown', function (evtPress) {
      evtPress.stopPropagation();
    });
  };

  // Закрытие окна popup
  var closePopup = function () {
    dialogSetup.classList.add('hidden');
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

  // Реализация перетаскивания окна настройки персонажа.
  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      dialogSetup.style.top = (dialogSetup.offsetTop - shift.y) + 'px';
      dialogSetup.style.left = (dialogSetup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var form = dialogSetup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      dialogSetup.classList.add('hidden');
    }, window.utils.onError);
    evt.preventDefault();
  });

})();
