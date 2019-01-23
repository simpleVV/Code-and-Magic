'use strict';

// Настройка персонажа
(function () {
  var setupWizard = window.dialogSetup.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var wizardFireball = window.dialogSetup.querySelector('.setup-fireball-wrap');

  window.wizardSetup = {
    WIZARD_COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    WIZARD_EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green'],
    WIZARD_FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  // Смена цвета элемента
  var changeElementColor = function (element, color, inputName) {
    var inputData = window.dialogSetup.querySelector('input[name="' + inputName + '"]');
    if (element === wizardFireball) {
      element.style.backgroundColor = color;
    } else {
      element.style.fill = color;
    }
    inputData.value = color;
  };

  wizardCoat.addEventListener('click', function () {
    changeElementColor(wizardCoat, window.wizardSetup.WIZARD_COAT_COLORS[window.utils.getRandomValue(window.wizardSetup.WIZARD_COAT_COLORS.length)], 'coat-color');
  });

  wizardEyes.addEventListener('click', function () {
    changeElementColor(wizardEyes, window.wizardSetup.WIZARD_EYES_COLOR[window.utils.getRandomValue(window.wizardSetup.WIZARD_EYES_COLOR.length)], 'eyes-color');
  });

  wizardFireball.addEventListener('click', function () {
    changeElementColor(wizardFireball, window.wizardSetup.WIZARD_FIREBALL_COLORS[window.utils.getRandomValue(window.wizardSetup.WIZARD_FIREBALL_COLORS.length)], 'fireball-color');
  });
})();
