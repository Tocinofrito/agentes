
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
lernMatrix.addEventListener("click", function() {
    let valoresLeidos = LeerTabla();
    console.log(valoresLeidos);
});
//Funcion LernMatrix

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
    console.log(tablaY);
    TablaY();
    TablaX();

}

function TablaX(){
    let PatX = []
    console.log("aqui n: "+n)
    for(var k = 0; k<P; k++){
        let arr = new Array(n).fill("<input type=number class=X"+k+">");
        console.log(arr)
        PatX.push(arr);
    }
    ImprimirTabla(PatX, "x", n,"X")
}
function Leer() {
    let estructura = document.getElementById("Datosx")
    
    for(let i = 0; i < P; i++) {
        estructura.appendChild(document.createTextNode("x"+(i+ 1)));
        for(let j = 0; j < n; j++) {
            let x = document.createElement("input");
            estructura.appendChild(x);
            x.type="number"
            x.id="dato" + i  + j; 
        }
        estructura.appendChild(document.createElement("br"));
    }
}

function Vectorx(){
    
    for(let i = 0; i < P; i++) {
        xdatos = Array(n)
        for(let j = 0; j < n; j++) {
            xdatos[j] = parseInt(document.getElementById("dato" + i + j).value) ; 
        }
        vectorx.push(xdatos);
    }

    ImprimirTabla(vectorx,1,n)
}

function TablaY() {
    let MP = []
    for(let k = 0; k < P; k++){
        let arrClass = new Array(P).fill(0);
        arrClass[k] = 1;
        MP.push(arrClass);
    }
    ImprimirTabla(MP,"y",P, "Y");
    
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
