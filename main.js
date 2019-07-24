// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain: ipc} = require('electron')
const path = require('path')
const settings = require('electron-settings');
const client = require('discord-rich-presence')('602401007590309898');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    resizable: false
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Remove the menu bar
  // mainWindow.setMenu(null);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {

    // Disconnect from Discord.
    client.disconnect()

    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow
  // settings.set('game', 'Nothing' )
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q

  // Disconnect from Discord.
  client.disconnect()
      
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function setActivity() {
    client.updatePresence(presence);
}

const presence = {
        // state: 'Playing Nintendo Switch',
        details: `Playing ${settings.get('game')}`,
        largeImageKey: 'ns',
        smallImageKey: 'null'
};

setActivity();

setInterval(() => {
    setActivity();
}, 1000);

ipc.on('updateGame', function (event, arg) {
  console.log(`Debug> Presence set to ${arg}`)
  settings.set('game', arg);
})

ipc.on('destroyPresence', () => client.disconnect());