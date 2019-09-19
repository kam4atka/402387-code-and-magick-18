'use strict';

var WIZARD_COUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYECOLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var setupPopup = document.querySelector('.setup');
setupPopup.classList.remove('hidden');
var setupSimilar = setupPopup.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');
var setupSimilarList = setupPopup.querySelector('.setup-similar-list');

var getRandomCount = function (min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
};

var getRandomWizard = function () {
  var hero = {};
  hero.name = WIZARD_NAMES[getRandomCount(0, WIZARD_NAMES.length - 1)];
  hero.surname = WIZARD_SURNAMES[getRandomCount(0, WIZARD_SURNAMES.length - 1)];
  hero.coatColor = WIZARD_COATCOLORS[getRandomCount(0, WIZARD_COATCOLORS.length - 1)];
  hero.eyeColor = WIZARD_EYECOLORS[getRandomCount(0, WIZARD_EYECOLORS.length - 1)];
  return hero;
};

var generateArrayWizards = function () {
  var arrayWizards = [];
  for (var i = 0; i < WIZARD_COUNT; i++) {
    var hero = getRandomWizard();
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

setupSimilarList.appendChild(getListWizards(generateArrayWizards()));
