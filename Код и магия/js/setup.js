
'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_NUMBER = 4;

// Функия получения случайного значения
var getRandomValue = function (max, min) {
  if (min) {
    return Math.floor(Math.random() * (max)) + min;
  } else {
    return Math.floor(Math.random() * (max));
  }
};

// Создание случайного образа волшебника
var getDifferentWizard = function (names, secondNames, coatColors, eyesColors) {
  var wizardsData = [];
  var randomNumber = getRandomValue(10); // Для перестановки имени и фамилии местами
  var fullName = '';

  // Меняем местами имя и фамилию
  for (var i = 0; i < WIZARD_NUMBER; i++) {
    if (randomNumber > WIZARD_NUMBER) {
      fullName = names[getRandomValue(names.length)] + ' ' + secondNames[getRandomValue(secondNames.length)];
    } else {
      fullName = secondNames[getRandomValue(secondNames.length)] + ' ' + names[getRandomValue(names.length)];
    }

    // Заполняем данными объекты
    var wizard = {
      name: fullName,
      coatColor: coatColors[getRandomValue(coatColors.length)],
      eyeColor: eyesColors[getRandomValue(eyesColors.length)]
    };
    wizardsData.push(wizard);
  }
  return wizardsData;
};

var wizards = getDifferentWizard(WIZARD_NAMES, WIZARD_SECOND_NAMES, WIZARD_COAT_COLORS, WIZARD_EYES_COLOR);

// Создание DOM элементов на основе сгенерированных образов волшебников
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;
  return wizardElement;
};

// Добавление DOM элементов на страницу.
var addWizard = function (elements) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < elements.length; i++) {
    fragment.appendChild(renderWizard(elements[i]));
    similarListElement.appendChild(fragment);
  }
};

addWizard(wizards);
