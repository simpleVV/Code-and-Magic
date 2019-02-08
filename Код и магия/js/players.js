
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

  window.backend.load(onSuccess, window.utils.onError);


// Загрузка волшебников с сервера с помощь JSONP
  // var DATA_URL = 'https://js.dump.academy/code-and-magick/data?callback=getWizardCallback';
  //
  // window.getWizardCallback = function (data) {
  //   for (var i = 0; i < WIZARD_NUMBER; i++) {
  //     window.utils.addElements(renderWizard(data[i]), similarListElement);
  //     setupSimilar.classList.remove('hidden');
  //   }
  // };
  //
  // var loader = document.createElement('script');
  // loader.src = DATA_URL;
  // document.body.append(loader);
})();
