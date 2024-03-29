'use strict';

(function () {
  var WIZARD_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYECOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALLWRAP = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setupPopupOpen = document.querySelector('.setup-open-icon');
  var setupPopup = document.querySelector('.setup');
  var setupPopupClose = setupPopup.querySelector('.setup-close');
  var setupPopupUsername = setupPopup.querySelector('.setup-user-name');

  var setupPlayer = setupPopup.querySelector('.setup-player');
  var setupPlayerAvatar = setupPopup.querySelector('input[name=avatar]');
  var setupWizard = setupPlayer.querySelector('.setup-wizard');
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupWizardFireballWrap = setupPlayer.querySelector('.setup-fireball-wrap');
  var setupWizardFireball = setupWizardFireballWrap.querySelector('.setup-fireball');

  var setupSimilar = setupPopup.querySelector('.setup-similar');
  setupSimilar.classList.remove('hidden');
  var setupSimilarList = setupPopup.querySelector('.setup-similar-list');

  setupSimilarList.appendChild(window.dataTest.getListWizards(window.dataTest.generateArrayWizards(WIZARD_COATCOLORS, WIZARD_EYECOLORS)));

  var openModalHandler = function (element) {
    element.classList.remove('hidden');
    setupPopup.style.top = '';
    setupPopup.style.left = '';
    document.addEventListener('keydown', escModalHandler);
  };

  var closeModalHandler = function (element) {
    element.classList.add('hidden');
    document.removeEventListener('keydown', escModalHandler);
  };

  var escModalHandler = function (evt) {
    if (evt.keyCode === window.util.KeyCodes.ESC) {
      closeModalHandler(setupPopup);
    }
  };

  setupPopupOpen.addEventListener('click', function () {
    openModalHandler(setupPopup);
  });

  setupPopupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.KeyCodes.ENTER) {
      openModalHandler(setupPopup);
    }
  });

  setupPopupClose.addEventListener('click', function () {
    closeModalHandler(setupPopup);
  });

  setupPopupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.KeyCodes.ENTER) {
      closeModalHandler(setupPopup);
    }
  });

  setupPopupUsername.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  var wizardPathColorGenerate = function (element) {
    if (element.classList.contains('wizard-coat')) {
      var colorCoat = WIZARD_COATCOLORS[window.util.getRandomCount(0, WIZARD_COATCOLORS.length - 1)];
      element.style.fill = colorCoat;
      setupPlayer.querySelector('input[name="coat-color"]').value = colorCoat;
    }
    if (element.classList.contains('wizard-eyes')) {
      var colorEyes = WIZARD_EYECOLORS[window.util.getRandomCount(0, WIZARD_EYECOLORS.length - 1)];
      element.style.fill = colorEyes;
      setupPlayer.querySelector('input[name="eyes-color"]').value = colorEyes;
    }
    if (element.classList.contains('setup-fireball-wrap')) {
      var colorFireball = WIZARD_FIREBALLWRAP[window.util.getRandomCount(0, WIZARD_FIREBALLWRAP.length - 1)];
      element.style.background = colorFireball;
      setupPlayer.querySelector('input[name="fireball-color"]').value = colorFireball;
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

  var avatarMouseDownHandler = function (downEvt) {
    downEvt.preventDefault();
    var dragged = false;
    var startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY,
    };

    var avatarMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      setupPopup.style.top = (setupPopup.offsetTop - shift.y) + 'px';
      setupPopup.style.left = (setupPopup.offsetLeft - shift.x) + 'px';
    };

    var avatarMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', avatarMouseMoveHandler);
      document.removeEventListener('mouseup', avatarMouseUpHandler);
      if (dragged) {
        var avatarClickPreventDefault = function (evt) {
          evt.preventDefault();
          setupPlayerAvatar.removeEventListener('click', avatarClickPreventDefault);
        };
        setupPlayerAvatar.addEventListener('click', avatarClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', avatarMouseMoveHandler);
    document.addEventListener('mouseup', avatarMouseUpHandler);
  };

  setupPlayerAvatar.addEventListener('mousedown', avatarMouseDownHandler);
})();
