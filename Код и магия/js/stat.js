'use strict';

(function () {
  // Разметка и отрисовка облака статистики
  var Cloud = {
    WIDTH: 420,
    HEIGHT: 270,
    X: 100,
    Y: 10,
    TAIL_WIDTH: 10,
    TAIL_HEIGHT: 15
  };

  var Bar = {
    HEIGHT_MAX: 150,
    WIDTH: 40,
    GAP: 50
  };

  var GAP = 10;
  var RGB_MAX = 255;
  var TEXT_HEIGHT = 25;

  // Нахождение половины значения
  var getHalfValue = function (value) {
    return value / 2;
  };

  // Поиск максимального времени
  var getMaxElement = function (poolTime) {
    var maxTime = poolTime[0];

    poolTime.forEach(function (it) {
      if (it > maxTime) {
        maxTime = it;
      }
    });
    return maxTime;
  };

  // Рисуем облако
  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(getHalfValue(x), y + getHalfValue(Cloud.HEIGHT));
    ctx.lineTo(x, y + Cloud.HEIGHT);
    ctx.lineTo(getHalfValue(x) + getHalfValue(Cloud.WIDTH) - getHalfValue(Cloud.TAIL_WIDTH), y + Cloud.HEIGHT);
    ctx.lineTo(getHalfValue(x) + getHalfValue(Cloud.WIDTH) - Cloud.TAIL_WIDTH, y + Cloud.HEIGHT + Cloud.TAIL_HEIGHT);
    ctx.lineTo(getHalfValue(x) + getHalfValue(Cloud.WIDTH) + Cloud.TAIL_WIDTH, y + Cloud.HEIGHT);
    ctx.lineTo(x + Cloud.WIDTH - x, y + Cloud.HEIGHT);
    ctx.lineTo(x + Cloud.WIDTH - getHalfValue(x), y + getHalfValue(Cloud.HEIGHT));
    ctx.lineTo(x + Cloud.WIDTH - x, y);
    ctx.closePath();
    ctx.fill();

    // Текст в облаке
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', x + Cloud.WIDTH / 5, y + GAP * 2);
    ctx.fillText('Список результатов:', x, Cloud.HEIGHT / 5);
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, Cloud.X + GAP, Cloud.Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, Cloud.X, Cloud.Y, 'white');

    var maxTime = getMaxElement(times);

    // Отрисовка гистограммы
    for (var i = 0; i < names.length; i++) {

      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.fillText(names[i], Cloud.X + (Bar.GAP + Bar.WIDTH) * i, Cloud.HEIGHT - GAP);

      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'rgba(0, 0, ' + Math.floor(Math.random() * RGB_MAX) + ')';
      }

      ctx.fillRect(Cloud.X + (Bar.GAP + Bar.WIDTH) * i, Cloud.Y + Cloud.HEIGHT - GAP - TEXT_HEIGHT - (Bar.HEIGHT_MAX * times[i]) / maxTime, Bar.WIDTH, (Bar.HEIGHT_MAX * times[i]) / maxTime);

      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.fillText(Math.floor(times[i]), Cloud.X + (Bar.GAP + Bar.WIDTH) * i, Cloud.Y + Cloud.HEIGHT - GAP - getHalfValue(GAP) - TEXT_HEIGHT - (Bar.HEIGHT_MAX * times[i]) / maxTime);
    }
  };
})();
