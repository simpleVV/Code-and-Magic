
'use strict';

// Получение и отрисовка разных волшебников
(function () {
  var setupSimilar = document.querySelector('.setup-similar');
  var similarListElement = setupSimilar.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content;
  var WIZARD_NUMBER = 4;

  // Создание DOM элементов на основе сгенерированных образов волшебников
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;
    return wizardElement;
  };

  // Успешная загрузка волшебников с сервера.
  var onSuccess = function (wizards) {
    for (var i = 0; i < WIZARD_NUMBER; i++) {
      window.utils.addElements(renderWizard(wizards[i]), similarListElement);
      setupSimilar.classList.remove('hidden');
    }
  };

  // Если произошла ошибка при загрузки волшебников вывести сообщение.
  // var onError = function (errorMessage) {
  //   var errorPopup = document.createElement('div');
  //   errorPopup.style = 'position: absolute; left: 0; right: 0; z-index: 100; margin: 0, auto; font-size: 30px; text-align: center; color: red';
  //
  //   errorPopup.textContent = errorMessage;
  //   document.body.insertAdjacentElement('afterbegin', errorPopup);
  // };

  window.backend.load(onSuccess, window.utils.onError);
})();
