// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var {ipcRenderer: ipc, remote} = require('electron')

function destroy() {
    ipc.send('destroyPresence')
};

function submit() {
    ipc.send('updateGame', document.getElementById("game").value)
}

setInterval(() => console.log(document.getElementById("game").value), 15e3)
