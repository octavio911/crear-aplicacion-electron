const { ipcRenderer } = require('electron')

function login(formValues){
    //console.log("login exitoso")
    //alert("login exitoso")
    ipcRenderer.invoke('login', formValues).then((reply) => console.log(reply))
}


