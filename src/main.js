const {app, BrowserWindow, globalShortcut, ipcMain} = require('electron')
const nativeImage = require('electron').nativeImage
const path = require('path')
const url = require('url')

var child = require('child_process').execFile;

let win

function createWindow() {
    
    console.log("Creating window")
    
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
    
    win.setAlwaysOnTop(true);
    
    win.setIgnoreMouseEvents(true, {forward: true})
    win.setIgnoreMouseEvents(false, {forward: true})
    win.reload()
    win.setIgnoreMouseEvents(true, {forward: true})
    
    
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

var clickThrough = true;

ipcMain.on('toggle-clickthrough', (event, arg) => {
    console.log(arg);
    if(arg === "true") {
        clickThrough = true;
    } else if (arg === "false") {
        clickThrough = false;
    } else {
        clickThrough = !clickThrough;
    }
    console.log(clickThrough);
    win.setIgnoreMouseEvents(clickThrough, {forward: true})
    console.log("Recieved wnbu")
})

ipcMain.on('run-program', (event, arg) => {
    child(arg, "", (err, data) => {
        console.log(err);
        console.log(data);
    });
});