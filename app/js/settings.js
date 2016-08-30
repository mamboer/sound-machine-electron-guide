'use strict';

const {ipcRenderer} = require('electron');

let closeEl = document.querySelector('.close');
closeEl.addEventListener('click', function (e) {
    ipcRenderer.send('close-settings-window');
});