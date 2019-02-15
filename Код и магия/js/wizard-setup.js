'use strict';

// Настройка персонажа
(function () {
  var setupPlayer = document.querySelector('.setup-player')
  var setupWizard = setupPlayer.querySelector('.setup-wizard');

  var wizardSetup = {
    WIZARD_COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    WIZARD_EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green'],
    WIZARD_FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  // События при смене цвета атрибутов персонажа
  var wizard = {
    onCoatChange: function (color) {
      return color;
    },
    onEyesChange: function (color) {
      return color;
    },
    onFireballChange: function (color) {
      return color;
    }
  };

  // Смена цвета куртки
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  wizardCoat.addEventListener('click', function () {
    var newColor = wizardSetup.WIZARD_COAT_COLORS[window.utils.getRandomValue(wizardSetup.WIZARD_COAT_COLORS.length)];
    wizardCoat.style.fill = newColor;
    wizard.onCoatChange(newColor);
  });

  // Смена цвета глаз
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  wizardEyes.addEventListener('click', function () {
    var newColor =
    wizardSetup.WIZARD_EYES_COLOR[window.utils.getRandomValue(wizardSetup.WIZARD_EYES_COLOR.length)];
    wizardEyes.style.fill = newColor;
    wizard.onEyesChange(newColor);
  });

  // Смена цвета фаербола
  var wizardFireball = setupPlayer.querySelector('.setup-fireball-wrap');
  wizardFireball.addEventListener('click', function () {
    var newColor =
    wizardSetup.WIZARD_FIREBALL_COLORS[window.utils.getRandomValue(wizardSetup.WIZARD_FIREBALL_COLORS.length)];
    wizardFireball.style.backgroundColor = newColor;
    wizard.onFireballChange(newColor);
  });

  window.wizard = wizard;
})();
