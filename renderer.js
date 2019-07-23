// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const remote = require('electron').remote
const ipc = require('electron').ipcRenderer

var win = remote.getCurrentWindow();

document.getElementById('close-btn').addEventListener('click', function () {
    win.close()
})

const updateBtn = document.getElementById('submit')

updateBtn.addEventListener('click', function () {
    console.log(document.getElementById('game').value)
    ipc.send('updateGame', document.getElementById('game').value)
})

