'use strict';

const {
    app, 
    BrowserWindow, 
    globalShortcut, 
    ipcMain
} = require('electron');

const configuration = require('./configuration');

let mainWindow = null;

app.on('ready', () => {

    if (!configuration.get('shortcutKeys')) {
        configuration.set('shortcutKeys', ['CommandOrControl', 'Shift'], (err) => {
            bootup();
        });
        return;
    }

    bootup();

});

function bootup() {
    mainWindow = new BrowserWindow({
        frame: false,
        height: 700,
        resizable: false,
        width: 368
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

    setGlobalShortcuts();
}

function setGlobalShortcuts() {
    globalShortcut.unregisterAll();

    let shortcutKeysSetting = configuration.get('shortcutKeys');
    let shortcutPrefix = shortcutKeysSetting.length === 0 ? '' : shortcutKeysSetting.join('+') + '+';

    globalShortcut.register(shortcutPrefix + '1', function () {
        mainWindow.webContents.send('global-shortcut', 0);
    });
    globalShortcut.register(shortcutPrefix + '2', function () {
        mainWindow.webContents.send('global-shortcut', 1);
    });
}

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

ipcMain.on('close-main-window', () => app.quit());


let settingsWindow = null;

ipcMain.on('open-settings-window', () => {
    if (settingsWindow) {
        return;
    }

    settingsWindow = new BrowserWindow({
        frame: false,
        height: 220,
        resizable: false,
        width: 200
    });

    settingsWindow.loadURL('file://' + __dirname + '/app/settings.html');

    settingsWindow.on('closed', () => {
        settingsWindow = null;
    });
});

ipcMain.on('close-settings-window', () => {
    if (settingsWindow) {
        settingsWindow.close();
    }
});

ipcMain.on('set-global-shortcuts', function () {
    setGlobalShortcuts();
});