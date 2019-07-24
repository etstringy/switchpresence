// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain: ipc, ipcRenderer} = require('electron')
const { autoUpdater } = require("electron-updater")
const path = require('path')
const settings = require('electron-settings');
const client = require('discord-rich-presence')('602401007590309898');

settings.set('sp.game', 'Nothing');
settings.set('sp.img', 'null');

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
  mainWindow.setMenu(null);

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
  createWindow()
  if(settings.get("sp.fc") == "") {
    settings.set('sp.fc', 'FC-0000-0000-0000');
  }
  autoUpdater.checkForUpdatesAndNotify()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q

  // Disconnect from Discord.
  client.disconnect()
  
  // Save FC
  settings.set('sp.fc', settings.get("sp.fc"));

  //
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const startTimestamp = new Date();

function setActivity() {
    if(settings.get("sp.fc") == "") {
      settings.set('sp.fc', 'Friend Code Hidden');
    }
    client.updatePresence({
      state: settings.get("sp.fc"),
      details: `Playing ${settings.get('sp.game')}`,
      largeImageKey: 'ns',
      smallImageKey: settings.get('sp.img'),
      startTimestamp
    });
}

setActivity();

setInterval(() => {
    setActivity();
    // console.log(settings.get('sp.game'))
}, 1000);

ipc.on('updateGame', function (event, arg) {
  // console.log(`Debug> Presence set to ${arg}`)
  if(arg == "Super Smash Bros Ultimate") {
    settings.set('sp.img', 'smash');
  } else if(arg == "SSBU") {
    settings.set('sp.img', 'smash');
  } else if(arg == "Smash Ultimate") {
    settings.set('sp.img', 'smash');
  } else if(arg == "Fortnite") {
    settings.set('sp.img', 'fn');
  } else if(arg == "Minecraft") {
    settings.set('sp.img', 'mc');
  } else if(arg == "MC") {
    settings.set('sp.img', 'mc');
  } else if(arg == "Super Mario Maker 2") {
    settings.set('sp.img', 'smm2');
  } else if(arg == "SMM2") {
    settings.set('sp.img', 'smm2');
  } else if(arg == "Super Mario Party") {
    settings.set('sp.img', 'smp');
  } else if(arg == "Splatoon 2") {
    settings.set('sp.img', 'splatoon_2');
  } else if(arg == "Spla2n") {
    settings.set('sp.img', 'splatoon_2');
  } else if(arg == "Super Mario Odyssey") {
    settings.set('sp.img', 'super_mario_odyssey');
  } else if(arg == "Tetris 99") {
    settings.set('sp.img', 'tetris99');
  } else if(arg == "Undertale") {
    settings.set('sp.img', 'undertale');
  } else if(arg == "YouTube") {
    settings.set('sp.img', 'yt');
  } else if(arg == "YT") {
    settings.set('sp.img', 'yt');
  } else if(arg == "Deltarune") {
    settings.set('sp.img', 'deltarune');
  } else if(arg == "DELTARUNE") {
    settings.set('sp.img', 'deltarune');
  } else {
    settings.set('sp.img', 'null');
  }

  settings.set('sp.game', arg);

  if(arg == "") {
    settings.set('sp.game', 'Nothing');
  }

  const startTimestamp = new Date();
})

ipc.on('destroyPresence', () => client.disconnect());

ipc.on('fcmanage', (event, arg) => {
  settings.set('sp.fc', arg);
})

ipc.on('reload', () => mainWindow.reload())

ipc.on('friendcode', (event) => event.reply('friendcode-client', settings.get("sp.fc")))
