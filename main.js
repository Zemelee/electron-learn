const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const fs = require('node:fs')



function WriteFile(evt, content) {
    fs.writeFileSync("D:/code/electron-learn/hello.txt", content)
}
function ReadFile(evt,content){
    return fs.readFileSync("D:/code/electron-learn/hello.txt").toString() // 返回一个buffer-->string
}
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js') //预加载脚本为渲染进程与主进程之间的通信商
        }
    })
    ipcMain.on('file-save', WriteFile) //send
    ipcMain.handle('file-read', ReadFile) //invoke
    ipcMain.on('version-send', process.versions["chrome"]) //on


    win.loadFile('./pages/index.html')
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})