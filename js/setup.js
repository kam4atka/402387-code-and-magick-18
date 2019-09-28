'use strict';

var ESC_CODE = 27;
var ENTER_CODE = 13;

var WIZARD_COUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYECOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALLWRAP = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setupPopupOpen = document.querySelector('.setup-open-icon');
var setupPopup = document.querySelector('.setup');
var setupPopupForm = setupPopup.querySelector('.setup-wizard-form');
var setupPopupClose = setupPopup.querySelector('.setup-close');
var setupPopupUsername = setupPopup.querySelector('.setup-user-name');

var setupPopupWizard = setupPopup.querySelector('.setup-wizard');
var setupWizardCoat = setupPopupWizard.querySelector('.wizard-coat');
var setupWizardEyes = setupPopupWizard.querySelector('.wizard-eyes');
var setupWizardFireballWrap = setupPopup.querySelector('.setup-fireball-wrap');
var setupWizardFireball = setupWizardFireballWrap.querySelector('.setup-fireball');

var setupSimilar = setupPopup.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');
var setupSimilarList = setupPopup.querySelector('.setup-similar-list');
var setupPopupSubmit = setupPopup.querySelector('.setup-submit');

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

var openModalHandler = function (element) {
  element.classList.remove('hidden');
  document.addEventListener('keydown', escModalHandler);
};

var closeModalHandler = function (element) {
  element.classList.add('hidden');
};

var escModalHandler = function (evt) {
  if (evt.keyCode === ESC_CODE) {
    closeModalHandler(setupPopup);
  }
};

setupSimilarList.appendChild(getListWizards(generateArrayWizards()));
// Actions
setupPopupOpen.addEventListener('click', function () {
  openModalHandler(setupPopup);
});

setupPopupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    openModalHandler(setupPopup);
  }
});

setupPopupClose.addEventListener('click', function () {
  closeModalHandler(setupPopup);
});

setupPopupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    closeModalHandler(setupPopup);
  }
});

setupPopupUsername.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});

setupPopupSubmit.addEventListener('click', function () {
  setupPopupForm.submit();
});

var wizardPathColorGenerate = function (element) {
  if (element.classList.contains('wizard-coat')) {
    element.style.fill = WIZARD_COATCOLORS[getRandomCount(0, WIZARD_COATCOLORS.length - 1)];
  }
  if (element.classList.contains('wizard-eyes')) {
    element.style.fill = WIZARD_EYECOLORS[getRandomCount(0, WIZARD_EYECOLORS.length - 1)];
  }
  if (element.classList.contains('setup-fireball-wrap')) {
    var fireballWrapColor = WIZARD_FIREBALLWRAP[getRandomCount(0, WIZARD_FIREBALLWRAP.length - 1)];
    element.style.background = fireballWrapColor;
    element.querySelector('input').setAttribute('value', fireballWrapColor);
  }
};

setupWizardCoat.addEventListener('click', function (evt) {
  wizardPathColorGenerate(evt.target);
});

setupWizardEyes.addEventListener('click', function (evt) {
  wizardPathColorGenerate(evt.target);
});

setupWizardFireball.addEventListener('click', function () {
  wizardPathColorGenerate(setupWizardFireballWrap);
});
