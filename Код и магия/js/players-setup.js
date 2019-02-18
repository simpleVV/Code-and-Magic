
'use strict';

// Настройка персонажа и отрисовка похожих персонажей
(function () {
  var coatColor;
  var eyesColor;
  var fireBallColor;
  var wizards = [];

  // Фильтр похожих волшебников
  // Ранговая система сравнения волшебников
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    if (wizard.colorFireball === fireBallColor) {
      rank += 1;
    }
    return rank;
  };

  // Если ранг оказался одинаковый, выстраиваем волшебников по алфавиту
  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  // Сортировка волшебников по рангу и имени
  var updateWizards = function () {
    window.render(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  window.wizard.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  window.wizard.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  window.wizard.onFireballChange = window.debounce(function (color) {
    fireBallColor = color;
    updateWizards();
  });

  // Загрузка волшебников с сервера.
  var onSuccess = function (data) {
    wizards = data;
    updateWizards();
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
