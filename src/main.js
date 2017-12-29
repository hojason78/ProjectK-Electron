const {app, BrowserWindow, globalShortcut} = require('electron')
const nativeImage = require('electron').nativeImage
const path = require('path')
const url = require('url')

let win

function createWindow() {
    
    win = new BrowserWindow({
        title: "Project K",
        icon: path.join(__dirname, 'assets/icon.png'),
        frame: false,
        transparent: true
    })
    
    win.maximize()
    win.setMenuBarVisibility(false)
    
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))
    
    // win.setIgnoreMouseEvents(true);
    
    /*win.loadURL(url.format({
        pathname: "jasoryeh.tk",
        protocol: 'https:',
        slashes: true
    }))*/
    
    //win.webContents.openDevTools()
    
    win.on('closed', () => {
        
        win = null
    
    })
    
    globalShortcut.register('Escape', function(){
        win = null
        app.quit()
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    
    if(process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    
    if(win === null) {
        createWindow()
    }
})