window.$ = window.jQuery = require('jquery');
const { ipcRenderer } = require('electron');


document.addEventListener('DOMContentLoaded',() => {

    const metodoCuadratico = (x0,m,max) =>{

        let table = [];
        let xn = x0;
        let xnxn1= xn * (xn+1);
        let xnxn1modm = xnxn1 % m;
        table.push([0,xn,xnxn1,xnxn1modm])

        for (let i = 1; i <=max; i++) {
            xn = table[i-1][3];
            xnxn1 = xn * (xn+1);
            xnxn1modm = xnxn1 % m;
            table.push([i,xn,xnxn1,xnxn1modm]);
        }

        return table;

    }

    document.getElementById('calcular').addEventListener('click',e=>{
        try {
            let x0 = parseInt(document.getElementById('x0').value);
            let m = parseInt(document.getElementById('m').value);
            let max = parseInt(document.getElementById('end').value);
            let table = metodoCuadratico(x0,m,max);
            let res = document.getElementById('resultados');
            res.innerHTML='';
            for (const row of table) {
                let tr = document.createElement('tr');
                tr.innerHTML =
                    `<td>${row[0]}</td>
                    <td>${row[1]}</td>
                    <td>${row[2]}</td>
                    <td>${row[3]}</td>`
                res.appendChild(tr);
            }
        } catch (error) {
            new Notification(error);
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