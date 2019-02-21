const {ipcRenderer} = require('electron');

window.ipc = window.ipc || {},

function(n) {
    ipc.messaging = {
        changeRed: function() {
            ipcRenderer('change-window-red', 'test')
        },
        
        init: function() {
            $('#red').click(function () {
                ipc.messaging.changeRed()
                console.log("press recognized")
            })
        }
    };

    n(function() {
        ipc.messaging.init();
    })
}(jQuery)