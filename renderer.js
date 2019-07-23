// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

    
const $ = require('jQuery');
const remote = require('electron').remote

var formData = new FormData(document.querySelector('form'))

setInterval(function(){
    var info = require('electron').remote.getGlobal('info');

    info.game = $('#game').val()
}, 100);

