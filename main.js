const { app, BrowserWindow } = require('electron');
const path = require('path');

//require('electron-reload')(__dirname);
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit'
});

let mainWindow = null;

app.on('ready', function () {

    // Initialize the window to our specified dimensions
    mainWindow = new BrowserWindow({
        width: 1096,
        height: 768,
        'min-width': 480,
        'min-height': 360,
        'accept-first-mouse': true,
        'title-bar-style': 'hidden'
    });

    // Specify entry point
    mainWindow.loadURL('http://localhost:4200');

    // Menu
    mainWindow.setMenu(null);

    // Show dev tools
    // Remove this line before distributing
    //mainWindow.webContents.openDevTools()

    // Remove window once app is closed
    mainWindow.on('closed', function () {
        mainWindow = null;
    });

});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});