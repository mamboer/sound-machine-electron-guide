'use strict';

const soundButtons = document.querySelectorAll('.button-sound');

for (let i = 0; i < soundButtons.length; i++) {
    let soundButton = soundButtons[i];
    let soundName = soundButton.attributes['data-sound'].value;

    prepareButton(soundButton, soundName);
}

function prepareButton(buttonEl, soundName) {
    buttonEl.querySelector('span').style.backgroundImage = 'url("img/icons/' + soundName + '.png")';

    let audio = new Audio(__dirname + '/wav/' + soundName + '.wav');
    buttonEl.addEventListener('click', function () {
        audio.currentTime = 0;
        audio.play();
    });
}

const {ipcRenderer} = require('electron');

const closeEl = document.querySelector('.close');
closeEl.addEventListener('click', function () {
    ipcRenderer.send('close-main-window');
});

ipcRenderer.on('global-shortcut', function(evt, arg) {
    let event = new MouseEvent('click');
    soundButtons[arg].dispatchEvent(event);
});

const settingsEl = document.querySelector('.settings');
settingsEl.addEventListener('click', function () {
    ipcRenderer.send('open-settings-window');
});