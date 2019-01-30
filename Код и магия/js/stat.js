'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var TAIL_WIDTH = 10; // Толшина хвоста облака
  var TAIL_HEIGHT = 15; // Длина хвоста
  var GAP = 10;
  var BAR_HEIGHT_MAX = 150;
  var BAR_WIDTH = 40;
  var BAR_GAP = 50;
  var TEXT_HEIGHT = 25;
  var RGB_MAX = 255;

  // Нахождение половины значения
  var getHalfValue = function (value) {
    return value / 2;
  };

  // Поиск максимального времени
  var getMaxElement = function (poolTime) {
    var maxTime = poolTime[0];

    for (var i = 0; i < poolTime.length; i++) {
      if (poolTime[i] > maxTime) {
        maxTime = poolTime[i];
      }
    } return maxTime;
  };

  // Ресуем облако
  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(getHalfValue(x), y + getHalfValue(CLOUD_HEIGHT));
    ctx.lineTo(x, y + CLOUD_HEIGHT);
    ctx.lineTo(getHalfValue(x) + getHalfValue(CLOUD_WIDTH) - getHalfValue(TAIL_WIDTH), y + CLOUD_HEIGHT);
    ctx.lineTo(getHalfValue(x) + getHalfValue(CLOUD_WIDTH) - TAIL_WIDTH, y + CLOUD_HEIGHT + TAIL_HEIGHT);
    ctx.lineTo(getHalfValue(x) + getHalfValue(CLOUD_WIDTH) + TAIL_WIDTH, y + CLOUD_HEIGHT);
    ctx.lineTo(x + CLOUD_WIDTH - x, y + CLOUD_HEIGHT);
    ctx.lineTo(x + CLOUD_WIDTH - getHalfValue(x), y + getHalfValue(CLOUD_HEIGHT));
    ctx.lineTo(x + CLOUD_WIDTH - x, y);
    ctx.closePath();
    ctx.fill();

    // Текст в облаке
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', x + CLOUD_WIDTH / 5, y + GAP * 2);
    ctx.fillText('Список результатов:', x, CLOUD_HEIGHT / 5);
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, 'white');

    var maxTime = getMaxElement(times);

    // Отрисовка гистограммы
    for (var i = 0; i < names.length; i++) {

      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.fillText(names[i], CLOUD_X + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP);

      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'rgba(0, 0, ' + Math.floor(Math.random() * RGB_MAX) + ')';
      }

      ctx.fillRect(CLOUD_X + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - TEXT_HEIGHT - (BAR_HEIGHT_MAX * times[i]) / maxTime, BAR_WIDTH, (BAR_HEIGHT_MAX * times[i]) / maxTime);

      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.fillText(Math.floor(times[i]), CLOUD_X + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - getHalfValue(GAP) - TEXT_HEIGHT - (BAR_HEIGHT_MAX * times[i]) / maxTime);
    }
  };
})();
