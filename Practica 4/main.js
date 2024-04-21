//Selectores de 
var nPat = parseInt(document.getElementById("clases").value);
var dPat = parseInt(document.getElementById("dimensionx").value);
var dSal = parseInt(document.getElementById("dimensiony").value);

//Selector de eventos
var createVecbutton = document.getElementById("genTables");
var genAsocbutton = document.getElementById("genAsoc");
//Eventos
createVecbutton.addEventListener("click",genTablesXY, false);
genAsocbutton.addEventListener("click", genAsociation, false);

//
var mX = [];
var valSal = []
//Funciones
//Genera asociacion
function genAsociation() {
  valSal = LeerTabla();
  mX = TablaY();
  let res = []
  for (let i = 0; i < valSal.length; i++) {
    // Convertir cada elemento de valSal en un array de un solo elemento
    //El cuál es el vector que se multiplica por el patrón
    let valSal_single = valSal[i].map(el => [el]);
    
    
    let resultado = math.multiply(valSal_single, [mX[i]]);
    console.log(resultado);
    //Aquí se van a sumar los resultados para generar la matríz
    if(res.length == 0 ){
      
    }
  }
}

function LeerTabla() {
  let valores = [];
  for (let k = 0; k < nPat; k++) {
      let inputs = document.querySelectorAll('.X' + k);

      let filaValores = [];
      inputs.forEach(input => {
          filaValores.push(Number(input.value));
      });

      valores.push(filaValores);
  }

  return valores;
}
//Genera los patrones x de dimensión dPat
function TablaY() {
  let MP = []
  for (let k = 0; k < nPat; k++) {
      let arrClass = new Array(nPat).fill(0);
      if(k<arrClass.length){
        arrClass[k] = 1;
    }
    MP.push(arrClass);
      
  }

  //[1,0,0,
  //0,1,0,
  //0,0,1]
  return MP

}
function TablaX() {
  let PatX = []

  for (var k = 0; k < nPat; k++) {
      let arr = new Array(dSal).fill("<input type=number class=X" + k + ">");

      PatX.push(arr);
  }
  return PatX;
}

function genTablesXY(){
  mX = TablaY();
  a = math.transpose(mX);
  ImprimirTabla(mX, "x",nPat,"X" )
  var PatX = TablaX();
  ImprimirTabla(PatX, "y",dSal,"Y")

}

function ImprimirTabla(vector, x, columna, optional) {
  let TablaC = document.getElementById("Tabla" + x);
  TablaC.innerHTML = "";
  let tabla = "<table>";
  tabla += "<caption>" + "Tabla" + x + "</caption>";
  for (let i = 0; i < vector.length; i++) {
      tabla += "<tr>";
      let label = optional + (i + 1);
      tabla += "<td>" + label + "</td>";
      for (let j = 0; j < columna; j++) {
          tabla += "<td>" + vector[i][j] + "</td>";
      }
      tabla += "</tr>";
  }

  tabla += "</table>";
  TablaC.innerHTML = tabla;

}
