const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
  // AQUI CREAMOS UNA VENTANA CON LAS SIGUIENTES DIMENCIONES
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // AQUI DECIMOS CUAL SERA EL ARCHIVO HTML A MOSTRAR
  mainWindow.loadFile('index.html')

}

// ESTE MENTO CARGA TODO Y ABRE LA VENTANA QUE SE MOSTRARA EN EL SISTEMA
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

//UNA FUNCION QUE ESCUCHA AL EVENTO DE CERRADO DE VENTANA 
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
