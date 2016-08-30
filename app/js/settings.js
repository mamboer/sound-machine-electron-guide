'use strict';

const {ipcRenderer} = require('electron');

let closeEl = document.querySelector('.close');
closeEl.addEventListener('click', function (e) {
    ipcRenderer.send('close-settings-window');
});

const configuration = require('../configuration.js');

const modifierCheckboxes = document.querySelectorAll('.global-shortcut');

for (let i = 0; i < modifierCheckboxes.length; i++) {
    let shortcutKeys = configuration.get('shortcutKeys');
    let modifierKey = modifierCheckboxes[i].attributes['data-modifier-key'].value;
    modifierCheckboxes[i].checked = shortcutKeys.indexOf(modifierKey) !== -1;
    
    modifierCheckboxes[i].addEventListener('click', function (e) {
        bindModifierCheckboxes(e);
    });
}

function bindModifierCheckboxes(e) {
    let shortcutKeys = configuration.get('shortcutKeys');
    let modifierKey = e.target.attributes['data-modifier-key'].value;

    if (shortcutKeys.indexOf(modifierKey) !== -1) {
        let shortcutKeyIndex = shortcutKeys.indexOf(modifierKey);
        shortcutKeys.splice(shortcutKeyIndex, 1);
    }
    else {
        shortcutKeys.push(modifierKey);
    }

    configuration.set('shortcutKeys', shortcutKeys, () => {
        ipcRenderer.send('set-global-shortcuts');
    });
    
}