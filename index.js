const { app, BrowserWindow, Notification, ipcMain, Menu, Tray } = require('electron');
const path = require('path');
const { measureMemory } = require('vm');
let user = 'admin';
let password = '123';
let tray;
let secondaryWindow;
let mainWindow;
const icon = path.join(__dirname, 'electron.ico');

//MENU QUE APARECE EN LA BARRA DE NOTIFICACIONES DEL SISTEMA OPERATIVO
const contextMenu = Menu.buildFromTemplate([
	{
		label: 'MENU PERSONALIZADO 1',
		submenu: [

			{ role: 'COPIAR' },
			{ role: 'PEGAR' },
			{ role: 'CORTAR' }
		]
	},
	{ label: 'MENU PERSONALIZADO 2', type: 'radio' },
	{ label: 'MENU PERSONALIZADO 3', type: 'radio', checked: true },
	{ label: 'MENU PERSONALIZADO 4', type: 'radio' }
])


const createWindow = () => {
	// AQUI CREAMOS UNA VENTANA CON LAS SIGUIENTES DIMENCIONES

	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: true,
			contextIsolation: false
		}
	})

	// AQUI DECIMOS CUAL SERA EL ARCHIVO HTML A MOSTRAR
	mainWindow.webContents.openDevTools()
	mainWindow.loadFile('views/index.html')

}

// ESTE MENTO CARGA TODO Y ABRE LA VENTANA QUE SE MOSTRARA EN EL SISTEMA
app.whenReady().then(() => {
	createWindow()
	showNotification("BIENVENIDO A ELECTRON")
	tray = new Tray(icon)
	tray.setToolTip('This is my application.')
	tray.setContextMenu(contextMenu)

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

//UNA FUNCION QUE ESCUCHA AL EVENTO DE CERRADO DE VENTANA 
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})

//FUNCION PARA MANDAR NOTIFICACIONES AL SISTEMA OPERATIVO
function showNotification(message) {
	new Notification({ title: 'NOTIFICACION', body: message }).show()
}

//VENTANA SECUNDARIA CON OTRA DIMENCION
function sWindow() {
	secondaryWindow = new BrowserWindow({
		width: 1300,
		height: 720,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: true,
			contextIsolation: false
		}
	})
	secondaryWindow.loadFile('views/dashboard.html')
	return secondaryWindow;
}
//FUNCIONE QUE ESPERA LA INFORMACION DEL LOGIN
ipcMain.handle('login', (event, data) => {

	if (user == data.user && password == data.password) {
		console.log("ACCESO CORRECTO")
		mainWindow.close()
		secondaryWindow=sWindow();
		secondaryWindow.show()
		return { status: 200 }
	} else {
		console.log("ACCESO DENEGADO")
		showNotification("CONTRASEÑA INCORRECTA")
		return { status: 401 }
	}
})





