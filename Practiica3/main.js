//Variables 
var P = 0
var n = 0
//var clase = 0
// Matrix
var vectorx = []
var xdatos = []
var lernM = []
var xn = []

//Selectores botones
var createVec = document.getElementById("genTablesXY")
var lernMatrix = document.getElementById("LernMatrix")
var clasifica = document.getElementById("Patron");
var clasePatron = document.getElementById("clasePatron");
var recovPat = document.getElementById("recPat");
//Selectores tablas
var tablaX = document.getElementById("Tablax");
var tablaY = document.getElementById("Tablay");
var tablaM = document.getElementById("TablaM");


//Eventos
createVec.addEventListener("click", genTablesXY, false);
lernMatrix.addEventListener("click", LernMatrix, false);
clasifica.addEventListener("click", addPattern, false);
recovPat.addEventListener("click", recoverPattern, false);

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

function recoverPattern(){
    let patron = LeerPatron('recP');
    //console.log('Patron a recuperar '+patron);
    
    //let patron_recuperado = Recuperacion(lernM, patron)
    let patron_recuperado = math.multiply(lernM,patron);
    let indices = [];
    let array = patron_recuperado;
    //console.log("array "+array)
    let element = Math.max(...patron_recuperado);
    //console.log("element "+element)
    let idx = array.indexOf(element);
    //console.log("idx " + idx)
    while (idx != -1) {
        indices.push(idx);
        idx = array.indexOf(element, idx + 1);
    }
    //console.log(indices)
    arr = new Array(P).fill(0);
    for (let i = 0; i < indices.length; i++) {
        arr[i] = 1;
    }
   // console.log("prueba" + arr);
    ImprimirTabla([arr], "reco", P, "Clase")
}

function addPattern() {
    var patron = LeerPatron('Pnew');

    let y = TablaY();
    let clase = document.getElementById("clasePatron");
    clase = Number(clase.value);
    let LernMatrix = Aprendizaje(patron, y, clase - 1, lernM)
    //Este lernM es global, este tiene la M nueva con el patrón agregado
    lernM = LernMatrix
    //No borrar!, este mostrará el estado en cada ocasión que se agregue
    console.log(lernM)
}
function LeerPatron(opt) {

    let filaValores = []
    for (let k = 0; k < n + 1; k++) {
        let inputs = document.querySelectorAll(`.${opt}` + k);
        inputs.forEach(input => {
            filaValores.push(Number(input.value));
        });
    }
    return filaValores
}


//Función para botón Crea vectores
function genTablesXY() {

    P = parseInt(document.getElementById("clases").value);
    n = parseInt(document.getElementById("dimensionx").value);
    //Genera tabla de clases
    var MP = TablaY();
    ImprimirTabla(MP, "y", P, "Y");
    //Genera tabla de patrones iniciales
    var PatX = TablaX();
    ImprimirTabla(PatX, "x", n, "X")
    //Genera tabla de patrón a añadir
    let pattern = [];
    let arr = new Array(n).fill().map((_, index) => `<input type=number class=Pnew${index + 1}>`);
    pattern.push(arr)
    ImprimirTabla(pattern, "Pattern", n, "X")
    //Genera tabla de patrón a recuperar
    let recPattern = [];
    let recArr = new Array(n).fill().map((_, index) => `<input type=number class=recP${index + 1}>`);
    recPattern.push(recArr)
    ImprimirTabla(recPattern, "recPattern", n, "X")
}

function TablaX() {
    let PatX = []

    for (var k = 0; k < P; k++) {
        let arr = new Array(n).fill("<input type=number class=X" + k + ">");

        PatX.push(arr);
    }
    return PatX;
}

function TablaY() {
    let MP = []
    for (let k = 0; k < P; k++) {
        let arrClass = new Array(P).fill(0);
        arrClass[k] = 1;
        MP.push(arrClass);
    }

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

/////CODIGO AGREGADO
//Funcion LernMatrix

function LernMatrix() {
    let x = LeerTabla();
    let y = TablaY();
    let C = 0
    //Tabla aprendizaje 
    let LernMatrix = Aprendizaje(x, y, C, lernM)
    lernM = LernMatrix
    console.log(LernMatrix)
    ImprimirTabla(LernMatrix, "M", n, "y")

}


//---------------Fase de aprendizaje---------------------
function Aprendizaje(xn, y, clase, lernM) {

    let Auxx = []
    let Auxy = []

    if (lernM.length === 0) {
        //Genera la matriz desde cero
        for (let i = 0; i < P; i++) {
            Auxx = xn[i]
            Auxy = y[i]
            let Comparacion = []
            for (let j = 0; j < n; j++) {

                if (Auxx[j] == 1 && Auxy[i] == 1) {
                    Comparacion[j] = +1;

                }
                else if (Auxx[j] == 0 && Auxy[i] == 1) {
                    Comparacion[j] = -1;

                }

            }
            lernM.push(Comparacion);
        }

        return lernM
    }

    //---------Cuando ingresa un patron xn-----
    else {
        let operacion = []
        let AuxLM = []
        //Genera la matrix cuando hay un patron xn
        for (let i = 0; i < P; i++) {
            Auxy = y[i]
            AuxLM = lernM[i]
            for (let j = 0; j < n; j++) {
                if (clase == i) {
                    if (xn[j] == 1 && Auxy[i] == 1) {

                        operacion[j] = AuxLM[j] + 1;
                    }
                    else if (xn[j] == 0 && Auxy[i] == 1) {
                        operacion[j] = AuxLM[j] - 1;

                    }
                    console.log("oper" + operacion)

                }
            }

        }
        lernM[clase] = operacion;

        return lernM
    }
}
//------------------FASE DE RECUPERACION ------------------

function Recuperacion(lernM, vector) {

    let resultado = [];
    let contador = 0
    for (let i = 0; i < P; i++) { // Iteramos sobre lernM en su orden original
        let auxiliar = lernM[i];
        let sum = 0;
        for (let j = 0; j < n; j++) {
            sum += auxiliar[j] * vector[j];
            if (sum > 1) {
                contador = 1
            }
            else {
                contador = 0
            }
        }
        resultado.push(contador);
    }
    return resultado;
}

//--------------Lectura de xn----------------------