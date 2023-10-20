
window.$ = window.jQuery = require('jquery');
const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded',()=>{
    

    document.getElementById('btnCuadradoMedio').addEventListener('click',(e)=>{
        ipcRenderer.send('loadCuadradoMedio');
    })

    document.getElementById('btnLineal').addEventListener('click',e=>{
        ipcRenderer.send('loadLineal');
    })

    document.getElementById('btnAditivo').addEventListener('click',e=>{
        ipcRenderer.send('loadAditivo');
    })

    document.getElementById('btnCuadratico').addEventListener('click',e=>{
        ipcRenderer.send('loadCuadratico');
    })


})
