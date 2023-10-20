const {app, BrowserWindow,ipcMain,dialog} = require('electron');
const { event } = require('jquery');

function createWindow (){
    const win = new BrowserWindow({
        width: 1050,
        height: 700,
        minWidth:1050,
        minHeight:700,
        autoHideMenuBar:true,
        webPreferences: {
          nodeIntegration: true,
         contextIsolation: false
        }
      })

      win.loadFile('./src/menuPrincipal.html');

      ipcMain.on('loadCuadradoMedio',event=>{
        win.loadFile("./src/cuadradoMedio.html");
      })

      ipcMain.on('loadLineal', e =>{
        win.loadFile("./src/lineal.html")
      })

      ipcMain.on('loadAditivo', e =>{
        win.loadFile("./src/aditivo.html")
      })

      ipcMain.on('loadCuadratico',e =>{
        win.loadFile('./src/cuadratico.html')
      })
      
}



app.whenReady().then(createWindow);