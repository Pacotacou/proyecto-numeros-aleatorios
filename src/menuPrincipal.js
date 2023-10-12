
window.$ = window.jQuery = require('jquery');
const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded',()=>{
    btnCuadradoMedio = document.getElementById('btnCuadradoMedio');

    btnCuadradoMedio.addEventListener('click',(e)=>{
        ipcRenderer.send('loadCuadradoMedio');
    })
})
