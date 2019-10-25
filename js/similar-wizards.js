'use strict';

(function () {
  var WIZARD_SIMILAR_COUNT = 4;

  var setupSimilar = document.querySelector('.setup-similar');
  setupSimilar.classList.remove('hidden');
  var setupSimilarList = setupSimilar.querySelector('.setup-similar-list');

  var getRank = function (wizard, colorCoatHero, colorEyesHero) {
    var rank = 0;
    if (wizard.colorCoat === colorCoatHero) {
      rank += 2;
    }
    if (wizard.colorEyes === colorEyesHero) {
      rank += 1;
    }
    return rank;
  };

  var compareName = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var clearSimilarList = function () {
    for (var i = setupSimilarList.children.length - 1; i >= 0; i--) {
      setupSimilarList.children[i].remove();
    }
  };

  var getListSimilarWizards = function (arr) {
    var fragment = document.createDocumentFragment();
    var wizardTemplate = document.querySelector('#similar-wizard-template').content;
    for (var i = 0; i < arr.length; i++) {
      var wizardNode = wizardTemplate.cloneNode(true);
      wizardNode.querySelector('.setup-similar-label').textContent = arr[i].name;
      wizardNode.querySelector('.wizard-coat').setAttribute('fill', arr[i].colorCoat);
      wizardNode.querySelector('.wizard-eyes').setAttribute('fill', arr[i].colorEyes);
      fragment.appendChild(wizardNode);
    }
    return fragment;
  };

  var updateSimilarWizards = function (arr, colorCoatHero, colorEyesHero) {
    if (!colorEyesHero) {
      colorEyesHero = 'black';
    }
    var resultArr = arr.sort(function (left, right) {
      var diffRank = getRank(right, colorCoatHero, colorEyesHero) - getRank(left, colorCoatHero, colorEyesHero);
      if (diffRank === 0) {
        diffRank = compareName(left.name, right.name);
      }
      return diffRank;
    });
    clearSimilarList();
    setupSimilarList.appendChild(getListSimilarWizards(resultArr.slice(0, WIZARD_SIMILAR_COUNT)));
    return resultArr;
  };

  window.similar = {
    setupSimilarList: setupSimilarList,
    getListSimilarWizards: getListSimilarWizards,
    updateSimilarWizards: updateSimilarWizards
  };
})();
