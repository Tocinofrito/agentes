
var vectorx = []
var xdatos = []
//Selectores botones
var createVec = document.getElementById("create_Vector")
var lernMatrix = document.getElementById("LernMatrix")
//Selectores tablas
var tablaX = document.getElementById("Tablax");
var tablaY = document.getElementById("Tablay");
//Eventos
createVec.addEventListener("click", genTablesXY ,false);
lernMatrix.addEventListener("click", LernMatrix,false);
//Funcion LernMatrix
function LernMatrix(){
    let valoresTablaX = LeerTabla();
    var yMat = TablaY();
    memMatrix(yMat,valoresTablaX)
    //[[],[],[],[]]
    //[[],[],[],[]]
    //[[],[],[],[]]

    //Y
    //   
    // [[1],[0],[0]]
    // [[0],[1],[0]]
    // [[0],[0],[1]]
}
//Funcion para generar matriz memoria con tablaX y tablaY
function memMatrix(yMat, valoresTablaX){
    let y1 = yMat.pop()
}
//------------------------------------
    //[1,-1,+1,-1,+1]
    //[0,0,0,0,0]
    //[0,0,0,0,0]

function Prueba(){
    let Comparacion = []
    let Resultado = []
    let vectorx = [[1,0,1,0,1],[1,1,0,0,1],[1,0,1,1,0]]
    let vectory = [[1,0,0],[0,1,0],[0,0,1]]
    P = 3
    n = 5 
    for(let i = 0; i < P; i++) {
        let reversex = vectorx.reverse();
        let popx = reversex.pop();
        let reversey = vectory.reverse();
        let popy = reversey.pop();
        for(let j = 0; j < n; j++) {
              if(popx[j]== 1 && popy[i] == 1)
              {
                Comparacion[j]= 1;
                //memor[0] +=1
              }
              else if(popx[j]== 0 && popy[i] == 1)
              {
                Comparacion[j]= -1;
                //memor[0] -=1
              }
              else{
              //No es necesario hacer nada

            }
        Resultado.push(Comparacion);
    }
    console.log(Comparacion)
}

}
    





//------------------------------------
// Función para leer los valores de los input con la clase Xk
function LeerTabla() {
    let valores = [];
    for (let k = 0; k < P; k++) {
        let inputs = document.querySelectorAll('.X' + k);

        let filaValores = [];
        inputs.forEach(input => {
            filaValores.push(Number(input.value));
        });

        valores.push(filaValores);
    }

    return valores;
}


//Función para botón Crea vectores
function genTablesXY(){
    console.log("funcion gentables");
    P = parseInt(document.getElementById("clases").value);
    n = parseInt(document.getElementById("dimensionx").value);
    
    var MP = TablaY();
    ImprimirTabla(MP,"y",P, "Y");
    var PatX = TablaX();
    ImprimirTabla(PatX, "x", n,"X")

}

function TablaX(){
    let PatX = []
    console.log("aqui n: "+n)
    for(var k = 0; k<P; k++){
        let arr = new Array(n).fill("<input type=number class=X"+k+">");
        console.log(arr)
        PatX.push(arr);
    }
    return PatX;
}
// function Leer() {
//     let estructura = document.getElementById("Datosx")
    
//     for(let i = 0; i < P; i++) {
//         estructura.appendChild(document.createTextNode("x"+(i+ 1)));
//         for(let j = 0; j < n; j++) {
//             let x = document.createElement("input");
//             estructura.appendChild(x);
//             x.type="number"
//             x.id="dato" + i  + j; 
//         }
//         estructura.appendChild(document.createElement("br"));
//     }
// }

// function Vectorx(){
    
//     for(let i = 0; i < P; i++) {
//         xdatos = Array(n)
//         for(let j = 0; j < n; j++) {
//             xdatos[j] = parseInt(document.getElementById("dato" + i + j).value) ; 
//         }
//         vectorx.push(xdatos);
//     }

//     ImprimirTabla(vectorx,1,n)
// }

function TablaY() {
    let MP = []
    for(let k = 0; k < P; k++){
        let arrClass = new Array(P).fill(0);
        arrClass[k] = 1;
        MP.push(arrClass);
    }
    console.log("Hola"+MP);
    //[1,0,0,
    //0,1,0,
    //0,0,1]
    return MP
    
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

//---------------------------------------------------------------------------------------------------------------------
