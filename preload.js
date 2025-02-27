// window.addEventListener('DOMContentLoaded', () => {
//     const replaceText = (selector, text) => {
//         const element = document.getElementById(selector)
//         if (element) element.innerText = text
//     }

//     for (const type of ['chrome', 'node', 'electron']) {
//         replaceText(`${type}-version`, process.versions[type])
//     }
// })
const { contextBridge,ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('myAPI', {
    saveFile:(data)=>{
        ipcRenderer.send("file-save",data)
    },
    async readFile(){
        return ipcRenderer.invoke("file-read")
    }
    ,
    getVersion:()=>{
        return ipcRenderer.on("version-send") //send
    }
})