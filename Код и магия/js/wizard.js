'use strict';

// Создание волшебника
(function () {
  var wizardSetup = {
    WIZARD_COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    WIZARD_EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green'],
    WIZARD_FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };
  var LENGTH_LIMIT = 30;

  var Wizard = function (data) {
    this.name = data.name;
    this.coatColor = data.colorCoat;
    this.eyesColor = data.colorEyes;
    this.fireballColor = data.colorFireball;
  };

  Wizard.prototype = {
    setName: function (name) {
      if (!name) {
        throw new Error('Имя не задано');
      }
      if (name.length > LENGTH_LIMIT) {
        throw new Error('Недопостимое значение имени мага: ' + name);
      }
      this.name = name;
      this.onChange(this);
      return name;
    },
    // Смена цвета куртки
    changeCoatColor: function () {
      var newColor = wizardSetup.WIZARD_COAT_COLORS[window.utils.getRandomValue(wizardSetup.WIZARD_COAT_COLORS.length)];
      this.coatColor = newColor;
      this.onChange(this);
      return newColor;
    },
    // Смена цвета глаз
    changeEyesColor: function () {
      var newColor =
      wizardSetup.WIZARD_EYES_COLOR[window.utils.getRandomValue(wizardSetup.WIZARD_EYES_COLOR.length)];
      this.eyesColor = newColor;
      this.onChange(this);
      return newColor;
    },
    // Смена цвета фаербола
    changeFireballColor: function () {
      var newColor =
      wizardSetup.WIZARD_FIREBALL_COLORS[window.utils.getRandomValue(wizardSetup.WIZARD_FIREBALL_COLORS.length)];
      this.fireballColor = newColor;
      this.onChange(this);
      return newColor;
    },
    onChange: function (wizard) {
      return wizard;
    }
  };

  window.Wizard = Wizard;
})();
