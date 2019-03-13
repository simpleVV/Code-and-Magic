'use strict';
// Настройка персонажа
(function () {

  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var wizardName = document.querySelector('.setup-user-name');

  var wizard = new window.Wizard({name: wizardName.value});

  // Смена цвета при нажатии на куртку
  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = wizard.changeCoatColor();
  });

  // Смена цвета при нажатии на глаза
  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = wizard.changeEyesColor();
  });

  // Смена цвета при нажатии на огненный шар
  wizardFireball.addEventListener('click', function () {
    wizardFireball.style.backgroundColor = wizard.changeFireballColor();
  });

  window.myWizard = wizard;
})();
