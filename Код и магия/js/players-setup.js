
'use strict';

// Настройка персонажа и отрисовка похожих персонажей
(function () {
  var wizards = [];

  // Фильтр похожих волшебников
  // Ранговая система сравнения волшебников
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.myWizard.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.myWizard.eyesColor) {
      rank += 1;
    }
    if (wizard.colorFireball === window.myWizard.fireballColor) {
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
  var wizardComparator = function (left, right) {
    var rankDiff = getRank(right) - getRank(left);
    return rankDiff === 0 ? namesComparator(left.name, right.name) : rankDiff;
  };

  var updateFilter = function () {
    window.render(wizards.sort(wizardComparator));
  };

  window.myWizard.onChange = window.debounce(function () {
    updateFilter();
  });

  // Загрузка волшебников с сервера.
  var onSuccess = function (data) {
    wizards = data;
    updateFilter();
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
