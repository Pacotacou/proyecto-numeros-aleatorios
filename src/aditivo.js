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

    const tableXns = {
        inputs(){
            return document.querySelectorAll(".xn");
        },
        values(){
            let inputs = this.inputs();
            let vals = []
            for (const i of inputs) {
                vals.push(i.value)
            }
            return vals;
        },
        quantity(){
            return this.inputs().length;
        },
        rows(){
            return document.querySelectorAll('.xnrow');
        },
        newRow(){
            let rows = this.rows();
            let qnt = rows.length;
            let lastRow = rows[qnt-1];
            let row = document.createElement('tr');
            row.classList.add("xnrow")
            row.innerHTML = 
                `<td class="pad0">${qnt}</td>
                <td class="pad0">
                    <input type="number" class="xn" class="form-control">
                </td>`;
            lastRow.insertAdjacentElement("afterend",row);
        },
        deletRow(){
            let rows = this.rows();
            let qnt = rows.length;
            let lastRow = rows[qnt-1];
            if (qnt > 1){
                lastRow.remove();
            }
        }
    }

    const metodoAditivo = (m,values,max)=>{
        let table = [];
        let quant = values.length -1

        for (let i = 0; i < values.length; i++) {
            table.push([i,values[i],'inicial']);
        }

        for (let i = 0; i < max; i++){
            n = table.length
            xi = (parseInt(table[i][1]) + parseInt(table[i+quant][1])) % m;
            rand = xi / (m-1);
            table.push([n,xi,rand.toFixed(2)]);
        }

        return table;
    }


    document.getElementById('calcular').addEventListener('click',(e)=>{
        try {
            let m = document.getElementById('m').value;
            let values = tableXns.values();
            let max = document.getElementById('end').value;

            let table = metodoAditivo(m,values,max);
            let resultados = document.getElementById('resultados');

            resultados.innerHTML = "";
            for (const row of table) {
                let tr = document.createElement('tr');
                tr.innerHTML=
                `<td>X${row[0]}</td>
                <td>${row[1]}</td>
                <td>${row[2]}</td>
                `
                resultados.appendChild(tr);
            }
        } catch (error) {
            new Notification(error);
        }
    })

    document.getElementById('quitarFila').addEventListener('click',e=>{
        console.log(tableXns.quantity())
        if (tableXns.quantity() > 2){
            tableXns.deletRow();
        }
    })

    document.getElementById('agregarFila').addEventListener('click',e=>{
        tableXns.newRow();
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