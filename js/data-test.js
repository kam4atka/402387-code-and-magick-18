'use strict';

(function () {
  var WIZARD_COUNT = 4;
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var getRandomWizard = function (arrayCoatColor, arrayEyeColor) {
    var hero = {
      name: WIZARD_NAMES[window.util.getRandomCount(0, WIZARD_NAMES.length - 1)],
      surname: WIZARD_SURNAMES[window.util.getRandomCount(0, WIZARD_SURNAMES.length - 1)],
      coatColor: arrayCoatColor[window.util.getRandomCount(0, arrayCoatColor.length - 1)],
      eyeColor: arrayEyeColor[window.util.getRandomCount(0, arrayEyeColor.length - 1)],
    };
    return hero;
  };

  var generateArrayWizards = function (arrayCoatColor, arrayEyeColor) {
    var arrayWizards = [];
    for (var i = 0; i < WIZARD_COUNT; i++) {
      var hero = getRandomWizard(arrayCoatColor, arrayEyeColor);
      arrayWizards[i] = hero;
    }
    return arrayWizards;
  };

  var getListWizards = function (arr) {
    var fragment = document.createDocumentFragment();
    var wizardTemplate = document.querySelector('#similar-wizard-template').content;
    for (var i = 0; i < arr.length; i++) {
      var wizardNode = wizardTemplate.cloneNode(true);
      wizardNode.querySelector('.setup-similar-label').textContent = arr[i].name + ' ' + arr[i].surname;
      wizardNode.querySelector('.wizard-coat').setAttribute('fill', arr[i].coatColor);
      wizardNode.querySelector('.wizard-eyes').setAttribute('fill', arr[i].eyeColor);
      fragment.appendChild(wizardNode);
    }
    return fragment;
  };

  window.dataTest = {
    generateArrayWizards: generateArrayWizards,
    getListWizards: getListWizards,
  };
})();
