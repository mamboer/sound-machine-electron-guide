'use strict';

const {
    app, 
    BrowserWindow, 
    globalShortcut, 
    ipcMain
} = require('electron');


let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        frame: false,
        height: 700,
        resizable: false,
        width: 368
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

    globalShortcut.register('CommandOrControl+Shift+1', () => {
        mainWindow.webContents.send('global-shortcut', 0);
    });

    globalShortcut.register('CommandOrControl+Shift+2', () => {
        mainWindow.webContents.send('global-shortcut', 1);
    });

});

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
        height: 200,
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