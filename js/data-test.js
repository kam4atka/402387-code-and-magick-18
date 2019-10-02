'use strict';

(function () {
  var WIZARD_COUNT = 4;
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var getRandomWizard = function () {
    var hero = {};
    hero.name = WIZARD_NAMES[window.util.getRandomCount(0, WIZARD_NAMES.length - 1)];
    hero.surname = WIZARD_SURNAMES[window.util.getRandomCount(0, WIZARD_SURNAMES.length - 1)];
    hero.coatColor = window.wizardSetup.coatColor[window.util.getRandomCount(0, window.wizardSetup.coatColor.length - 1)];
    hero.eyeColor = window.wizardSetup.eyeColor[window.util.getRandomCount(0, window.wizardSetup.eyeColor.length - 1)];
    return hero;
  };

  window.dataTest = {
    generateArrayWizards: function () {
      var arrayWizards = [];
      for (var i = 0; i < WIZARD_COUNT; i++) {
        var hero = getRandomWizard();
        arrayWizards[i] = hero;
      }
      return arrayWizards;
    },
    getListWizards: function (arr) {
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
    }
  };
})();
