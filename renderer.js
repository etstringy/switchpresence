// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var {ipcRenderer: ipc, remote, shell} = require('electron')
var $ = require('jQuery')


function destroy() {
    ipc.send('destroyPresence')
    M.toast({html: 'Disconnected from Discord', classes:'blue accent-2'})
};

function submit() {
    ipc.send('updateGame', document.getElementById("game").value)
    ipc.send('fcmanage', document.getElementById("FC").value)
    M.toast({html: 'Success!', classes:'green lighten-3'});
}

function openGithub() {
    event.preventDefault();
    shell.openExternal("http://github.com/etstringy/switchpresence");
}

function reload() {
    ipc.send('reload')
}

// setInterval(() => , 15e3)

ipc.on('friendcode-client', function (event, arg) {
    document.getElementById("FC").value = arg
    if(document.getElementById("FC").value == "Friend Code Hidden") {
        document.getElementById("FC").value = ""
    }
})

ipc.send('friendcode')
