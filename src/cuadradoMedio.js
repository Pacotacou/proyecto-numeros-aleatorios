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
    const txtFinal = document.getElementById('end');
    const btnCalcular = document.getElementById('calcular');
    const tbResultados = document.getElementById('resultados');

    const cuadradoMedio = (x0,max)=>{
        tabla = []

        let Rn = x0;
        let Rn2 = Rn**2;
        let MRn2 = middleChars(Rn2.toString());

        tabla.push([0,Rn,Rn2,MRn2]);

        for (let index = 1; index <= max; index++) {
            Rn = tabla[index-1][3];
            Rn2 = Rn**2;
            MRn2 = middleChars(Rn2.toString());
            tabla.push([index,Rn,Rn2,MRn2])
            if (MRn2 == 0){
                break;
            }
        }

        return tabla
        
    }

    btnCalcular.addEventListener('click',(e)=>{

        try {
            x0 = parseInt(txtX0.value);
            max = parseInt(txtFinal.value);
    
            let table = cuadradoMedio(x0,max);
    
            tbResultados.innerHTML = '';
    
            for (const row of table) {
                let tr = document.createElement('tr');
                tr.innerHTML = 
                `
                    <td>${row[0]}</td>
                    <td>${row[1]}</td>
                    <td>${row[2]}</td>
                    <td>${row[3]}</td>
                `;
                tbResultados.appendChild(tr);
            }
        } catch (error) {
            new Notification(error)
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