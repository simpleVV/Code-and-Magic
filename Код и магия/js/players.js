
'use strict';

// Получение и отрисовка разных волшебников
(function () {
  window.dialogSetup.querySelector('.setup-similar').classList.remove('hidden');
  var similarListElement = window.dialogSetup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_NUMBER = 4;

  // Создание случайного образа волшебника
  var getDifferentWizard = function (names, secondNames, coatColors, eyesColors) {
    var wizardsData = [];
    var randomNumber = Math.random(); // Для перестановки имени и фамилии местами
    var fullName = '';

    // Меняем местами имя и фамилию
    for (var i = 0; i < WIZARD_NUMBER; i++) {
      if (randomNumber > Math.random()) {
        fullName = names[window.utils.getRandomValue(names.length)] + ' ' + secondNames[window.utils.getRandomValue(secondNames.length)];
      } else {
        fullName = secondNames[window.utils.getRandomValue(secondNames.length)] + ' ' + names[window.utils.getRandomValue(names.length)];
      }

      // Заполняем данными объекты
      var wizard = {
        name: fullName,
        coatColor: coatColors[window.utils.getRandomValue(coatColors.length)],
        eyeColor: eyesColors[window.utils.getRandomValue(eyesColors.length)]
      };
      wizardsData.push(wizard);
    }
    return wizardsData;
  };

  var wizards = getDifferentWizard(WIZARD_NAMES, WIZARD_SECOND_NAMES, window.wizardSetup.WIZARD_COAT_COLORS, window.wizardSetup.WIZARD_EYES_COLOR);

  // Создание DOM элементов на основе сгенерированных образов волшебников
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;
    return wizardElement;
  };

  var addWizard = function () {
    for (var i = 0; i < wizards.length; i++) {
      window.utils.addElements(renderWizard(wizards[i]), similarListElement);
    }
  };
  addWizard();
})();
