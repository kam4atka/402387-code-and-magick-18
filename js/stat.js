'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var CLOUD_COLOR = 'rgba(255, 255, 255, 1)';
  var CLOUDSHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
  var BAR_WIDTH = 40;
  var BAR_HEIGHT = 150;
  var BAR_MARGIN = 50;
  var FONT_SIZE = 16;
  var FONT_FAMILY = 'PT Mono';
  var FONT_COLOR = 'rgba(0, 0, 0, 1)';

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function (array) {
    var maxElement = array[0];
    array.forEach(function (item) {
      if (item > maxElement) {
        maxElement = item;
      }
    });
    return Math.round(maxElement);
  };

  var createResultBar = function (ctx, x, y, name, value, height, color) {
    ctx.fillStyle = FONT_COLOR;
    ctx.fillText(name, x, y);
    ctx.fillText(value, x, y - height - (GAP * 3));
    ctx.fillStyle = color;
    ctx.fillRect(x, y - height - (GAP * 2), BAR_WIDTH, height);
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUDSHADOW_COLOR);
    renderCloud(ctx, CLOUD_X - GAP, CLOUD_Y - GAP, CLOUD_COLOR);

    ctx.font = FONT_SIZE + 'px ' + FONT_FAMILY;
    ctx.fillStyle = FONT_COLOR;
    var leftPosition = CLOUD_X + (GAP * 2);
    ctx.fillText('Ура вы победили!', leftPosition, CLOUD_Y + FONT_SIZE + GAP);
    ctx.fillText('Список результатов:', leftPosition, CLOUD_Y + FONT_SIZE + (GAP * 3));

    var barHeight;
    var barColor;
    var maxElement = getMaxElement(times);

    for (var i = 0; i < names.length; i++) {
      barHeight = (times[i] / maxElement) * BAR_HEIGHT;
      barColor = (names[i] === 'Вы') ? 'hsl(0, 100%, 50%)' : 'hsl(255, ' + Math.random() * 100 + '%, 50%)';
      createResultBar(ctx, leftPosition + (BAR_WIDTH * i) + (BAR_MARGIN * i), CLOUD_HEIGHT - GAP, names[i], Math.round(times[i]), Math.round(barHeight), barColor);
    }
  };
})();
