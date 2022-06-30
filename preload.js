const { ipcRenderer } = require('electron')

function loginSupervisor(){
    console.log("sdaf")
    alert("sdaf")
}

ipcRenderer.invoke('invoke-handle-message', 'ping').then((reply) => console.log(reply))
