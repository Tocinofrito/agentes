//Mandujano Diaz Nelson Ismael
//Hernandez Santana Diana
function calcularEcuacion() {
  // Obtener la entrada del usuario
  // Se obtiene el valor de la caja input definida en el HTML
  var ecuacionInput = document.getElementById("ecuacionInput");
  var ecuacion = ecuacionInput.value;

  // Validar si la entrada no está vacía
  if (ecuacion.trim() !== "") {
    // Llama a la función resolverEcuacion con la ecuación como argumento
    var resultado = resolverEcuacion(ecuacion);

    // Mostrar la entrada y salida en la tabla
    mostrarResultados(ecuacion, resultado);
  } else {
    alert("Por favor, ingrese una ecuación.");
  }
}


function resolverEcuacion(ecuacion) {
  // Dividir la ecuación en partes
  //Se dividirá a partir de el "="

  var partes = ecuacion.split("=");
  var LadoIzq = partes[0].trim();
  var LadoDer = partes[1].trim();

  // Encontrar términos en ambos lados
  //La regex expresa que se toma desde que existe o no el signo hasta el siguiente
  //Así toma el valor con su signo y su literal("x") o en su defecto que no lo tenga
  
  var TerIzq = LadoIzq.match(/[+-]?[^+-]+/g);
  var TerDer = LadoDer.match(/[+-]?[^+-]+/g);

  // Inicializar sumatorias
  var sumXIzq = 0;
  var sumIzq = 0;
  var sumXDer = 0;
  var sumDer = 0;

  // Calcular sumatorias para el lado izquierdo
for (var i = 0; i < TerIzq.length; i++) {
  var termino = TerIzq[i].trim();
  if (termino.includes('x')) {
    //Lo siguiente nos ayuda a reemplaz
    var coeficiente = termino.replace(/[^\d-]/g, '') || (termino.startsWith('-') ? -1 : 1);
    sumXIzq += eval(coeficiente);
  } else {
    sumIzq += eval(termino);
  }
}

// Calcular sumatorias para el lado derecho
for (var j = 0; j < TerDer.length; j++) {
  var termino = TerDer[j].trim();
  if (termino.includes('x')) {
    // Modificado para manejar términos que consisten solo en la variable x
    var coeficiente = termino.replace(/[^\d-]/g, '') || (termino.startsWith('-') ? -1 : 1);
    sumXDer += eval(coeficiente);
  } else {
    sumDer += eval(termino);
  }
}


  // Calcular la solución
  //La solución se hace con un despeje normal de x suponiento no existe el termino independiente
  //Entonces primero cambiamos el signo de uno de los 2 lados para dejarlo en un lado y sumamos algebraicamente
  //Después verificamos si el término que acompaña a x es 0, de ser así no existe solución, después hacemos la suma de los independientes
  //Ya con su despeje, y retornamos el valor como texto
  sumXIzq = sumXIzq + sumXDer * -1;
  if (sumXIzq !== 0) {
    sumDer = -1 * sumIzq + sumDer;
    var resultado = sumDer / sumXIzq;
    return "x=" + resultado;
  } else {
    return "Sin solución";
  }
}

function mostrarResultados(entrada, salida) {
  var table = document.getElementById("resultadosTable");

  // Crear una nueva fila
  var row = table.insertRow();

  // Insertar celdas para la entrada, igual y salida
  var cellEntrada = row.insertCell(0);
  var cellIgual = row.insertCell(1);
  var cellSalida = row.insertCell(2);

  // Asignar valores a las celdas
  cellEntrada.innerHTML = "<strong>Entrada:</strong> " + entrada;
  cellIgual.innerHTML = "<strong>=</strong>";
  cellSalida.innerHTML = "<strong>Salida:</strong> " + salida;
}
