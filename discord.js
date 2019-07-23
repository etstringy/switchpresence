const $ = require('jQuery');
const remote = require('electron').remote


setInterval(function(){
    var info = require('electron').remote.getGlobal('info');

    info.game = $('#game').val()
}, 100);

