
'use strict';

var setup = document.querySelector('.setup');
var setupUserName = setup.querySelector('.setup-user-name');
setup.querySelector('.setup-similar').classList.remove('hidden');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARD_NUMBER = 4;

// Работа с окном настройки персонажа
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var setupWizard = setup.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');

// Открытие и закрытие окна попап
var onPopupPressEsc = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupPressEsc);
  setupUserName.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupPressEsc);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Настройка персонажа
// Смена цвета элемента
var changeElementColor = function (element, color, inputName) {
  var inputData = setup.querySelector('input[name="' + inputName + '"]');
  if (element === wizardFireball) {
    element.style.backgroundColor = color;
  } else {
    element.style.fill = color;
  }
  inputData.value = color;
};

wizardCoat.addEventListener('click', function () {
  changeElementColor(wizardCoat, WIZARD_COAT_COLORS[getRandomValue(WIZARD_COAT_COLORS.length)], 'coat-color');
});

wizardEyes.addEventListener('click', function () {
  changeElementColor(wizardEyes, WIZARD_EYES_COLOR[getRandomValue(WIZARD_EYES_COLOR.length)], 'eyes-color');
});

wizardFireball.addEventListener('click', function () {
  changeElementColor(wizardFireball, WIZARD_FIREBALL_COLORS[getRandomValue(WIZARD_FIREBALL_COLORS.length)], 'fireball-color');
});

// Функия получения случайного значения
var getRandomValue = function (max, min) {
  if (min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
