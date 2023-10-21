window.$ = window.jQuery = require('jquery');
const { ipcRenderer } = require('electron');


function middleChars(str) {
    try {
        if (str.length <= 3) {
            return parseInt(str);
          }
          let start = Math.ceil((str.length - 4) / 2);
          let length = str.length % 2 == 0 ? 4 : 3;
          return parseInt(str.substr(start, length));
    } catch (error) {
        return parseInt('0');
    }
  }

document.addEventListener('DOMContentLoaded',() => {
    const txtX0 = document.getElementById('x0');
    const txtA = document.getElementById('a');
    const txtC = document.getElementById('c');
    const txtM = document.getElementById('m');
    const txtFinal = document.getElementById('end');
    const btnCalcular = document.getElementById('calcular');
    const tbResultados = document.getElementById('resultados');

    const congLineal = () =>{
        let x0 = parseInt(txtX0.value);
        let a = parseInt(txtA.value);
        let c = parseInt(txtC.value);
        let m = parseInt(txtM.value);
        let max = parseInt(txtFinal.value);

        let table = []

        let xn = x0;
        let axnc = a * xn + c;
        let axncmodm = axnc % m;

        table.push([0,xn,axnc,axncmodm]);

        for (let i = 1; i <= max; i++) {
            xn = table[i-1][3];
            axnc = a * xn + c;
            axncmodm = axnc % m;
            table.push([i,xn,axnc,axncmodm]);
        }

        return table;

    }

    btnCalcular.addEventListener('click',(e)=>{
        let data = congLineal();
        tbResultados.innerHTML = '';

        for (const row of data) {
            let tr = document.createElement('tr');
            tr.innerHTML = 
            `<tr>
                <td>${row[0]}</td>
                <td>${row[1]}</td>
                <td>${row[2]}</td>
                <td>${row[3]}</td>
            </tr>`
            tbResultados.appendChild(tr);
        }

    })


    document.getElementById('medio').addEventListener('click',(e)=>{
        ipcRenderer.send('loadCuadradoMedio');
    })
    document.getElementById('lineal').addEventListener('click',(e)=>{
        ipcRenderer.send('loadLineal');
    })
    document.getElementById('aditivo').addEventListener('click',(e)=>{
        ipcRenderer.send('loadAditivo');
    })
    document.getElementById('cuadratico').addEventListener('click',(e)=>{
        ipcRenderer.send('loadCuadratico');
    })

});