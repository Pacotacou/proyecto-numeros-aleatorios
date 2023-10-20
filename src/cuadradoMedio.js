window.$ = window.jQuery = require('jquery');

function middleChars(str) {
    try {
        if (str.length <= 3) {
            return parseInt(str);
          }
          let start = Math.floor((str.length - 4) / 2);
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

    const cuadradoMedio = (x0,max)=>{
        tabla = []

        let Rn = x0;
        let Rn2 = Rn**2;
        let MRn2 = middleChars(Rn2.toString());

        tabla.push([0,Rn,Rn2,MRn2]);

        for (let index = 1; index <= max; index++) {
            Rn = tabla[3];
            Rn2 = Rn**2;
            MRn2 = middleChars(Rn2.toString());
            tabla.push([index,Rn,Rn2,MRn2])
        }

        return tabla
        
    }

    

});